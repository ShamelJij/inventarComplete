import { Requests } from "./requests.js";

let db = '';
let InitPageRequests = new Requests(db);

//##############################################
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
    this.elementsIds = [
      page + "TableIsEmpty",
      page + "Delete",
      page + "DeletedName",
      "addPersonTableIsEmpty",
      "addLocationTableIsEmpty",
    ];
    for (let i = 0; i < this.elementsIds.length; i++) {
      this.elements[this.elementsIds[i]] = document.getElementById(
        this.elementsIds[i]
      );
    }
  }

  assignEventsToHTMLElements() {
    let eventClickIds = [
      "showInventoryBtn",
      "inventorySelectPerson",
      "showNewPerson",
      "inventorySelectLocation",
      "showNewLocation",
      "inventoryStatus",
      "inventoryPurchaseDate",
      "inventoryPrice",
      "calculate",
      "updateInventoryBtn",
      "saveInventoryBtn",
      "inventoryCancelUpdateBtn",
      "showLocationBtn",
      "updateLocationBtn",
      "saveLocationBtn",
      "locationCancelUpdateBtn",
      "updatePersonBtn",
      "savePersonBtn",
      "personCancelUpdateBtn",
      "deleteInventoryBtn",
      "deletePersonBtn",
      "deleteLocationBtn",
    ];
    let eventClickElements = {};
    for (let i = 0; i < eventClickIds; i++) {
      eventClickElements[eventClickIds[i]] = document
        .getElementById(eventClickIds[i])
        .addEventListener("click", eventClickIds[i], false);
    }

    let eventLoadIds = ["inventoryPage", "personPage", "locationPage"];
    let eventLoadElements = {};
    for (let i = 0; i < eventLoadIds; i++) {
      eventLoadElements[eventLoadIds[i]] = document
        .getElementById(eventLoadIds[i])
        .addEventListener("load", eventLoadIds[i], false);
    }
  }

  insertNewRecord(obj) {
    let schema = [];
    let objArray = Object.keys(obj);
    console.log(objArray);
    console.log(obj);
    for (let i = 0; i < objArray.length - 5; i++) {
      schema[i] =  objArray[i + 3];
    }
    let table = document
      .getElementById(obj.form + "Table")
      .getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);
    let cells = [];
    let value; 
    for (let i = 0; i < schema.length; i++) {
      console.log(obj.schema[i]);
      value = schema[i];
      cells[i] = newRow.insertCell(i);
      cells[i].innerHTML = obj.value;
    }
    cells[schema.length] = newRow.insertCell(schema.length);
    cells[schema.length].innerHTML =
      '<div class="text-center d-flex justify-content-around">' +
      '<button onclick="editInventory(' +
      "'" +
      objArray[0]._id +
      "'" +
      ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
      '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#delete' +
      objArray[0].form +
      'Model" onclick="setRowID(' +
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
  async initPage(objArray) {
    let data = objArray[0].form;
    let tableIsEmpty = document.getElementById(this.page + 'TableIsEmpty');
    this.clearTable();

    if (!objArray || objArray.length == 0) {
      let x = tableIsEmpty.className;
      x = x.replace("d-block", "");
      x = x.replace("d-none", "");
      x = x.trim();
      tableIsEmpty.className = x + " d-block";
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
      let x = tableIsEmpty.className;
      x = x.replace("d-block", "");
      x = x.replace("d-none", "");
      x = x.trim();
      tableIsEmpty.className = x + " d-none";
      let sortedList = objArray.sort(function (a, b) {
        if (data === "person") {
          if (a.personLastName < b.personLastName) {
            return -1;
          }
          if (a.personLastName > b.personLastName) {
            return 1;
          }
          return 0;
        } else if (data === "location") {
          if (a.locationAreaName < b.locationAreaName) {
            return -1;
          }
          if (a.locationAreaName > b.locationAreaName) {
            return 1;
          }
          return 0;
        } else if (data === "inventory") {
          if (a.inventoryPrice < b.inventoryPrice) {
            return -1;
          }
          if (a.inventoryPrice > b.inventoryPrice) {
            return 1;
          }
          return 0;
        }
      });
      //insertNewRecord(obj);
      for (let i = 0; i < sortedList.length; i++) {
        this.insertNewRecord(sortedList[i]);
      }
    }
  }

  clearTable() {
    const formTable = document.getElementById(this.page + 'TableBody');
    formTable.innerHTML = "";
  }
}
