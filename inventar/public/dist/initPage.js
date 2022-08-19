import { Requests } from "./requests.js";

//################################################################################
/**
 * @constructor
 * @param {string} data inventories or persons or locations
 */

export class InitPage {
  data = "";
  constructor(data) {
this.data = data; 
  }

  insertNewRecord(objArray) {
    let someArr = ['one', 'two', 'three', 'four', 'five'];
    let someObj = {};
    for(let i = 0; i < someArr.length; i++ ){
      someObj[someArr[i]] = someArr[i];
    }
      console.log(typeof(someObj.one));
    if(objArray[0].form === "inventory"){
      let data = 'inventory';
    }
      let schema = [];
      for(let i = 0; i < Object.keys(objArray[0]).length-5; i++){
        schema[i] = Object.keys(objArray[0])[i+3]
      }
      let table = document.getElementById(objArray[0].form + 'Table').getElementsByTagName('tbody')[0];
      let newRow = table.insertRow(table.length);
      let cells = [];
      for(let i = 0; i < schema.length; i++){
        cells[i] = newRow.insertCell(i);
        cells[i].innerHTML = objArray.schema;
      }
        cells[schema.length] = newRow.insertCell(schema.length);
        cells[schema.length].innerHTML =
          '<div class="text-center d-flex justify-content-around">' +
          '<button onclick="editInventory(' +
          "'" +
          objArray._id +
          "'" +
          ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
          '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#delete' + objArray[0].form + 'Model" onclick="setRowID(' +
          "'" +
          objArray._id +
          "'" +
          ')"></button></div>' +
          "</div>";
  }

  //################################################################################
  /**
   *
   * initiate page
   */
  async initPage(data) {
    let objArray = await Requests.getAll(data);
    console.log("GET:" + data + ": ", objArray);

    clearTable();

    if (!objArray || objArray.length == 0) {
      let x = tableId.className;
      x = x.replace("d-block", "");
      x = x.replace("d-none", "");
      x = x.trim();
      tableId.className = x + " d-block";
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
      let x = tableId.className;
      x = x.replace("d-block", "");
      x = x.replace("d-none", "");
      x = x.trim();
      tableId.className = x + " d-none";
      let sortedList = objArray.sort(function (a, b) {
        if (data === "persons") {
          if (a.lastname < b.lastname) {
            return -1;
          }
          if (a.lastname > b.lastname) {
            return 1;
          }
          return 0;
        } else if (data === "locations") {
          if (a.locationname < b.locationname) {
            return -1;
          }
          if (a.locationname > b.locationname) {
            return 1;
          }
          return 0;
        } else if (data === "inventories") {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        }
      });
      //insertNewRecord(objArray);
      for (let i = 0; i < sortedList.length; i++) {
        insertNewRecord(sortedList[i]);
      }
    }
  }

  clearTable() {
    const formTable = document.getElementById(this.tableId);
    formTable.innerHTML = "";
  }
}
