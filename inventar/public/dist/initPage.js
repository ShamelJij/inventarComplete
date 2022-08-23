import { Requests } from "./requests.js";

//################################################################################
/**
 * @constructor
 * @param {string} data inventories or persons or locations
 */

export class InitPage {
  page = "";
  elementsIds = [];
  elements = {};

  constructor(page) {
    this.page = page;
    this.elementIds = [ page + 'TableIsEmpty', page + 'Delete', page + 'DeletedName', 'addPersonTableIsEmpty', 'addLocationTableIsEmpty'];
    for(let i = 0; i < elementIds.length; i++){
      elements[elementIds[i]] = document.getElementById(elementIds[i]);
    }
  }

  assignEventsToHTMLElements(){
    let eventClickIds =    ['showInventoryBtn', 'inventorySelectPerson', 'showNewPerson', 'inventorySelectLocation', 'showNewLocation', 'inventoryStatus', 'inventoryPurchaseDate', 'inventoryPrice', 'calculate', 'updateInventoryBtn', 'saveInventoryBtn', 'inventoryCancelUpdateBtn', 'showLocationBtn', 'updateLocationBtn', 'saveLocationBtn', 'locationCancelUpdateBtn', 'updatePersonBtn', 'savePersonBtn', 'personCancelUpdateBtn', 'deleteInventoryBtn','deletePersonBtn', 'deleteLocationBtn'];
    let eventClickElements =  {};
    for(let i = 0; i < eventClickIds; i++){
      eventClickElements[eventClickIds[i]] = document.getElementById(eventClickIds[i]).addEventListener("click", eventClickIds[i], false);
    }

    let eventLoadIds = ['inventoryPage', 'personPage', 'locationPage'];
    let eventLoadElements = {};
    for(let i = 0; i < eventLoadIds; i++){
      eventLoadElements[eventLoadIds[i]] = document.getElementById(eventLoadIds[i]).addEventListener("load", eventLoadIds[i], false);
    }
  }

  insertNewRecord(objArray){
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

    this.clearTable(this.tableId);

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
          if (a.personLastName < b.personLastName) {
            return -1;
          }
          if (a.personLastName > b.personLastName) {
            return 1;
          }
          return 0;
        } else if (data === "locations") {
          if (a.locationAreaName < b.locationAreaName) {
            return -1;
          }
          if (a.locationAreaName > b.locationAreaName) {
            return 1;
          }
          return 0;
        } else if (data === "inventories") {
          if (a.inventoryPrice < b.inventoryPrice) {
            return -1;
          }
          if (a.inventoryPrice > b.inventoryPrice) {
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
