import { Requests } from './requests.js';
let EventsRequests = new Requests();

export class Events {
  db = '';

  constructor() {
    this.db = 'something';
  }
  //################################################################################
  /**
   * first onclick Events section
   * assigning functions to onclick elements
   */
  //inventoryStatus = refreshInventory
  eventIds = ['inventoryStatus', 'calculate'];

  //################################################################################
  /**
   * second onclick Events section
   * assigning functions to onclick elements
   */
  eventClickIds = [
    'inventorySelectLocationBtn',
    'inventoryNewLocationBtn',
    'inventorySelectPersonBtn',
    'inventoryNewPersonBtn',
    'showInventoryBtn',
    'updateInventoryBtn',
    'saveInventoryBtn',
    'inventoryCancelUpdateBtn',
    'showLocationBtn',
    'updateLocationBtn',
    'saveLocationBtn',
    'locationCancelUpdateBtn',
    'updatePersonBtn',
    'savePersonBtn',
    'personCancelUpdateBtn',
    'deleteInventoryBtn',
    'deletePersonBtn',
    'deleteLocationBtn',
  ];

  //################################################################################
  /**
   * oninput Events section
   * assigning functions to oninput elements
   */
  eventInputIds = ['inventoryPriceInpt'];

  //################################################################################
  /**
   * onchange Events section
   * assigning methods to onchange elements
   */
  eventChangeIds = ['inventoryPurchaseDateChg'];

  //################################################################################
  /**
   * onload Events section
   * assigning functions to onload elements
   */
  eventLoadIds = ['inventoryPage', 'personPage', 'locationPage'];

  /**
   * @param {Array} eventIds array of strings
   * @param {Number} sliceLength number
   * @param {String} eventName name of event to add to Element
   */
  assignEvents(eventIds, sliceLength, eventName) {
    console.log(eventIds.length);
    let eventInputElements = {};
    for (let i = 0; i < eventIds.length; i++) {
      let eventFunction = '';
      //if slice(0, -0) then there will be no string
      if (sliceLength === 0) {
        eventFunction = eventIds[i];
      } else {
        eventFunction = eventIds[i].slice(0, -sliceLength);
        console.log(eventFunction);
        eventInputElements[eventIds[i]] = eval(
          'document.getElementById(' + eventIds[i] + ');'
        );
        document
          .getElementById(eventIds[i])
          .addEventListener(eventName, eval('this.' + eventFunction), false);
        console.log(this.db);
      }
    }
  }

  //--------------------------------------------------------------------------------
  /**
   * shows a message under price when input changes in form
   * assigned to element 'inventoryPriceInpt'
   */
  inventoryPrice() {
    let y = document.getElementById('inventoryPriceInpt').className;
    y = y.replace('is-invalid', '');
    y = y.replace('is-valid', '');
    y = y.trim();

    document.getElementById('inventoryPriceInpt').className = y + ' is-invalid';

    document.getElementById('inventoryPriceNotValid').innerText =
      'jetzt Berechnen drücken';
  }

  //--------------------------------------------------------------------------------
  /**
   * changes visibility whenever date in form is changed
   * assigned to element 'inventoryPurchaseDateChg'
   */
  inventoryPurchaseDate() {
    let g = document.getElementById('inventoryPurchaseDate').className;
    g = g.replace('is-invalid', '');
    g = g.replace('is-valid', '');
    g = g.trim();
    document.getElementById('inventoryPurchaseDate').className =
      g + ' is-invalid';
    document.getElementById('inventoryPurchaseDateInvalid').innerText =
      'evtl Preis geben dann Brechnen drucken!';

    let eventClickElements = {};
    for (let i = 0; i < eventClickIds.length; i++) {
      let eventFunction = eventClickIds[i].slice(0, -3);
      console.log(eventFunction);
      eventClickElements[eventClickIds[i]] = eval(
        'document.getElementById(' + eventClickIds[i] + ');'
      );
      document
        .getElementById(eventClickIds[i])
        .addEventListener('click', eval(eventFunction), false);
    }
  }

