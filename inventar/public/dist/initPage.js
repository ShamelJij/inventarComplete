
class InitPage{
    constructor(objArray, tableId) {
        this.objArray = objArray;
        this.tableId = tableId;
    }

    //--------------------------------------------------------------------------------
    /**
     * inserts new record into table below form
     *
     * @param {Object} person
     */
    insertNewRecord(person){

        let table = document.getElementById("persons").getElementsByTagName('tbody')[0];
        let newRow = table.insertRow(table.length);
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = person.lastname;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = person.firstname;
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = person.personalno;
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = person.email;
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML = person._id;
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML = "<div class=\"text-center d-flex justify-content-between\">" +
                                "<button onClick=\"editPerson("  + "\'" + person._id + "\'" + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>&nbsp;" +
            "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deletePersonModel\" onClick=\"setRowId(" + "\'"  + person._id + "\'" + ")\"></button></div>" +
            "</div>";
    }

    //################################################################################
    /**
     *
     * initiate page
     */
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

