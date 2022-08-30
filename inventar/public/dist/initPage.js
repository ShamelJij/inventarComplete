import { Requests } from "./requests.js";


//§##############################################
/**
 * @constructor
 * @param {string} data inventories or persons or locations
 */

export class InitPage {
  page = "";
  elementsIds = [];
  elements = {};
  db = '';
  InitPageRequests;
  constructor(page, db) {
    this.InitPageRequests = new Requests(db);
    this.db = db;
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
//§
  assignEventsToElements() {
    //inventoyStatus = refreshInventory
    let eventIds = [
      "inventoryStatus",
      "calculate",
    ];

    //################################################################################
    /**
     * oninput Events section
     * assigning functions to oninput elements
     */
    let eventInputIds = [
      "inventoryPriceInpt",
    ]
    let eventInputElements = {};
    for (let i = 0; i < eventInputIds.length; i++){
      let eventFunction = eventInputIds[i].slice(0, -4);
      console.log(eventFunction);
      eventInputElements[eventInputIds[i]] = eval('document.getElementById(' + eventInputIds[i] + ');');
      document.getElementById(eventInputIds[i]).addEventListener(('input'), eval(eventFunction), false);
    }

    //--------------------------------------------------------------------------------
    /**
     * shows a message under price when input changes in form
     * assigned to element 'inventoryPriceInpt'
     */
    function inventoryPrice() {
    let y = document.getElementById("inventoryPriceInpt").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();

    document.getElementById("inventoryPriceInpt").className = y + " is-invalid";

    document.getElementById("inventoryPriceNotValid").innerText =
      "jetzt Berechnen drücken";
    }

    //################################################################################
    /**
     * onchange Events section
     * assigning functions to onchange elements
     */
    let eventChangeIds = [
      "inventoryPurchaseDateChg",
    ];
    let eventChangeElements = {};
    for (let i = 0; i < eventChangeIds.length; i++){
      let eventFunction = eventChangeIds[i].slice(0, -3);
      console.log(eventFunction);
      eventChangeElements[eventChangeIds[i]] = eval('document.getElementById(' + eventChangeIds[i] + ');');
      document.getElementById(eventChangeIds[i]).addEventListener(('change'), eval(eventFunction), false);
    }

    //--------------------------------------------------------------------------------
    /**
     * changes visibility whenever date in form is changed
     * assigned to element 'inventoryPurchaseDateChg'
     */
    function inventoryPurchaseDate() {
      let g = document.getElementById("inventoryPurchaseDate").className;
      g = g.replace("is-invalid", "");
      g = g.replace("is-valid", "");
      g = g.trim();
      document.getElementById("inventoryPurchaseDate").className =
        g + " is-invalid";
      document.getElementById("inventoryPurchaseDateInvalid").innerText =
        "evtl Preis geben dann Brechnen drucken!";
    }

    //################################################################################
    /**
     * onclick Events section
     * assigning functions to onclick elements
     */
    let eventClickIds = [
      "inventorySelectLocationBtn",
      "inventoryNewLocationBtn",
      "inventorySelectPersonBtn",
      "inventoryNewPersonBtn",
      "showInventoryBtn",
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
    for (let i = 0; i < eventClickIds.length; i++) {
      let eventFunction = eventClickIds[i].slice(0, -3);
      console.log(eventFunction);
      eventClickElements[eventClickIds[i]] = eval('document.getElementById(' + eventClickIds[i] + ');');
      document.getElementById(eventClickIds[i]).addEventListener('click',eval(eventFunction), false);
    }

    //--------------------------------------------------------------------------------
    /**
     * shows Person table as modal inside Inventory page
     *
     */
    async function inventorySelectPerson() {
      this.db = 'persons';
      this.page = 'person';
      let persons = await this.InitPageRequests.getAll();
      console.log(persons);

      this.clearTable();

      if (!persons || persons.length == 0) {
        let x = addPersonTableIsEmpty.className;
        x = x.replace("d-block", "");
        x = x.replace("d-none", "");
        x = x.trim();
        addPersonTableIsEmpty.className = x + " d-block";
      }
      // sonst: neue Reihe zufügen für jeden Eintrag
      else {
        let x = addPersonTableIsEmpty.className;
        x = x.replace("d-block", "");
        x = x.replace("d-none", "");
        x = x.trim();
        addPersonTableIsEmpty.className = x + " d-none";
        let sortedPersonList = persons.sort(function (a, b) {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        });
        for (let i = 0; i < sortedPersonList.length; i++) {
          this.insertNewRecord(sortedPersonList[i]);
        }
      }
    }

    //--------------------------------------------------------------------------------
    /**
     * shows Location table as modal inside Inventory page
     *
     */
    async function inventorySelectLocation() {
      this.db = 'locations';
      this.page = 'location';
      let locations = await this.InitPageRequests.getAll();
      let addLocationTableIsEmpty = document.getElementById(this.page + "TableIsEmpty");

      this.clearTable();

      if (!locations || locations.length == 0) {
        let x = addLocationTableIsEmpty.className;
        x = x.replace("d-block", "");
        x = x.replace("d-none", "");
        x = x.trim();
        addLocationTableIsEmpty.className = x + " d-block";
      }
      // sonst: neue Reihe zufügen für jeden Eintrag
      else {
        let x = addLocationTableIsEmpty.className;
        x = x.replace("d-block", "");
        x = x.replace("d-none", "");
        x = x.trim();
        addLocationTableIsEmpty.className = x + " d-none";
        let sortedLocationList = persons.sort(function (a, b) {
          if (a.locationAreaName < b.locationAreaName) {
            return -1;
          }
          if (a.locationAreaName > b.locationAreaName) {
            return 1;
          }
          return 0;
        });
        for (let i = 0; i < sortedLocationList.length; i++) {
          this.insertNewRecord(sortedLocationList[i]);
        }
      }
    }

    //--------------------------------------------------------------------------------
    /**
     * add Location from table in modal to Inventory form
     *
     */
    function inventoryNewLocation() {
      $("#locationPage").tab("show");
    }

    //--------------------------------------------------------------------------------
    /**
     * add Person from table in modal to Inventory form
     *
     */
    function inventoryNewPerson() {
      $("#personPage").tab("show");
    }

    //--------------------------------------------------------------------------------
    /**
     * updates Inventory in form
     *
     */
    async function updateInventory() {
      this.db = 'inventories';

      let inventory = await this.InitPageRequests.getAll();
      if (calculate()) {
        let personIdInInventory = document.getElementById(
          "personIdInInventory"
        ).value;
        let status = document.getElementById("inventoryStatus").value.trim();
        let label = document.getElementById("inventoryLabel").value.trim();
        let inventorySerialNumber = document
          .getElementById("inventorySerialNumber")
          .value.trim();
        let inventoryType = document.getElementById("inventoryType").value.trim();
        let inventoryPurchaseDate = document
          .getElementById("inventoryPurchaseDate")
          .value.trim();
        let inventoryPriceInpt = document.getElementById("inventoryPriceInpt").value.trim();
        inventoryPriceInpt = Number(inventoryPriceInpt);
        let inventoryBookingCategory = document
          .getElementById("inventoryBookingCategory")
          .value.trim();
        let inventoryDepreciationDate = document
          .getElementById("inventoryDepreciationInput")
          .value.trim();
        inventoryDepreciationDate = Number(inventoryDepreciationDate);
        let inventoryValidationDate = document
          .getElementById("inventoryValidationEndDate")
          .value.trim();

        let inventoryId = document.getElementById("inventoryId").value;

        let inventoryOldStatus = document.getElementById(
          "inventoryHiddenStatus"
        ).value;

        let revision = document.getElementById("inventoryRevisionId").value;

        if (inventoryOldStatus == inventoryBookingCategory) {
          console.log("status not changed");
        } else {
          console.log("status changed!!");
        }
        let inventoryItem = {
          personIdInInventory: personIdInInventory,
          status: status,
          label: label,
          inventorySerialNumber: inventorySerialNumber,
          inventoryType: inventoryType,
          inventoryPurchaseDate: inventoryPurchaseDate,
          inventoryPriceInpt: inventoryPriceInpt,
          inventoryBookingCategory: inventoryBookingCategory,
          inventoryDepreciationDate: inventoryDepreciationDate,
          inventoryValidationDate: inventoryValidationDate,
          _id: inventoryId,
          _rev: revision,
        };
        if (inventoryItem._rev !== null) {
          _rev: revision;
        } else {
          console.log("no revision in Inventory");
        }

        this.InitPageRequests.put(inventoryItem, inventoryId);
        console.log((this.InitPageRequests.put(inventoryItem, inventoryId)).toString());

        // initInventory();
      }
    }


    //################################################################################
    /**
     * onload Events section
     * assigning functions to onload elements
     */
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
    let objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length - 5; i++) {
      schema[i] = objKeys[i + 3];
    }
    let table = document
      .getElementById(obj.form + "Table")
      .getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);
    let cells = [];
    for (let i = 0; i < schema.length; i++) {
      cells[i] = newRow.insertCell(i);
      cells[i].innerHTML = eval("obj." + schema[i]);
    }
    cells[schema.length] = newRow.insertCell(schema.length);
    cells[schema.length].innerHTML =
      '<div class="text-center d-flex justify-content-around">' +
      '<button onclick="editInventory(' +
      "'" +
      obj._id +
      "'" +
      ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
      '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#delete' +
      obj.form +
      'Model" onclick="setRowID(' +
      "'" +
      obj._id +
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
    let tableIsEmpty = document.getElementById(this.page + "TableIsEmpty");
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
    const formTable = document.getElementById(this.page + "TableBody");
    formTable.innerHTML = "";
  }
}
