import { InitPage } from "./initPage.js";
import { getPersons } from "./person.js";
import { Requests } from "./requests.js";
//let app = require(' ./app.js');
let InitInventory = new InitPage('inventories');
let InventoryRequest = new Requests();
document.getElementById("btnshowInventory").addEventListener("click", showInventory, false);

/**
 * inventory FRONTEND
 */
//################################################################################
/**
 * Global section
 */
const inventoryTableIsEmpty = document.getElementById("inventoryTableIsEmpty");
const inventoryDelete = document.getElementById("inventoryDelete");
const inventoryDeletedName = document.getElementById("inventoryDeletedName");

const addPersonTableIsEmpty = document.getElementById("addPersonTableIsEmpty");
/*let saved_inventory = JSON.parse(localStorage.getItem('inventory'));
localStorage.setItem('inventory', JSON.stringify(saved_inventory));*/

//################################################################################
/**
 * @param {string} method
 * @param {string} url
 */
function sendHTTPRequest(method, url) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status != 200) {
        // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else {
        // show the result
        console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
  return promise;
}

//################################################################################
//routes section

//--------------------------------------------------------------------------------
/**
 * POST /inventories
 *
 * @param {Object} postObj
 * @param {string} url
 */
function postInventory(postObj, url) {
  let xhr = new XMLHttpRequest();
  let inventoryData = JSON.stringify(postObj);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(inventoryData);

  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log("Post successfully created!");
      //alert am website
    } else if (xhr.status === 400) {
      console.log("400 (Bad Request)");
      //alert am website
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * PUT /inventories
 *
 * @param {Object} postObj
 * @param {string} url
 */
function putInventory(postObj, url) {
  let xhr = new XMLHttpRequest();
  let inventoryData = JSON.stringify(postObj);
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(inventoryData);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Put successfully done!");
      initInventory();
    } else if (xhr.status === 400) {
      console.log("invalid");
    } else if (xhr.status === 404) {
      console.log("Inventory not found");
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * DELETE /inventory/{id}
 *
 * @param url
 */
function delInventory(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Delete successful!");
      initInventory();
    } else if (xhr.status === 404) {
      console.log("inventory not found");
      initInventory();
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * GET /inventories
 *
 * @return {Array.<Objects>} inventories
 */
async function getInventories() {
  return sendHTTPRequest("GET", "http://localhost:8080/v1/inventories");
}

//--------------------------------------------------------------------------------
/**
 * GET /inventories/id
 * @param url
 * @param id
 * @return {<Objects>} inventoryObject
 */
async function getInventoryById(url) {
  return sendHTTPRequest("GET", "http://localhost:8080/v1/inventories/" + url);
}

//################################################################################
//form section
/**
 * get input form as an object
 *
 * @return {inventoryData}
 */
function getInputInventory() {
  let inventoryForm = ['personIdInInventory', 'inventoryStatus', 'inventoryLabel', 'inventorySerialNumber', 'inventoryType',
  'inventoryPurchaseDate', 'inventoryPrice', 'inventoryBookingCategory', 'inventoryDepreciationInput','inventoryValidationEndDate'];
  let inventoryData = {};
  for (let i = 0; i < inventoryForm.length; i++) {
    if(inventoryData[inventoryForm[i]] === 'inventoryPrice' || inventoryData[inventoryForm[i]] === 'inventoryDepreciationInput'){
      inventoryData[inventoryForm[i]] = parseInt(document.getElementById(inventoryForm[i]).value);
    }
      inventoryData[inventoryForm[i]] = document.getElementById(inventoryForm[i]).value;
  }
    //inventoryData["personId"] =            document.getElementById("personIdInInventory").value;
    //inventoryData["status"] =              document.getElementById("inventoryStatus").value;
    //inventoryData["label"] =               document.getElementById("inventoryLabel").value;
    //inventoryData["serialnumber"] =        document.getElementById("inventorySerialNumber").value;
    //inventoryData["inventorytype"] =       document.getElementById("inventoryType").value;
    //inventoryData["purchasedate"] =        document.getElementById("inventoryPurchaseDate").value;
    //inventoryData["price"] =               parseInt(document.getElementById("inventoryPrice").value);
    //inventoryData["bookingcategory"] =     document.getElementById("inventoryBookingCategory").value;
    //inventoryData["deprecationdate"] =     parseInt(document.getElementById("inventoryDepreciationInput").value);
    //inventoryData["validationenddate"] =  document.getElementById("inventoryValidationEndDate").value;
  console.log(inventoryData);
  return inventoryData;
}

//################################################################################
/**
 * input validation
 *
 * @return {boolean} ret
 */
function inputValidationInventory() {
  //variable for refresh function for the return
  let ret = true;
  //Anschaffungsdatum validieren (muss nicht in zukunft sein)
  //Anschaffungsdatum als wert
  let inventorypurchaseDate = document.getElementById("inventoryPurchaseDate").value;
  //jetztgen Datum
  let nowDate = new Date().toISOString().split("T")[0];

  console.log("purchase date is: ", Number(inventorypurchaseDate));
  console.log("now is: ", nowDate);

  if (inventorypurchaseDate > nowDate) {
    console.log("purchase date is bigger than now");
    let x = document.getElementById("inventoryPurchaseDate").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("inventoryPurchaseDate").className = x + " is-invalid";
    document.getElementById("inventoryPurchaseDateInvalid").innerText =
      "Das Datum legt in Zukunft!";
    ret = false;
  } else if (inventorypurchaseDate == "") {
    let t = document.getElementById("inventoryPurchaseDate").className;
    t = t.replace("is-invalid", "");
    t = t.replace("is-valid", "");
    t = t.trim();
    document.getElementById("inventoryPurchaseDate").className = t + " is-invalid";
    document.getElementById("inventoryPurchaseDateInvalid").innerText =
      "Das Datum ist leer!";
    ret = false;
  } else {
    console.log("purchase date is smaller than now");
    let y = document.getElementById("inventoryPurchaseDate").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("inventoryPurchaseDate").className = y + " is-valid";
    document.getElementById("inventoryPurchaseDateValid").innerText =
      "Das Datum ist gültig!";
  }
  //price validation muss nicht negatives Wert haben
  let inventoryPrice = document.getElementById("inventoryPrice").value;
  //parsing input to number without zeros on the left
  inventoryPrice = Number(inventoryPrice);
  document.getElementById("inventoryPrice").value = inventoryPrice;
  console.log("the inventoryPrice is: ", inventoryPrice);

  //Show booking category
  if (inventoryPrice < 0) {
    console.log("inventoryPrice is negative");
    let x = document.getElementById("inventoryPrice").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("inventoryPrice").className = x + " is-invalid";
    document.getElementById("inventoryPriceNotValid").innerText =
      "Kein negativem Wert bitte!";
    ret = false;
  } else {
    console.log("inventoryPrice is not negative");
    let y = document.getElementById("inventoryPrice").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("inventoryPrice").className = y + " is-valid";
    document.getElementById("inventoryPriceValid").innerText = "Der Wert ist gültig!";
  }
  //deprecation validation inventoryDepreciationInput
  //deprecation validation muss nicht negatives Wert haben
  let inventoryDepreciationDate = document.getElementById("inventoryDepreciationInput").value;
  inventoryDepreciationDate = Number(inventoryDepreciationDate);
  //Show booking category
  if (inventoryDepreciationDate < 0) {
    console.log("deprecation is negative");
    let x = document.getElementById("inventoryDepreciationInput").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("inventoryDepreciationInput").className =
      x + " is-invalid";
    document.getElementById("inventoryDepreciationInputIsInValid").innerText =
      "Kein negativem Wert bitte!";
    ret = false;
  } else {
    //--------------------------------------------------------------------
    //if new booking category is depreciable (abschreibfähig)
    if (inventoryPrice <= 2000 && inventoryPrice >= 0) {
      document.getElementById("inventoryBookingCategory").value = "GWG";
      let oldStatus = document.getElementById("hiddenStatus").value;
      let newStatus = document.getElementById("inventoryBookingCategory").value;
      if (oldStatus != newStatus) {
        //inventoryBookingCategoryChanged Modal
        document.getElementById("newStatusModal").innerText = newStatus;
        $("#inventoryBookingCategoryChanged").modal("show");
        document.getElementById("hiddenStatus").value = newStatus;
      } else {
        let y = document.getElementById("inventoryDepreciationInput").className;
        y = y.replace("is-invalid", "");
        y = y.replace("is-valid", "");
        y = y.trim();
        document.getElementById("inventoryDepreciationInput").className =
          y + " is-valid";
        document.getElementById("inventoryDepreciationInputIsValid").innerText =
          "Der Wert ist gültig!";
      }
    } else {
      let oldStatus = document.getElementById("hiddenStatus").value;
      let newStatus = document.getElementById("inventoryBookingCategory").value;
      if (oldStatus != newStatus) {
        document.getElementById("newStatusModal").innerText = newStatus;
        if (newStatus == "Abschreibfähig") {
          document.getElementById("deprecationInputGroup").className =
            "d-block";
          document.getElementById("inventoryValidationEndDateGroup").className =
            "d-block";
          console.warn("success!!!");
          let x = document.getElementById("inventoryDepreciationInput").className;
          x = x.replace("is-invalid", "");
          x = x.replace("is-valid", "");
          x = x.trim();
          document.getElementById("inventoryDepreciationInput").className =
            x + " is-invalid";
          document.getElementById("inventoryDepreciationInputIsInValid").innerText =
            "bitte esrt anpassen dann Brechnen drücken!";
          ret = false;
        }
        $("#inventoryBookingCategoryChanged").modal("show");
        console.log("bookingcategory is changed!! Alert!!");
        document.getElementById("hiddenStatus").value = newStatus;
      } else {
        console.log("bookingcategory is not changed!! ALERT!");
        document.getElementById("deprecationInputGroup").className = "d-none";
        document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
      }
    }
    //--------------------------------------------------------------------
  }
  //validating the label input not to be empty
  let labelInput = document.getElementById("inventoryLabel").value;
  if (labelInput == "") {
    let l = document.getElementById("inventoryLabel").className;
    l = l.replace("is-invalid", "");
    l = l.replace("is-valid", "");
    l = l.trim();
    document.getElementById("inventoryLabel").className = l + " is-invalid";
    document.getElementById("inventoryLabelIsInvalid").innerText = "leer!";
    //optional
    //ret = false;
  } else {
    let lv = document.getElementById("inventoryLabel").className;
    lv = lv.replace("is-invalid", "");
    lv = lv.replace("is-valid", "");
    lv = lv.trim();
    document.getElementById("inventoryLabel").className = lv + " is-valid";
    document.getElementById("inventoryLabelIsValid").innerText = "Eingabe ist gültig";
    console.log("labelInput is not empty");
    //optional
    //ret = true;
  }
  //validating the label input not to be empty
  let inventorySerialNumber = document.getElementById("inventorySerialNumber").value;
  if (inventorySerialNumber == "") {
    let sn = document.getElementById("inventorySerialNumber").className;
    sn = sn.replace("is-invalid", "");
    sn = sn.replace("is-valid", "");
    sn = sn.trim();
    document.getElementById("inventorySerialNumber").className =
      sn + " is-invalid";
    document.getElementById("inventorySerialNumberIsInValid").innerText =
      "leer!";
    //optional
    //ret = false;
  } else {
    let snv = document.getElementById("inventorySerialNumber").className;
    snv = snv.replace("is-invalid", "");
    snv = snv.replace("is-valid", "");
    snv = snv.trim();
    document.getElementById("inventorySerialNumber").className =
      snv + " is-valid";
    document.getElementById("inventorySerialNumberIsValid").innerText =
      "Eingabe ist gültig";
    console.log("serialnumber is not empty");
    //optional
    //ret = true;
  }
  //validating the label input not to be empty
  let inventoryType = document.getElementById("inventoryType").value;
  if (inventoryType == "") {
    let it = document.getElementById("inventoryType").className;
    it = it.replace("is-invalid", "");
    it = it.replace("is-valid", "");
    it = it.trim();
    document.getElementById("inventoryType").className = it + " is-invalid";
    document.getElementById("inventoryTypeIsInValid").innerText = "leer!";
    //optional
    //ret = false;
  } else {
    let itv = document.getElementById("inventoryType").className;
    itv = itv.replace("is-invalid", "");
    itv = itv.replace("is-valid", "");
    itv = itv.trim();
    document.getElementById("inventoryType").className = itv + " is-valid";
    document.getElementById("inventoryTypeIsValid").innerText = "Eingabe ist gültig";
    console.log("Type is not empty");
    //optional
    //ret = true;
  }
  console.log("ret is: ", ret);
  return ret;
}

//--------------------------------------------------------------------------------
/**
 * inserts new record into table below form
 *
 * @param {Object} inventory
 */
function insertNewRecordInventory(inventory) {
  let table = document
    .getElementById("inventoryTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = inventory.status;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = inventory.label;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = inventory.inventorySerialNumber;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = inventory.inventoryType;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = inventory.inventorypurchaseDate;
  let cell6 = newRow.insertCell(5);
  cell6.innerHTML = inventory.inventoryPrice;
  let cell7 = newRow.insertCell(6);
  cell7.innerHTML = inventory.inventoryBookingCategory;
  let cell8 = newRow.insertCell(7);
  cell8.innerHTML = inventory.inventoryDepreciationDate;
  let cell9 = newRow.insertCell(8);
  cell9.innerHTML = inventory.inventoryValidationDate;
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
}

//################################################################################
let globalInventoryId = 0;

//--------------------------------------------------------------------------------
function setRowId(Id) {
  globalInventoryId = Id;
}

//--------------------------------------------------------------------------------
function getRowId() {
  let gid = globalInventoryId;
  return gid;
}

//--------------------------------------------------------------------------------
/**
 * clears Inventory table
 *
 */
function clearInventoryTable() {
  const inventoryTableBody = document.getElementById("inventoryTableBody");
  inventoryTableBody.innerHTML = "";
}

//--------------------------------------------------------------------------------
/**
 * delete Inventory from form and from database
 *
 * @param {srting} inventoryId
 */
async function deleteInventory(inventoryId) {
  delInventory("http://localhost:8080/v1/inventories/" + inventoryId);

  let inventory = await getInventoryById(inventoryId);

  let x = inventoryDelete.className;
  x = x.replace("d-block", "");
  x = x.replace("d-none", "");
  x = x.trim();
  inventoryDelete.className = x + " d-block";
  inventoryDeletedName.innerText =
    inventory.label + " " + inventory.inventoryType;
  $("#inventoryDelete").show();

  initInventory();
  setTimeout(function () {
    // Closing the alert
    $("#inventoryDelete").hide();
    inventoryDelete.className = x + " d-none";
  }, 4000);
}

//################################################################################
/**
 *
 * initiate Inventory page
 */
async function initInventory() {
  //localstorage auslesen
  let inventory = await getInventories();
  let data = "inventories";
  let objArray = await InventoryRequest.getAll(data);
  console.log("$$$$$: " + data + ": " + objArray);
  console.log("GET: inventory: ", inventory);
  clearInventoryTable();
  personCount();
  inventoryCount();
  if (!inventory || inventory.length == 0) {
    let x = inventoryTableIsEmpty.className;
    x = x.replace("d-block", "");
    x = x.replace("d-none", "");
    x = x.trim();
    inventoryTableIsEmpty.className = x + " d-block";
    console.log("table is empty");
  }
  // sonst: neue Reihe zufügen für jeden Eintrag
  else {
    let x = inventoryTableIsEmpty.className;
    x = x.replace("d-block", "");
    x = x.replace("d-none", "");
    x = x.trim();
    inventoryTableIsEmpty.className = x + " d-none";
    await InitInventory.insertNewRecord(inventory);
    console.log("array:: ", JSON.stringify(inventory[0].form));
    for (let i = 0; i < inventory.length; i++) {
        insertNewRecordInventory(inventory[i]);
    }
  }

  console.log("function initInventory");
}

//################################################################################
/**
 * saving Inventory Object from form
 *
 */
function saveInventory() {
  if (refresh()) {
    if (inputValidationInventory()) {
      postInventory(
        getInputInventory(),
        "http://localhost:8080/v1/inventories/"
      );

      let personIdInInventory = document.getElementById("personIdInInventory").value;
      let status = document.getElementById("inventoryStatus").value.trim();
      let label = document.getElementById("inventoryLabel").value.trim();
      let inventorySerialNumber = document
        .getElementById("inventorySerialNumber")
        .value.trim();
      let inventoryType = document.getElementById("inventoryType").value.trim();
      let inventorypurchaseDate = document.getElementById("inventoryPurchaseDate").value.trim();
      let inventoryPrice = document.getElementById("inventoryPrice").value.trim();
      let inventoryBookingCategory = document
        .getElementById("inventoryBookingCategory")
        .value.trim();
      let inventoryDepreciationDate = document
        .getElementById("inventoryDepreciationInput")
        .value.trim();
      let inventoryValidationDate = document
        .getElementById("inventoryValidationEndDate")
        .value.trim();
      let inventoryId = document.getElementById("saveIDInventory").value;

      //storing as an object
      let inventoryItem = {
        personIdInInventory: personIdInInventory,
        status: status,
        label: label,
        inventorySerialNumber: inventorySerialNumber,
        inventoryType: inventoryType,
        inventorypurchaseDate: inventorypurchaseDate,
        inventoryPrice: inventoryPrice,
        inventoryBookingCategory: inventoryBookingCategory,
        inventoryDepreciationDate: inventoryDepreciationDate,
        inventoryValidationDate: inventoryValidationDate,
      };
      initInventory();
      hideInventory();
      console.log("$$ ---- : ", inventoryItem);
      document.getElementById("inventoryIsSaved").className = "d-block";
      document.getElementById("inventoryIsSavedText").innerText =
        "Item" +
        JSON.stringify(inventoryItem.label) +
        " " +
        JSON.stringify(inventoryItem.inventoryType) +
        "ist gespeichert";
    } else {
      console.log("saveInventory in not starting because valid is not valid");
    }
  } else {
    console.log("saveInventory is not working because refresh has not started");
  }
}

//--------------------------------------------------------------------------------
/**
 * edit Inventory in form
 *
 * @param {string} inventoryId
 */
async function editInventory(inventoryId) {
  showInventory();
  let inventory = await getInventoryById(inventoryId);
  document.getElementById("iUpdateBtn").className = "btn btn-success";
  document.getElementById("iSaveBtn").className = "d-none";

  console.log("editInventory", inventory);

  document.getElementById("inventoryStatus").value = inventory.status;
  document.getElementById("inventoryLabel").value = inventory.label;
  document.getElementById("inventorySerialNumber").value =
    inventory.inventorySerialNumber;
  document.getElementById("inventoryType").value = inventory.inventoryType;
  document.getElementById("inventoryPurchaseDate").value = inventory.inventorypurchaseDate;
  document.getElementById("inventoryPrice").value = inventory.inventoryPrice;
  document.getElementById("inventoryBookingCategory").value = inventory.inventoryBookingCategory;
  document.getElementById("inventoryDepreciationInput").value =
    inventory.inventoryDepreciationDate;
  document.getElementById("inventoryValidationEndDate").value =
    inventory.inventoryValidationDate;
  document.getElementById("hiddenStatus").value = inventory.inventoryBookingCategory;
  document.getElementById("saveIDInventory").value = inventory._id;
  document.getElementById("inventoryRev").value = inventory._rev;
  document.getElementById("personIdInInventory").value = inventory.personIdInInventory;
}

//--------------------------------------------------------------------------------
/**
 * will switch the user to create a new person
 *
 */
function createPerson() {
  console.log("user is switched to person page");
}

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function personCount() {
  let persons = await getPersons();
  let personCount = document.getElementById("personCount");

  personCount.innerText = persons.length;
}

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function inventoryCount() {
  let inventories = await getInventories();
  let inventoryCount = document.getElementById("inventoryCount");

  inventoryCount.innerText = inventories.length;
}

//--------------------------------------------------------------------------------
/**
 * show Inventory form
 *
 */
function showInventory() {
  //await insertPersons();
  let showInventory = document.getElementById("showInventory").className;
  document.getElementById("iUpdateBtn").className = "d-none";
  document.getElementById("iSaveBtn").className = "btn btn-primary";
  if (showInventory == "d-none") {
    document.getElementById("showInventory").className = "d-block";
    document.getElementById("nInventoryBtn").className = "d-none";
    console.log("dblock");
  } else {
    console.log("showInventory is not working!!");
  }
}

//--------------------------------------------------------------------------------
/**
 * hides Inventory in form
 *
 */
function hideInventory() {
  refreshInventory();
  resetFormInventory();
  let hInventory = document.getElementById("showInventory").className;
  if (hInventory == "d-block") {
    document.getElementById("showInventory").className = "d-none";
    document.getElementById("nInventoryBtn").className =
      "form-row justify-content-center";
  } else {
    console.log("hideInventory is not working!!");
  }
}

//--------------------------------------------------------------------------------
/**
 * updates Inventory in form
 *
 */
async function updateInventory() {
  let inventory = await getInventories();
  if (refresh()) {
    let inventory = await getInventories();
    let personIdInInventory = document.getElementById("personIdInInventory").value;
    let status = document.getElementById("inventoryStatus").value.trim();
    let label = document.getElementById("inventoryLabel").value.trim();
    let inventorySerialNumber = document
      .getElementById("inventorySerialNumber")
      .value.trim();
    let inventoryType = document.getElementById("inventoryType").value.trim();
    let inventorypurchaseDate = document.getElementById("inventoryPurchaseDate").value.trim();
    let inventoryPrice = document.getElementById("inventoryPrice").value.trim();
    inventoryPrice = Number(inventoryPrice);
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

    let inventoryId = document.getElementById("saveIDInventory").value;

    let oldStatus = document.getElementById("hiddenStatus").value;

    let revision = document.getElementById("inventoryRev").value;

    if (oldStatus == inventoryBookingCategory) {
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
      inventorypurchaseDate: inventorypurchaseDate,
      inventoryPrice: inventoryPrice,
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

    let url = "http://localhost:8080/v1/inventories/" + inventoryId;

    putInventory(inventoryItem, url);

    // initInventory();
  }
}

//--------------------------------------------------------------------------------
/**
 * refreashed inventory form after saving
 *
 */
//this is for the speichern button!
function refresh() {
  //refreshInventory();
  inputTranslation();
  if (inputValidationInventory()) {
    calcForm();
    return true;
  } else {
    return false;
  }
}

//--------------------------------------------------------------------------------
/**
 * refreshes inventory page
 *
 */
window.refreshInventory = function() {
  initInventory();
  showLastModified();

  //status ausgebucht?
  let status = document.getElementById("inventoryStatus").value;
  if (status == "Ausgebucht") {
    console.log("Datumabgebucht: ((vis))");
    document.getElementById("formEndDate").className = "d-block";
  } else {
    console.log("Datumabgebucht: ((invis))");
    document.getElementById("formEndDate").className = "d-none";
  }
}

//--------------------------------------------------------------------------------
/**
 * shows last modification
 *
 */
function showLastModified() {
  let lastModifiedValue = [document.lastModified].toString();
  let lastModifiedObj = {
    day: lastModifiedValue.split("/")[1],
    month: lastModifiedValue.split("/")[0],
    year: lastModifiedValue.split("/")[2].split(" ")[0],
    time:
      lastModifiedValue.split("/")[2].split(" ")[1].split(":")[0] +
      ":" +
      lastModifiedValue.split("/")[2].split(" ")[1].split(":")[1],
  };
  let lastModifiedResult =
    "Datum: " +
    lastModifiedObj.day +
    "." +
    lastModifiedObj.month +
    "." +
    lastModifiedObj.year +
    " - Uhr: " +
    lastModifiedObj.time;
  document.getElementById("edited").value = lastModifiedResult;
}

//--------------------------------------------------------------------------------
/**
 * changes visibility whenever date in form is changed
 *
 */
function dateChangeHandler() {
  let g = document.getElementById("inventoryPurchaseDate").className;
  g = g.replace("is-invalid", "");
  g = g.replace("is-valid", "");
  g = g.trim();
  document.getElementById("inventoryPurchaseDate").className = g + " is-invalid";
  document.getElementById("inventoryPurchaseDateInvalid").innerText =
    "evtl Preis geben dann Brechnen drucken!";
}

//--------------------------------------------------------------------------------
/**
 * Translates and corrects input from user grammatically
 *
 */
// Konvertieren von Eingaben in das richtige Format
// Bsp Trim bei Textfeldern
function inputTranslation() {
  // "Bezeichnung", "Seriennummer", "Typ" die vorherigen und hinteren Leerzeichen entfernen
  //Bezeichnung
  let label = document.getElementById("inventoryLabel").value;

  label = label.replace(/\s+/g, " ");
  label = label.trim();
  console.log("trimmed Bezeichnung: ", label);
  document.getElementById("inventoryLabel").value = label;
  //seriennummer
  let inventorySerialNumber = document.getElementById("inventorySerialNumber").value;

  inventorySerialNumber = inventorySerialNumber.replace(/\s+/g, " ");
  console.log("Serial Number after replace: ", inventorySerialNumber);
  inventorySerialNumber = inventorySerialNumber.trim();
  console.log("trimmed serial NUmber: ", inventorySerialNumber);

  document.getElementById("inventorySerialNumber").value = inventorySerialNumber;
  //typ
  let inventoryType = document.getElementById("inventoryType").value;
  console.log("trimmed Type: ", inventoryType);
  inventoryType = inventoryType.replace(/\s+/g, " ");
  inventoryType = inventoryType.trim();
  console.log("result type: ", inventoryType);
  document.getElementById("inventoryType").value = inventoryType;
  // Formatieren des Preises im Format: x.xxx,xx
  let inventoryPrice = document.getElementById("inventoryPrice").value;
  let itemId = document.getElementById("saveIDInventory").value;

  if (inventoryPrice <= 2000) {
    document.getElementById("inventoryBookingCategory").value = "GWG";
    if (itemId == "") {
      //neue Datensatz
      //nichts machen
      document.getElementById("inventoryDepreciationInput").value = 0;
    } else {
      //vorhandener Datensatz
      //nichts machen
    }
    document.getElementById("inventoryDepreciationInput").value = 0;
  } else {
    document.getElementById("inventoryBookingCategory").value = "Abschreibfähig";
    if (itemId == "") {
      //neue Datensatz
      //nichts machen
      if (document.getElementById("inventoryDepreciationInput").value == "") {
        //bleibt leer
      } else {
        //
      }
    } else {
      //vorhandener Datensatz
      //nichts machen
    }
  }
}

//--------------------------------------------------------------------------------
/**
 * calculator for input in form
 *
 */
//macht alle berechnungen auf eine Maske
function calcForm() {
  let status = document.getElementById("inventoryStatus").value;
  if (status == "Ausgebucht") {
    console.log("Datumabgebucht: ((vis))");
    document.getElementById("formEndDate").className = "d-block";
  } else {
    console.log("Datumabgebucht: ((invis))");
    document.getElementById("formEndDate").className = "d-none";
  }

  //inventoryPrice value to changes div (inventoryBookingCategory)
  let inventoryPrice = document.getElementById("inventoryPrice").value;
  //Show booking category
  if (inventoryPrice <= 2000 && inventoryPrice > 0) {
    document.getElementById("deprecationInputGroup").className = "d-none";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
    document.getElementById("inventoryDepreciationInput").value = 0;
  } else if (inventoryPrice <= 0) {
    document.getElementById("deprecationInputGroup").className = "d-none";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
  } else {
    document.getElementById("deprecationInputGroup").className = "d-block";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-block";
  }

  let inventorypurchaseDate = document.getElementById("inventoryPurchaseDate").value;
  let getMonth = new Date(inventorypurchaseDate);
  let inputMonthValue = parseInt(
    document.getElementById("inventoryDepreciationInput").value
  );
  let d = new Date(inventorypurchaseDate);
  let currentMonth = d.getMonth();
  d.setMonth(currentMonth + inputMonthValue);
  console.log("d: ", d);
  let pd = new Date(inventorypurchaseDate);
  console.log("d: ", d);
  document.getElementById("inventoryValidationEndDate").value = d
    .toISOString()
    .split("T")[0];
  let ved = document.getElementById("inventoryValidationEndDate").value;
  console.log("inventoryValidationEndDate is: ", ved);
  let v = document.getElementById("inventoryValidationEndDate").value;
  console.log("input Abgeschrieben am: ", v);

  //document.getElementById("inventoryValidationEndDate").value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();

  if (pd.getTime() <= d.getTime()) {
    console.log("time: ", pd.getTime());
    console.log(currentMonth);
  } else {
    console.log("resultDate is else!!?");
    //return false;
  }
  //asking for a better solution!!
  //inventoryPrice value to changes div (inventoryBookingCategory)
  //Show booking category
  if (inventoryPrice <= 2000 && inventoryPrice >= 0) {
    document.getElementById("inventoryBookingCategory").value = "GWG";
    let oldStatus = document.getElementById("hiddenStatus").value;
    let newStatus = document.getElementById("inventoryBookingCategory").value;
    if (oldStatus != newStatus) {
      //inventoryBookingCategoryChanged Modal
      document.getElementById("newStatusModal").innerText = newStatus;
      $("#inventoryBookingCategoryChanged").modal("show");
      console.log("inventoryBookingCategory is changed!! Alert!!");
      document.getElementById("hiddenStatus").value = newStatus;
    } else {
      console.log("inventoryBookingCategory is not changed!! ALERT!");
    }
  } else {
    console.log("category: Abschribsfähig");
    document.getElementById("inventoryBookingCategory").value = "Abschreibfähig";
    let oldStatus = document.getElementById("hiddenStatus").value;
    let newStatus = document.getElementById("inventoryBookingCategory").value;
    if (oldStatus != newStatus) {
      document.getElementById("newStatusModal").innerText = newStatus;
      if (newStatus == "Abschreibfähig") {
        console.warn("success!!!");
        let x = document.getElementById("inventoryDepreciationInput").className;
        x = x.replace("is-invalid", "");
        x = x.replace("is-valid", "");
        x = x.trim();
        document.getElementById("inventoryDepreciationInput").className =
          x + " is-invalid";
        document.getElementById("inventoryDepreciationInputIsInValid").innerText =
          "bitte erst anpassen dann Brechnen drucken!";
      }
      $("#inventoryBookingCategoryChanged").modal("show");
      console.log("inventoryBookingCategory is changed!! Alert!!");
      document.getElementById("hiddenStatus").value = newStatus;
    } else {
      console.log("inventoryBookingCategory is not changed!! ALERT!");
    }
  }
}

//--------------------------------------------------------------------------------
/**
 * resets values in form
 *
 */
//all Werte in Form zurückschalten
function resetFormInventory() {
  //reset value
  document.getElementById("inventoryStatus").value = "Aktiv";
  document.getElementById("inventoryLabel").value = "";
  document.getElementById("inventorySerialNumber").value = "";
  document.getElementById("inventoryType").value = "";
  document.getElementById("inventoryPurchaseDate").value = "";
  document.getElementById("inventoryPrice").value = "";
  document.getElementById("inventoryBookingCategory").value = "GWG";

  document.getElementById("inventoryDepreciationInput").value = "";
  document.getElementById("inventoryValidationEndDate").value = "";

  document.getElementById("saveIDInventory").value = "";
  document.getElementById("inventoryRev").value = "";

  //reset classname
  document.getElementById("inventoryStatus").className = "form-control";
  document.getElementById("inventoryLabel").className = "form-control";
  document.getElementById("inventorySerialNumber").className = "form-control";
  document.getElementById("inventoryType").className = "form-control";
  document.getElementById("inventoryPurchaseDate").className = "form-control";
  document.getElementById("inventoryPrice").className = "form-control";
  document.getElementById("inventoryBookingCategory").className = "form-control";
  document.getElementById("inventoryDepreciationInput").className = "form-control";
  document.getElementById("inventoryValidationEndDate").className = "form-control";
  document.getElementById("deprecationInputGroup").className = "d-none";
  document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
}

//--------------------------------------------------------------------------------
/**
 * shows a message under price when input changes in form
 *
 */
function priceInputChange() {
  console.log("price is changed");
  let y = document.getElementById("inventoryPrice").className;
  y = y.replace("is-invalid", "");
  y = y.replace("is-valid", "");
  y = y.trim();
  document.getElementById("inventoryPrice").className = y + " is-invalid";

  document.getElementById("inventoryPriceNotValid").innerText =
    "jetzt Brechnen drücken";
}

//--------------------------------------------------------------------------------
/**
 * shows Person table as modal
 *
 */
async function showAddPersonTable() {
  let persons = await getPersons();
  console.log("GET: person: ", persons);

  clearAddPersonTable();

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
      if (a.lastname < b.lastname) {
        return -1;
      }
      if (a.lastname > b.lastname) {
        return 1;
      }
      return 0;
    });
    //insertNewPersonRecord(persons);
    for (let i = 0; i < sortedPersonList.length; i++) {
      insertNewPersonRecord(sortedPersonList[i]);
    }
  }
}

//--------------------------------------------------------------------------------
/**
 * shows Person table as modal
 *
 */
function insertNewPersonRecord(person) {
  let table = document
    .getElementById("showAddPersonTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = person.lastname;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = person.firstname;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = person.email;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML =
    '<div class="text-center d-flex justify-content-between">' +
    '<button onClick="addPersonInInventory(' +
    "'" +
    person._id +
    "'" +
    ')" class="btn btn-info fa fa-plus" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>' +
    "</div>";
}

//--------------------------------------------------------------------------------
/**
 * clears Person table in modal
 *
 */
function clearAddPersonTable() {
  const addPersonTable = document.getElementById("showAddPersonTableBody");
  addPersonTable.innerHTML = "";
}

//--------------------------------------------------------------------------------
/**
 * add Person from table in modal to Inventory form
 *
 */
function addPersonInInventory(perID) {
  console.log("person id added in inventory: ", perID);
  document.getElementById("personIdInInventory").value = perID;
}
//--------------------------------------------------------------------------------
/**
 * add Person from table in modal to Inventory form
 *
 */
function showNewPerson() {
  $("#v-pills-person-tab").tab("show");
}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
