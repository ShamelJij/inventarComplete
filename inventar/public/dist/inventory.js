//import {App} from '../app.js';
//let app = require(' ./app.js');

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
/*let saved_inventory = JSON.parse(localStorage.getItem('inventory'));
localStorage.setItem('inventory', JSON.stringify(saved_inventory));*/

//################################################################################
/**
 * @param {string} method
 * @param {string} url
 */
function sendHTTPRequest (method, url) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status != 200) { // analyze HTTP status of the response
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
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
function postData(postObj,url) {
    let xhr = new XMLHttpRequest();
    let inventoryData = JSON.stringify(postObj);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(inventoryData);

    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!");
            //alert am website
        } else if (xhr.status === 400){
            console.log('400 (Bad Request)');
            //alert am website
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * PUT /inventories
 *
 * @param {Object} postObj
 * @param {string} url
 */
function putInventory(postObj,url) {
    let xhr = new XMLHttpRequest();
    let inventoryData = JSON.stringify(postObj)
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(inventoryData);

    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log("Put successfully done!");
            initInventory();
        } else if (xhr.status === 400){
            console.log('invalid');
        } else if (xhr.status === 404){
            console.log('Inventory not found');
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * DELETE /inventory/{id}
 *
 * @param url
 */
async function delData(url) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            debugger;
            if(xhr.status === 200) {
                console.log("Delete successful!");
                initInventory();

            } else if (xhr.status === 404){
                console.log('inventory not found');
                initInventory();
            }
        }
        xhr.send();
    });
    return promise;

}

//--------------------------------------------------------------------------------
/**
 * GET /inventories
 *
 * @return {Array.<Objects>} inventories
 */
async function getInventories() {
    return sendHTTPRequest('GET', 'http://localhost:8080/v1/inventories');
}

//################################################################################
//form section
/**
 * get input form as an object
 *
 * @return {inventoryData}
 */
