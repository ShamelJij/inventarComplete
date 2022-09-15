import { Requests } from './requests.js';
import { Events } from './events.js';

let InitPageEvents = new Events();

InitPageEvents.assignEvents(InitPageEvents.eventIds, 0, 'click');
InitPageEvents.assignEvents(InitPageEvents.eventClickIds, 3, 'click');
InitPageEvents.assignEvents(InitPageEvents.eventInputIds, 4, 'input');
InitPageEvents.assignEvents(InitPageEvents.eventChangeIds, 3, 'change');
InitPageEvents.assignEvents(InitPageEvents.eventLoadIds, 0, 'load');
//§##############################################
/**
 * @constructor
 * @param {string} data inventories or persons or locations
 */

export class InitPage {
  page = '';
  elementsIds = [];
  elements = {};
  constructor(page) {
    this.page = page;
    this.elementsIds = [
      page + 'TableIsEmpty',
      page + 'Delete',
      page + 'DeletedName',
      'addPersonTableIsEmpty',
      'addLocationTableIsEmpty',
    ];
    for (let i = 0; i < this.elementsIds.length; i++) {
      this.elements[this.elementsIds[i]] = document.getElementById(
        this.elementsIds[i]
      );
    }
  }

  insertNewRecord(obj) {
    let schema = [];
    let objKeys = Object.keys(obj);
    for (let i = 0; i < objKeys.length - 5; i++) {
      schema[i] = objKeys[i + 3];
    }
    let table = document
      .getElementById(obj.form + 'Table')
      .getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cells = [];
    for (let i = 0; i < schema.length; i++) {
      cells[i] = newRow.insertCell(i);
      cells[i].innerHTML = eval('obj.' + schema[i]);
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
      '</div>';
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
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      tableIsEmpty.className = x + ' d-block';
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
      let x = tableIsEmpty.className;
      x = x.replace('d-block', '');
      x = x.replace('d-none', '');
      x = x.trim();
      tableIsEmpty.className = x + ' d-none';
      let sortedList = objArray.sort(function (a, b) {
        if (data === 'person') {
          if (a.personLastName < b.personLastName) {
            return -1;
          }
          if (a.personLastName > b.personLastName) {
            return 1;
          }
          return 0;
        } else if (data === 'location') {
          if (a.locationAreaName < b.locationAreaName) {
            return -1;
          }
          if (a.locationAreaName > b.locationAreaName) {
            return 1;
          }
          return 0;
        } else if (data === 'inventory') {
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
    formTable.innerHTML = '';
  }
}