  //--------------------------------------------------------------------------------
  /**
   * shows Person table as modal inside Inventory page
   *
   */
  async inventorySelectPerson() {
    InitPageRequests.db = 'persons';
    InitPage.page = 'person';
    let Someclass = new Requests();
    let persons = await InitPageRequests.getAll();
    console.log(persons);

    this.clearTable();

    if (!persons || persons.length == 0) {
      let x = addPersonTableIsEmpty.className;
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      addPersonTableIsEmpty.className = x + ' d-block';
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
      let x = addPersonTableIsEmpty.className;
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      addPersonTableIsEmpty.className = x + ' d-none';
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
        InitPage.insertNewRecord(sortedPersonList[i]);
      }
    }
  }

  //--------------------------------------------------------------------------------
  /**
   * shows Location table as modal inside Inventory page
   *
   */
  async inventorySelectLocation() {
    this.db = 'locations';
    this.page = 'location';
    let locations = await this.InitPageRequests.getAll();
    let addLocationTableIsEmpty = document.getElementById(
      this.page + 'TableIsEmpty'
    );

    this.clearTable();

    if (!locations || locations.length == 0) {
      let x = addLocationTableIsEmpty.className;
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      addLocationTableIsEmpty.className = x + ' d-block';
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
      let x = addLocationTableIsEmpty.className;
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      addLocationTableIsEmpty.className = x + ' d-none';
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
  inventoryNewLocation() {
    $('#locationPage').tab('show');
  }

  //--------------------------------------------------------------------------------
  /**
   * add Person from table in modal to Inventory form
   *
   */
  async inventoryNewPerson() {
    $('#personPage').tab('show');
    InitPageRequests.db = 'inventories';
    console.log(InitPageRequests.getAll());
  }

  //--------------------------------------------------------------------------------
  /**
   * updates Inventory in form
   *
   */
  async updateInventory() {
    InitPageRequests.getAll();
    if (calculate()) {
      let personIdInInventory = document.getElementById(
        'personIdInInventory'
      ).value;
      let status = document.getElementById('inventoryStatus').value.trim();
      let label = document.getElementById('inventoryLabel').value.trim();
      let inventorySerialNumber = document
        .getElementById('inventorySerialNumber')
        .value.trim();
      let inventoryType = document.getElementById('inventoryType').value.trim();
      let inventoryPurchaseDate = document
        .getElementById('inventoryPurchaseDate')
        .value.trim();
      let inventoryPriceInpt = document
        .getElementById('inventoryPriceInpt')
        .value.trim();
      inventoryPriceInpt = Number(inventoryPriceInpt);
      let inventoryBookingCategory = document
        .getElementById('inventoryBookingCategory')
        .value.trim();
      let inventoryDepreciationDate = document
        .getElementById('inventoryDepreciationInput')
        .value.trim();
      inventoryDepreciationDate = Number(inventoryDepreciationDate);
      let inventoryValidationDate = document
        .getElementById('inventoryValidationEndDate')
        .value.trim();

      let inventoryId = document.getElementById('inventoryId').value;

      let inventoryOldStatus = document.getElementById(
        'inventoryHiddenStatus'
      ).value;

      let revision = document.getElementById('inventoryRevisionId').value;

      if (inventoryOldStatus == inventoryBookingCategory) {
        console.log('status not changed');
      } else {
        console.log('status changed!!');
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
        console.log('no revision in Inventory');
      }

      InitPageRequests.put(inventoryItem, inventoryId);
      console.log(InitPageRequests.put(inventoryItem, inventoryId).toString());

      // initInventory();
      initPage();
    }

    let eventLoadElements = {};
    for (let i = 0; i < eventLoadIds; i++) {
      eventLoadElements[eventLoadIds[i]] = document
        .getElementById(eventLoadIds[i])
        .addEventListener('load', eventLoadIds[i], false);
    }
  }
}