function getInputInventory() {
    let inventoryData = {};
    inventoryData ["status"] = document.getElementById("idStatus").value;
    inventoryData ["label"] = document.getElementById("idLabel").value;
    inventoryData ["serialnumber"] = document.getElementById("idInventorySerialNumber").value;
    inventoryData ["inventorytype"] = document.getElementById("idType").value;
    inventoryData ["purchasedate"] = document.getElementById("idPurchaseDate").value;
    inventoryData ["price"] = parseInt(document.getElementById("idPrice").value);
    inventoryData ["bookingcategory"] = document.getElementById("bookingCategory").value;
    inventoryData ["deprecationdate"] = parseInt(document.getElementById("idDepreciationInput").value);
    inventoryData ["validationenddate"] = document.getElementById("validationEndDate").value;
    console.log(typeof inventoryData.price);
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
    let purchasedate = document.getElementById("idPurchaseDate").value;
    //jetztgen Datum
    let nowDate = new Date().toISOString().split('T')[0];

    console.log('purchase date is: ', Number(purchasedate));
    console.log('now is: ', nowDate);

    if (purchasedate > nowDate) {
        console.log('purchase date is bigger than now');
        let x = document.getElementById("idPurchaseDate").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("idPurchaseDate").className = x + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum legt in Zukunft!";
        ret = false;
    } else if (purchasedate == '') {
        let t = document.getElementById("idPurchaseDate").className;
        t = t.replace('is-invalid', '');
        t = t.replace('is-valid', '');
        t = t.trim();
        document.getElementById("idPurchaseDate").className = t + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum ist leer!";
        ret = false;
    } else {
        console.log('purchase date is smaller than now');
        let y = document.getElementById("idPurchaseDate").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("idPurchaseDate").className = y + " is-valid";
        document.getElementById("idPurchaseDateValid").innerText = "Das Datum ist gültig!";
    }
    //price validation muss nicht negatives Wert haben
    let price = document.getElementById('idPrice').value;
    //parsing input to number without zeros on the left
    price = Number(price);
    document.getElementById('idPrice').value = price;
    console.log('the price is: ', price);

    //Show booking category
    if (price < 0) {
        console.log('price is negative');
        let x = document.getElementById("idPrice").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("idPrice").className = x + " is-invalid";
        document.getElementById("idPriceInvalid").innerText = "Kein negativem Wert bitte!";
        ret = false;
    } else {
        console.log('price is not negative');
        let y = document.getElementById("idPrice").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("idPrice").className = y + " is-valid";
        document.getElementById("idPriceValid").innerText = "Der Wert ist gültig!";
    }
    //deprecation validation idDepreciationInput
    //deprecation validation muss nicht negatives Wert haben
    let deprecationdate = document.getElementById('idDepreciationInput').value;
    deprecationdate = Number(deprecationdate);
    //Show booking category
    if (deprecationdate < 0) {
        console.log('deprecation is negative');
        let x = document.getElementById("idDepreciationInput").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("idDepreciationInput").className = x + " is-invalid";
        document.getElementById("idDepreciationInputIsInValid").innerText = "Kein negativem Wert bitte!";
        ret = false;
    } else {
        //--------------------------------------------------------------------
        //if new booking category is Abschreibfähig
        if (price <= 2000 && price >= 0) {
            document.getElementById('bookingCategory').value = 'GWG';
            let oldStatus = document.getElementById('hiddenStatus').value;
            let newStatus = document.getElementById('bookingCategory').value;
            if ( oldStatus != newStatus ){
                //bookingCategoryChanged Modal
                document.getElementById('newStatusModal').innerText = newStatus;
                $('#bookingCategoryChanged').modal('show');
                console.log('bookingcategory is changed!! Alert!!');
                document.getElementById('hiddenStatus').value = newStatus;
            }else{
                console.log('deprecation is not negative');
                let y = document.getElementById("idDepreciationInput").className;
                y = y.replace('is-invalid', '');
                y = y.replace('is-valid', '');
                y = y.trim();
                document.getElementById("idDepreciationInput").className = y + " is-valid";
                document.getElementById("idDepreciationInputIsValid").innerText = "Der Wert ist gültig!";
            }
        } else {
            let oldStatus = document.getElementById('hiddenStatus').value;
            let newStatus = document.getElementById('bookingCategory').value;
            if ( oldStatus != newStatus ){
                document.getElementById('newStatusModal').innerText = newStatus;
                if(newStatus == 'Abschreibfähig'){
                    document.getElementById("deprecationInputGroup").className = 'd-block';
                    document.getElementById("validationEndDateGroup").className = 'd-block';
                    console.warn('success!!!');
                    let x = document.getElementById("idDepreciationInput").className;
                    x = x.replace('is-invalid', '');
                    x = x.replace('is-valid', '');
                    x = x.trim();
                    document.getElementById("idDepreciationInput").className = x + " is-invalid";
                    document.getElementById("idDepreciationInputIsInValid").innerText = "bitte esrt anpassen dann Brechnen drücken!";
                    ret = false;
                }
                $('#bookingCategoryChanged').modal('show');
                console.log('bookingcategory is changed!! Alert!!');
                document.getElementById('hiddenStatus').value = newStatus;
            }else{
                console.log('bookingcategory is not changed!! ALERT!');
                document.getElementById("deprecationInputGroup").className = 'd-none';
                document.getElementById("validationEndDateGroup").className = 'd-none';
            }
        }
        //--------------------------------------------------------------------


    }
    //validating the label input not to be empty
    let labelInput = document.getElementById('idLabel').value;
    if (labelInput == '') {
        let l = document.getElementById("idLabel").className;
        l = l.replace('is-invalid', '');
        l = l.replace('is-valid', '');
        l = l.trim();
        document.getElementById("idLabel").className = l + " is-invalid";
        document.getElementById("idLabelIsInvalid").innerText = "leer!";
        //optional
        //ret = false;
    } else {
        let lv = document.getElementById("idLabel").className;
        lv = lv.replace('is-invalid', '');
        lv = lv.replace('is-valid', '');
        lv = lv.trim();
        document.getElementById("idLabel").className = lv + " is-valid";
        document.getElementById("idLabelIsValid").innerText = "Eingabe ist gültig";
        console.log('labelInput is not empty');
        //optional
        //ret = true;
    }
    //validating the label input not to be empty
    let serialnumber = document.getElementById('idInventorySerialNumber').value;
    if (serialnumber == '') {
        let sn = document.getElementById("idInventorySerialNumber").className;
        sn = sn.replace('is-invalid', '');
        sn = sn.replace('is-valid', '');
        sn = sn.trim();
        document.getElementById("idInventorySerialNumber").className = sn + " is-invalid";
        document.getElementById("idInventorySerialNumberIsInValid").innerText = "leer!";
        //optional
        //ret = false;
    } else {
        let snv = document.getElementById("idInventorySerialNumber").className;
        snv = snv.replace('is-invalid', '');
        snv = snv.replace('is-valid', '');
        snv = snv.trim();
        document.getElementById("idInventorySerialNumber").className = snv + " is-valid";
        document.getElementById("idInventorySerialNumberIsValid").innerText = "Eingabe ist gültig";
        console.log('serialnumber is not empty');
        //optional
        //ret = true;
    }
    //validating the label input not to be empty
    let inventorytype = document.getElementById('idType').value;
    if (inventorytype == '') {
        let it = document.getElementById("idType").className;
        it = it.replace('is-invalid', '');
        it = it.replace('is-valid', '');
        it = it.trim();
        document.getElementById("idType").className = it + " is-invalid";
        document.getElementById("idTypeIsInValid").innerText = "leer!";
        //optional
        //ret = false;
    } else {
        let itv = document.getElementById("idType").className;
        itv = itv.replace('is-invalid', '');
        itv = itv.replace('is-valid', '');
        itv = itv.trim();
        document.getElementById("idType").className = itv + " is-valid";
        document.getElementById("idTypeIsValid").innerText = "Eingabe ist gültig";
        console.log('Type is not empty');
        //optional
        //ret = true;
    }
    console.log('ret is: ', ret);
    return ret;
}

