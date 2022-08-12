
class InitPage{
    constructor(objArray, tableId) {
        this.objArray = objArray;
        this.tableId = tableId;
    }

    async initPage(data){
    let objArray= await Req.getAll(data);
    console.log('GET:' + data + ': ', objArray);

    clearPersonTable();

    if (!objArray|| objArray.length == 0){
        let x = tableId.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        tableId.className = x + ' d-block' ;
        console.log('table is empty');
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        let x = tableId.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        tableId.className = x + ' d-none' ;
        let sortedList = objArray.sort(function(a,b){

            if(data === 'persons'){
                if (a.lastname < b.lastname) {return -1;}
                if (a.lastname > b.lastname) {return  1;}
                return 0;
            } else if(data === 'locations') {
                if (a.locationname < b.locationname) {return -1;}
                if (a.locationname > b.locationname) {return  1;}
                return 0;
            } else if(data === 'inventories'){
                 if (a.price < b.price) {return -1;}
                if (a.price > b.price) {return  1;}
                return 0;
            }

        });
        //insertNewRecord(objArray);
        for (let i=0;i<sortedList.length;i++) {
            insertNewRecord(sortedList[i]);
        }
    }

}
}

