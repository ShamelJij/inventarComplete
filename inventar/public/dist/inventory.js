import { InitPage } from "./initPage.js";
import { getPersons } from "./person.js";
import { Requests } from "./requests.js";

let db = 'inventories';
//let app = require(' ./app.js');
let InitInventory = new InitPage('inventory');
let InventoryRequests = new Requests(db);
document.getElementById("showInventoryBtn").addEventListener("click", showInventory, false);

/**
 * inventory FRONTEND
 */
//################################################################################
/**
 * Global section
 */
InitInventory.assignEventsToHTMLElements();

//################################################################################
//routes section
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
  let inventoryPurchaseDate = document.getElementById("inventoryPurchaseDate").value;
  //jetztgen Datum
  let nowDate = new Date().toISOString().split("T")[0];

  console.log("purchase date is: ", Number(inventoryPurchaseDate));
  console.log("now is: ", nowDate);

  if (inventoryPurchaseDate > nowDate) {
    console.log("purchase date is bigger than now");
    let x = document.getElementById("inventoryPurchaseDate").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("inventoryPurchaseDate").className = x + " is-invalid";
    document.getElementById("inventoryPurchaseDateInvalid").innerText =
      "Das Datum legt in Zukunft!";
    ret = false;
  } else if (inventoryPurchaseDate == "") {
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
      let inventoryOldStatus = document.getElementById("inventoryHiddenStatus").value;
      let newStatus = document.getElementById("inventoryBookingCategory").value;
      if (inventoryOldStatus != newStatus) {
        //inventoryBookingCategoryChanged Modal
        document.getElementById("newStatusModal").innerText = newStatus;
        $("#inventoryBookingCategoryChanged").modal("show");
        document.getElementById("inventoryHiddenStatus").value = newStatus;
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
      let inventoryOldStatus = document.getElementById("inventoryHiddenStatus").value;
      let newStatus = document.getElementById("inventoryBookingCategory").value;
      if (inventoryOldStatus != newStatus) {
        document.getElementById("newStatusModal").innerText = newStatus;
        if (newStatus == "Abschreibfähig") {
          document.getElementById("inventoryDepreciationGroup").className =
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
        document.getElementById("inventoryHiddenStatus").value = newStatus;
      } else {
        console.log("bookingcategory is not changed!! ALERT!");
        document.getElementById("inventoryDepreciationGroup").className = "d-none";
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
InitInventory.insertNewRecord(InventoryRequests.getAll('inventories'));


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
InventoryRequests.del
async function deleteInventory(inventoryId) {
  let db = 'inventories';
  InventoryRequests.del(db, inventoryId);

  let inventory = await InventoryRequests.getById(db ,inventoryId);

  //here should be myAlert.delete(inventory)
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
  let objArray = await InventoryRequests.getAll(data);
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
  if (calculate()) {
    if (inputValidationInventory()) {
      postInventory(
        getInputInventory()
      );

      let personIdInInventory = document.getElementById("personIdInInventory").value;
      let status = document.getElementById("inventoryStatus").value.trim();
      let label = document.getElementById("inventoryLabel").value.trim();
      let inventorySerialNumber = document
        .getElementById("inventorySerialNumber")
        .value.trim();
      let inventoryType = document.getElementById("inventoryType").value.trim();
      let inventoryPurchaseDate = document.getElementById("inventoryPurchaseDate").value.trim();
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
      let inventoryId = document.getElementById("inventoryId").value;

      //storing as an object
      let inventoryItem = {
        personIdInInventory: personIdInInventory,
        status: status,
        label: label,
        inventorySerialNumber: inventorySerialNumber,
        inventoryType: inventoryType,
        inventoryPurchaseDate: inventoryPurchaseDate,
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
  document.getElementById("updateInventoryBtn").className = "btn btn-success";
  document.getElementById("saveInventoryBtn").className = "d-none";

  console.log("editInventory", inventory);

  document.getElementById("inventoryStatus").value = inventory.status;
  document.getElementById("inventoryLabel").value = inventory.label;
  document.getElementById("inventorySerialNumber").value =
    inventory.inventorySerialNumber;
  document.getElementById("inventoryType").value = inventory.inventoryType;
  document.getElementById("inventoryPurchaseDate").value = inventory.inventoryPurchaseDate;
  document.getElementById("inventoryPrice").value = inventory.inventoryPrice;
  document.getElementById("inventoryBookingCategory").value = inventory.inventoryBookingCategory;
  document.getElementById("inventoryDepreciationInput").value =
    inventory.inventoryDepreciationDate;
  document.getElementById("inventoryValidationEndDate").value =
    inventory.inventoryValidationDate;
  document.getElementById("inventoryHiddenStatus").value = inventory.inventoryBookingCategory;
  document.getElementById("inventoryId").value = inventory._id;
  document.getElementById("inventoryRevisionId").value = inventory._rev;
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
  document.getElementById("updateInventoryBtn").className = "d-none";
  document.getElementById("saveInventoryBtn").className = "btn btn-primary";
  if (showInventory == "d-none") {
    document.getElementById("showInventory").className = "d-block";
    document.getElementById("newInventoryBtn").className = "d-none";
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
    document.getElementById("newInventoryBtn").className = "form-row justify-content-center";
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
  if (calculate()) {
    let inventory = await getInventories();
    let personIdInInventory = document.getElementById("personIdInInventory").value;
    let status = document.getElementById("inventoryStatus").value.trim();
    let label = document.getElementById("inventoryLabel").value.trim();
    let inventorySerialNumber = document
      .getElementById("inventorySerialNumber")
      .value.trim();
    let inventoryType = document.getElementById("inventoryType").value.trim();
    let inventoryPurchaseDate = document.getElementById("inventoryPurchaseDate").value.trim();
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

    let inventoryId = document.getElementById("inventoryId").value;

    let inventoryOldStatus = document.getElementById("inventoryHiddenStatus").value;

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

    putInventory(inventoryItem, inventoryId);

    // initInventory();
  }
}

//--------------------------------------------------------------------------------
/**
 * refreashed inventory form after saving
 *
 */
//this is for the speichern button!
function calculate() {
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
//this will change to InitPage.assignEventsToHTMLElements()
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
  let itemId = document.getElementById("inventoryId").value;

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
    document.getElementById("formEndDate").className = "d-block";
  } else {
    document.getElementById("formEndDate").className = "d-none";
  }

  //inventoryPrice value to changes div (inventoryBookingCategory)
  let inventoryPrice = document.getElementById("inventoryPrice").value;
  //Show booking category
  if (inventoryPrice <= 2000 && inventoryPrice > 0) {
    document.getElementById("inventoryDepreciationGroup").className = "d-none";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
    document.getElementById("inventoryDepreciationInput").value = 0;
  } else if (inventoryPrice <= 0) {
    document.getElementById("inventoryDepreciationGroup").className = "d-none";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-none";
  } else {
    document.getElementById("inventoryDepreciationGroup").className = "d-block";
    document.getElementById("inventoryValidationEndDateGroup").className = "d-block";
  }

  let inventoryPurchaseDate = document.getElementById("inventoryPurchaseDate").value;
  let inputMonthValue = parseInt(
    document.getElementById("inventoryDepreciationInput").value
  );
  let d = new Date(inventoryPurchaseDate);
  let currentMonth = d.getMonth();
  d.setMonth(currentMonth + inputMonthValue);
  console.log("d: ", d);
  let pd = new Date(inventoryPurchaseDate);
  console.log("d: ", d);
  document.getElementById("inventoryValidationEndDate").value = d.toISOString().split("T")[0];
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
    let inventoryOldStatus = document.getElementById("inventoryHiddenStatus").value;
    let newStatus = document.getElementById("inventoryBookingCategory").value;
    if (inventoryOldStatus != newStatus) {
      //inventoryBookingCategoryChanged Modal
      document.getElementById("newStatusModal").innerText = newStatus;
      $("#inventoryBookingCategoryChanged").modal("show");
      console.log("inventoryBookingCategory is changed!! Alert!!");
      document.getElementById("inventoryHiddenStatus").value = newStatus;
    } else {
      console.log("inventoryBookingCategory is not changed!! ALERT!");
    }
  } else {
    console.log("category: Abschribsfähig");
    document.getElementById("inventoryBookingCategory").value = "Abschreibfähig";
    let inventoryOldStatus = document.getElementById("inventoryHiddenStatus").value;
    let newStatus = document.getElementById("inventoryBookingCategory").value;
    if (inventoryOldStatus != newStatus) {
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
      document.getElementById("inventoryHiddenStatus").value = newStatus;
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
  let inventoryFormIds = ['inventoryStatus', 'inventoryLabel', 'inventorySerialNumber',
  'inventoryType', 'inventoryPurchaseDate', 'inventoryPrice', 'inventoryBookingCategory',
  'inventoryDepreciationInput', 'inventoryValidationEndDate', 'inventoryId', 'inventoryRevisionId'];
  let inventoryForm = {};
  for(let i = 0; i < inventoryFormIds.length; i++){
    if(inventoryFormIds[i] === 'inventoryStatus'){
      document.getElementById(inventoryFormIds[i]).value = "Aktiv";
    }else if(inventoryFormIds[i] === 'inventoryBookingCategory'){
      document.getElementById(inventoryFormIds[i]).value = "GWG";
    }
   document.getElementById(inventoryFormIds[i]).value = "";
  }

  //reset classname
  for (let i = 0; i < inventoryFormIds.length; i++) {
    if (inventoryFormIds[i] === 'inventoryDepreciationGroup' || inventoryFormIds[i] === 'inventoryValidationEndDateGroup') {
    document.getElementById(inventoryFormIds[i]).className = 'd-none';
    }
    document.getElementById(inventoryFormIds[i]).className = '';
  }
}

//--------------------------------------------------------------------------------
/**
 * shows a message under price when input changes in form
 *
 */
function inventoryPriceChange() {
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
  $("#personPage").tab("show");
}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