/*function getInventoryID() {
    let savedInventory = JSON.parse(localStorage.getItem('inventory'));
    let inventoryId;
    if (!savedInventory || savedInventory.length == 0) {
        inventoryId = 1;
    } else {
        inventoryId = savedInventory.length;
    }
    return inventoryId;
}*/

//--------------------------------------------------------------------------------
/**
 * inserts new record into table below form
 *
 * @param {Object} inventory
 */
function insertNewRecordInventory(inventory) {
    let table = document.getElementById("idInventoryList").getElementsByTagName('tbody')[0];
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
    cell10.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
        "<button onClick=\"editInventory(" + "\'" + inventory._id + "\'" + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>&nbsp;" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deleteInventoryModel\" onClick=\"setRowID(" + "\'" + inventory._id + "\'" + ")\"></button></div>" +
        "</div>";
}

//################################################################################
let globalInventoryId = 0;

//--------------------------------------------------------------------------------
function setRowId(Id){

    globalInventoryId = Id;
}

//--------------------------------------------------------------------------------
function getRowId(){
    let gid = globalInventoryId;
    return gid
}

//--------------------------------------------------------------------------------
/**
 * clears Inventory table
 *
 */
function clearInventoryTable() {
    const inventoryTable = document.getElementById("inventoryTableBody");
    inventoryTable.innerHTML = '';
}

//--------------------------------------------------------------------------------
/**
 * delete Inventory from form and from database
 *
 * @param {srting} inventoryId
 */
