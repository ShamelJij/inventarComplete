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
    if(objArray[0].form === "inventory"){
      let inventory = objArray;
      let table = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
      let newRow = table.insertRow(table.length);
      let cell1 = newRow.insertCell(0);
      cell1.innerHTML = inventory.status;
      let cell2 = newRow.insertCell(1);
      cell2.innerHTML = inventory.label;
      let cell3 = newRow.insertCell(2);
      cell3.innerHTML = inventory.serialnumber;
      let cell4 = newRow.insertCell(3);
      cell4.innerHTML = inventory.inventorytype;
      let cell5 = newRow.insertCell(4);
      cell5.innerHTML = inventory.purchasedate;
      let cell6 = newRow.insertCell(5);
      cell6.innerHTML = inventory.price;
      let cell7 = newRow.insertCell(6);
      cell7.innerHTML = inventory.bookingcategory;
      let cell8 = newRow.insertCell(7);
      cell8.innerHTML = inventory.deprecationdate;
      let cell9 = newRow.insertCell(8);
      cell9.innerHTML = inventory.validationenddate;
      let cell10 = newRow.insertCell(9);
      cell10.innerHTML =
        '<div class="text-center d-flex justify-content-around">' +
        '<button onClick="editInventory(' +
        "'" +
        inventory._id +
        "'" +
        ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
        '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#deleteInventoryModel" onClick="setRowID(' +
        "'" +
        inventory._id +
        "'" +
        ')"></button></div>' +
        "</div>";
      console.log("§§§§§: INVENTORY");
        }else if(objArray[0].form === "person"){
      let person = objArray;
      let table = document
        .getElementById("personTable")
        .getElementsByTagName("tbody")[0];
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
      cell6.innerHTML =
        '<div class="text-center d-flex justify-content-between">' +
        '<button onClick="editPerson(' +
        "'" +
        person._id +
        "'" +
        ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
        '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#deletePersonModel" onClick="setRowId(' +
        "'" +
        person._id +
        "'" +
        ')"></button></div>' +
        "</div>";
         }else if(objArray[0].form === "location"){
      let location = objArray;
      let table = document
        .getElementById("locationTable")
        .getElementsByTagName("tbody")[0];
      let newRow = table.insertRow(table.length);
      let cell1 = newRow.insertCell(0);
      cell1.innerHTML = location.locationlabel;
      let cell2 = newRow.insertCell(1);
      cell2.innerHTML = location.locationstreet;
      let cell3 = newRow.insertCell(2);
      cell3.innerHTML = location.housenumber;
      let cell4 = newRow.insertCell(3);
      cell4.innerHTML = location.zipcode;
      let cell5 = newRow.insertCell(4);
      cell5.innerHTML = location.locationname;
      let cell6 = newRow.insertCell(5);
      cell6.innerHTML = location.floornumber;
      let cell7 = newRow.insertCell(6);
      cell7.innerHTML = location.roomnumber;
      let cell8 = newRow.insertCell(7);
      cell8.innerHTML =
        '<div class="text-center d-flex justify-content-around">' +
        '<button onClick="editLocation(' +
        "'" +
        location._id +
        "'" +
        ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>' +
        '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#deleteLocationModel" onClick="setRowID(' +
        "'" +
        location._id +
        "'" +
        ')"></button></div>' +
        "</div>";
    } else {
      console.log("no array..");
    }
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
