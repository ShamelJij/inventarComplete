export class clearTable{
    constructor(tableId) {
        this.tableId = tableId;
    }
    clearTable(){
        var table = document.getElementById(this.tableId);
        table.innerHTML = '';
    }
}