async function deleteInventory(inventoryId) {

    await delData('http://localhost:8080/v1/inventories/' + inventoryId);

    /*let inventory = await getInventories();
    for(let i = 0; i < inventory.length; i++) {
        if (inventoryId == inventory[i]._id) {
            let x = inventoryDelete.className
            x = x.replace('d-block','');
            x = x.replace('d-none','');
            x = x.trim();
            inventoryDelete.className = x + ' d-block';
            inventoryDeletedName.innerText = inventory[i].label;
            initInventory();
            setTimeout(function () {

                // Closing the alert
                $('#inventoryDelete').alert('close');
            }, 10000);
        } else {
            console.log('item cannot be delete. Must have id');
        }
    }
    initInventory();*/
    
}

//################################################################################
/**
 *
 * initiate Inventory page
 */
async function initInventory() {
    //localstorage auslesen
    let inventory = await getInventories();
    console.log('GET: inventory: ', inventory);
    
    clearInventoryTable();
    personCount();
    inventoryCount()
    
    if (!inventory || inventory.length == 0) {
        ;
        let x = inventoryTableIsEmpty.className
        x = x.replace('d-block', '');
        x = x.replace('d-none', '');
        x = x.trim();
        inventoryTableIsEmpty.className = x + ' d-block';
        console.log('table is empty');

    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        let x = inventoryTableIsEmpty.className
        x = x.replace('d-block', '');
        x = x.replace('d-none', '');
        x = x.trim();
        inventoryTableIsEmpty.className = x + ' d-none';

        //insertNewRecord(inventory);
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

            postData(getInputInventory(),'http://localhost:8080/v1/inventories/');

            let status = document.getElementById("idStatus").value.trim();
            let label = document.getElementById("idLabel").value.trim();
            let serialnumber = document.getElementById("idInventorySerialNumber").value.trim();
            let inventorytype = document.getElementById("idType").value.trim();
            let purchasedate = document.getElementById("idPurchaseDate").value.trim();
            let price = document.getElementById("idPrice").value.trim();
            let bookingcategory = document.getElementById("bookingCategory").value.trim();
            let deprecationdate = document.getElementById("idDepreciationInput").value.trim();
            let validationenddate = document.getElementById("validationEndDate").value.trim();

            let inventoryId = document.getElementById("saveIDInventory").value;

            //storing as an object
            let inventoryItem = {
                status: status,
                label: label,
                serialnumber: serialnumber,
                inventorytype: inventorytype,
                purchasedate: purchasedate,
                price: price,
                bookingcategory: bookingcategory,
                deprecationdate: deprecationdate,
                validationenddate: validationenddate
            };

            initInventory();
            
            hideInventory();
            
            /*document.getElementById("inventoryIsSaved").className = 'd-block';
            document.getElementById("inventoryIsSavedText").innerText = 'Item' + JSON.stringify(inventory[inventory.length - 1].label) + 'ist gespeichert';*/
        } else {
            console.log('saveInventory in not starting because valid is not valid');
        }
    } else {
            console.log('saveInventory is not working because refresh has not started');
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
    let inventory = await getInventories();
    document.getElementById('iUpdateBtn').className = 'btn btn-success';
    document.getElementById('iSaveBtn').className = 'd-none';
    for (let i = 0; i < inventory.length; i++) {
        if (inventoryId == inventory[i]._id) {

            console.log('editInventory', inventory[i]);

            document.getElementById("idStatus").value = inventory[i].status;
            document.getElementById("idLabel").value = inventory[i].label;
            document.getElementById("idInventorySerialNumber").value = inventory[i].serialnumber;
            document.getElementById("idType").value = inventory[i].inventorytype;
            document.getElementById("idPurchaseDate").value = inventory[i].purchasedate;
            document.getElementById("idPrice").value = inventory[i].price;
            document.getElementById("bookingCategory").value = inventory[i].bookingcategory;
            document.getElementById("idDepreciationInput").value = inventory[i].deprecationdate;
            document.getElementById("validationEndDate").value = inventory[i].validationenddate;

            document.getElementById("hiddenStatus").value = inventory[i].bookingcategory;

            document.getElementById("saveIDInventory").value = inventory[i]._id;

            document.getElementById("inventoryRev").value = inventory[i]._rev;

            break;
        }
    }
    //initInventory??
}

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function insertPersons(){

    let selectPerson = document.getElementById('inventorySelectPerson');
    let options = await getPersons();
    for(let i = 0; i < options.length; i++ ){
        let opt = options[i];
        let el = document.createElement('option');
        el.innerHTML = "<div class=\"text-center m-3\">" + opt.lastname + " " + opt.firstname + " " + "<span>" + opt.email + " " + opt.personalno +  "</span></div>";
        selectPerson.appendChild(el);
    }
}

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function personCount(){

    let persons = await getPersons();
    let personCount = document.getElementById('personCount');

    personCount.innerText = persons.length;
}

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function inventoryCount(){

    let inventories = await getInventories();
    let inventoryCount = document.getElementById('inventoryCount');

    inventoryCount.innerText = inventories.length;
}

//--------------------------------------------------------------------------------
/**
 * show Inventory form
 *
 */
async function showInventory() {
    await insertPersons();
    let sInventory = document.getElementById('sInventory').className;
    document.getElementById('iUpdateBtn').className = 'd-none';
    document.getElementById('iSaveBtn').className = 'btn btn-primary';
    if (sInventory == 'd-none') {
        document.getElementById('sInventory').className = 'd-block';
        document.getElementById('nInventoryBtn').className = 'd-none';
        console.log('dblock');
    } else {
        console.log('showInventory is not working!!');
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
    let hInventory = document.getElementById('sInventory').className;
    if (hInventory == 'd-block') {
        document.getElementById('sInventory').className = 'd-none';
        document.getElementById('nInventoryBtn').className = 'form-row justify-content-center';
    } else {
        console.log('hideInventory is not working!!');
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

            let status = document.getElementById("idStatus").value.trim();
            let label = document.getElementById("idLabel").value.trim();
            let serialnumber = document.getElementById("idInventorySerialNumber").value.trim();
            let inventorytype = document.getElementById("idType").value.trim();
            let purchasedate = document.getElementById("idPurchaseDate").value.trim();
            let price = document.getElementById("idPrice").value.trim();
            price = Number(price);
            let bookingcategory = document.getElementById("bookingCategory").value.trim();
            let deprecationdate = document.getElementById("idDepreciationInput").value.trim();
            deprecationdate = Number(deprecationdate);
            let validationenddate = document.getElementById("validationEndDate").value.trim();

            let inventoryId = document.getElementById("saveIDInventory").value;

            let oldStatus = document.getElementById('hiddenStatus').value;

            let revision = document.getElementById("inventoryRev").value;

            if(oldStatus == bookingcategory){
                console.log('status not changed');
            }else {
                console.log('status changed!!');
            }
            let inventoryItem = {
                status: status,
                label: label,
                serialnumber: serialnumber,
                inventorytype: inventorytype,
                purchasedate: purchasedate,
                price: price,
                bookingcategory: bookingcategory,
                deprecationdate: deprecationdate,
                validationenddate: validationenddate,
                _id:inventoryId,
                _rev: revision
            };
            if (inventoryItem._rev !== null){
                _rev: revision;
            } else {
                console.log('no revision in Inventory');
            }

            let url = 'http://localhost:8080/v1/inventories/' + inventoryId;

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
        calcForm()
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
function refreshInventory() {

    initInventory();
    showLastModified();

    //status ausgebucht?
    let status = document.getElementById("idStatus").value;
    if (status == "Ausgebucht") {
        console.log('Datumabgebucht: ((vis))');
        document.getElementById("formEndDate").className = 'd-block';
    } else {
        console.log('Datumabgebucht: ((invis))');
        document.getElementById("formEndDate").className = 'd-none';
    }

    //price value to changes div (bookingcategory)
    let price = document.getElementById('idPrice').value;
    //Show booking category
    if (price <= 2000 && price > 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';
    } else if (price <= 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';

    } else {
        document.getElementById("deprecationInputGroup").className = 'd-block';
        document.getElementById("validationEndDateGroup").className = 'd-block';

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
        day: lastModifiedValue.split('/')[1],
        month: lastModifiedValue.split('/')[0],
        year: lastModifiedValue.split('/')[2].split(' ')[0],
        time: lastModifiedValue.split('/')[2].split(' ')[1].split(':')[0] + ':' + lastModifiedValue.split('/')[2].split(' ')[1].split(':')[1]
    };
    let lastModifiedResult = 'Datum: ' + lastModifiedObj.day + '.' + lastModifiedObj.month + '.' + lastModifiedObj.year + ' - Uhr: ' + lastModifiedObj.time;
    document.getElementById('edited').value = lastModifiedResult;
}

//--------------------------------------------------------------------------------
/**
 * changes visibility whenever date in form is changed
 *
 */
function dateChangeHandler() {
    let g = document.getElementById("idPurchaseDate").className;
    g = g.replace('is-invalid', '');
    g = g.replace('is-valid', '');
    g = g.trim();
    document.getElementById("idPurchaseDate").className = g + " is-invalid";
    document.getElementById("idPurchaseDateInvalid").innerText = "evtl Preis geben dann Brechnen drucken!";
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
    let label = document.getElementById('idLabel').value;

    label = label.replace(/\s+/g, " ");
    label = label.trim();
    console.log('trimmed Bezeichnung: ', label);
    document.getElementById('idLabel').value = label;
    //seriennummer
    let serialnumber = document.getElementById('idInventorySerialNumber').value;

    serialnumber = serialnumber.replace(/\s+/g, " ");
    console.log('Serial Number after replace: ', serialnumber);
    serialnumber = serialnumber.trim();
    console.log('trimmed serial NUmber: ', serialnumber);

    document.getElementById('idInventorySerialNumber').value = serialnumber;
    //typ
    let inventorytype = document.getElementById('idType').value;
    console.log('trimmed Type: ', inventorytype);
    inventorytype = inventorytype.replace(/\s+/g, " ");
    inventorytype = inventorytype.trim();
    console.log('result type: ', inventorytype);
    document.getElementById('idType').value = inventorytype;
    // Formatieren des Preises im Format: x.xxx,xx
    let price = document.getElementById('idPrice').value;
    let itemId = document.getElementById('saveIDInventory').value;

    if (price <= 2000) {
        document.getElementById('bookingCategory').value = 'GWG';
        if (itemId == '') {
            //neue Datensatz
            //nichts machen
            document.getElementById('idDepreciationInput').value = 0;
        } else {
            //vorhandener Datensatz
            //nichts machen

        }
        document.getElementById('idDepreciationInput').value = 0;
    } else {
        document.getElementById('bookingCategory').value = 'Abschreibfähig';
        if (itemId == '') {
            //neue Datensatz
            //nichts machen
            if (document.getElementById('idDepreciationInput').value == '') {
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


    let status = document.getElementById("idStatus").value;
    if (status == "Ausgebucht") {
        console.log('Datumabgebucht: ((vis))');
        document.getElementById("formEndDate").className = 'd-block';
    } else {
        console.log('Datumabgebucht: ((invis))');
        document.getElementById("formEndDate").className = 'd-none';
    }


    //price value to changes div (bookingCategory)
    let price = document.getElementById('idPrice').value;
    //Show booking category
    if (price <= 2000 && price > 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';
        document.getElementById('idDepreciationInput').value = 0;
    } else if (price <= 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';

    } else {
        document.getElementById("deprecationInputGroup").className = 'd-block';
        document.getElementById("validationEndDateGroup").className = 'd-block';

    }


    let purchasedate = document.getElementById("idPurchaseDate").value;
    let getMonth = new Date(purchasedate);
    let inputMonthValue = parseInt(document.getElementById("idDepreciationInput").value);
    let d = new Date(purchasedate);
    let currentMonth = d.getMonth();
    d.setMonth(currentMonth + inputMonthValue);
    console.log("d: ", d);
    let pd = new Date(purchasedate);
    console.log('d: ', d);
    document.getElementById("validationEndDate").value = d.toISOString().split('T')[0];
    let ved = document.getElementById("validationEndDate").value;
    console.log('validationEndDate is: ', ved);
    let v = document.getElementById("validationEndDate").value;
    console.log('input Abgeschrieben am: ', v);

    //document.getElementById("validationEndDate").value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();

    if (pd.getTime() <= d.getTime()) {
        console.log("time: ", pd.getTime());
        console.log(currentMonth);


    } else {
        console.log('resultDate is else!!?');
        //return false;
    }
    //asking for a better solution!!
    //price value to changes div (bookingCategory)
    //Show booking category
    if (price <= 2000 && price >= 0) {
        document.getElementById('bookingCategory').value = 'GWG';
        let oldStatus = document.getElementById('hiddenStatus').value;
        let newStatus = document.getElementById('bookingCategory').value;
        if ( oldStatus != newStatus ){
            //bookingCategoryChanged Modal
            document.getElementById('newStatusModal').innerText = newStatus;
            $('#bookingCategoryChanged').modal('show');
            console.log('bookingCategory is changed!! Alert!!');
            document.getElementById('hiddenStatus').value = newStatus;
        }else{
            console.log('bookingCategory is not changed!! ALERT!');
        }
    } else {
        console.log('category: Abschribsfähig');
        document.getElementById('bookingCategory').value = 'Abschreibfähig';
        let oldStatus = document.getElementById('hiddenStatus').value;
        let newStatus = document.getElementById('bookingCategory').value;
        if ( oldStatus != newStatus ){
            document.getElementById('newStatusModal').innerText = newStatus;
            if(newStatus == 'Abschreibfähig'){
                console.warn('success!!!');
                let x = document.getElementById("idDepreciationInput").className;
                x = x.replace('is-invalid', '');
                x = x.replace('is-valid', '');
                x = x.trim();
                document.getElementById("idDepreciationInput").className = x + " is-invalid";
                document.getElementById("idDepreciationInputIsInValid").innerText = "bitte erst anpassen dann Brechnen drucken!";
            }
            $('#bookingCategoryChanged').modal('show');
            console.log('bookingCategory is changed!! Alert!!');
            document.getElementById('hiddenStatus').value = newStatus;
        }else{
            console.log('bookingCategory is not changed!! ALERT!');
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
    document.getElementById("idStatus").value = 'Aktiv';
    document.getElementById("idLabel").value = '';
    document.getElementById("idInventorySerialNumber").value = '';
    document.getElementById("idType").value = '';
    document.getElementById("idPurchaseDate").value = '';
    document.getElementById("idPrice").value = '';
    document.getElementById("bookingCategory").value = 'GWG';

    document.getElementById("idDepreciationInput").value = '';
    document.getElementById("validationEndDate").value = '';

    document.getElementById("saveIDInventory").value = '';

    //reset classname
    document.getElementById("idStatus").className = "form-control";
    document.getElementById("idLabel").className = "form-control";
    document.getElementById("idInventorySerialNumber").className = "form-control";
    document.getElementById("idType").className = "form-control";
    document.getElementById("idPurchaseDate").className = "form-control";
    document.getElementById("idPrice").className = "form-control";
    document.getElementById("bookingCategory").className = "form-control";
    document.getElementById("idDepreciationInput").className = "form-control";
    document.getElementById("validationEndDate").className = "form-control";
    document.getElementById("deprecationInputGroup").className = 'd-none';
    document.getElementById("validationEndDateGroup").className = 'd-none';


}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */


