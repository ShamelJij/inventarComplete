/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/11/2022 | time: 11:28 AM | name: getInventoryID | path: C:\deltastone\shamel-praktikum\inventory.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
const inventoryTableIsEmpty = document.getElementById("inventoryTableIsEmpty");
let saved_inventory = JSON.parse(localStorage.getItem('inventoryList'));
localStorage.setItem('inventoryList', JSON.stringify(saved_inventory));


function getInventoryID() {
    let savedInventory = JSON.parse(localStorage.getItem('inventoryList'));
    let inventoryID;
    if (!savedInventory || savedInventory.length == 0) {
        inventoryID = 1;
    } else {
        inventoryID = savedInventory.length;
    }
    return inventoryID;
}

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/11/2022 | time: 10:37 AM | name: showLastModified | path: C:\deltastone\shamel-praktikum\inventory.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        time: 1:04 PM | name: showInventory | path: C:\deltastone\shamel-praktikum\inventory.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

function insertNewRecordInventory(inventoryList) {
    let table = document.getElementById("idInventoryList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = inventoryList.status;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = inventoryList.label;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = inventoryList.serialNumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = inventoryList.type;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = inventoryList.purchaseDate;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = inventoryList.price;
    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = inventoryList.bookingCategory;
    let cell8 = newRow.insertCell(7);
    cell8.innerHTML = inventoryList.deprecation;
    let cell9 = newRow.insertCell(8);
    cell9.innerHTML = inventoryList.validationEndDate;
    let cell10 = newRow.insertCell(9);
    cell10.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
        "<button onClick=\"editInventory(" + inventoryList.inventoryItemID + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deleteInventoryModel\" onClick=\"setRowID(" + inventoryList.inventoryItemID + ")\"></button></div>" +
        "</div>";
}

//get row id
let globalInventoryId = 0;

function setRowID(ID) {
    globalInventoryId = ID
}

function getRowID() {
    let gid = globalInventoryId;
    return gid
}


/*
old

function showInventory() {
   /!* let table = document.getElementById("idPersonList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = personList.pLastName;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = personList.pFirstName;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = personList.pPersonalNumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = personList.pEmail;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
        "<button onClick=\"editPerson(" + personList.personItemID + ")\" class=\"btn btn-secondary\">bearbeiten</button>" +
        "<button onClick=\"deletePerson(" + personList.personItemID + "); hidePerson();\" class=\"btn btn-danger\">löchen</button>" +
        "</div>";*!/
    let savedInventory = JSON.parse(localStorage.getItem('inventoryList'));
    let savedTable = document.getElementById('inventoryTable');
    const mainContainer = document.getElementById('mainContainer');
    const hrAfterTable = document.getElementById('afterTable');
    if (!savedTable) {
        //Table aufbauen
        let inventoryTable = document.createElement('table');
        let columnCount = savedInventory[0].length;
        console.log('building a table 1 ',columnCount);
        let row = inventoryTable.insertRow(-1);
        for (let i = 0; i < columnCount; i++) {
            console.log('building a table 1 ');
            let headerCell = document.createElement('th');
            headerCell.innerHTML = savedInventory[0][i];
            row.appendChild(headerCell);
        }
        for (let i = 0; i < savedInventory.length; i++) {
            console.log('building a table 2');
            row = inventoryTable.insertRow();
            for (let j = 0; j < columnCount; j++) {
                let cell = row.insertCell(-1);
                cell.innerHTML = savedInventory[i][j];
            }
        }
        console.log("no saved table");
        mainContainer.insertBefore(inventoryTable, hrAfterTable);
        inventoryTable.className = 'table table-striped';
        inventoryTable.id = 'inventoryTable';
        console.log('error at showInventory!!');

    } else {
        console.log('savedInventory: ',savedInventory);
        let table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
        let newRow = table.insertRow(table.length);
        let cell1 = newRow.insertCell(0);
        cell1.innerHTML = savedInventory[0].status;
        let cell2 = newRow.insertCell(1);
        cell2.innerHTML = savedInventory[0].label;
        let cell3 = newRow.insertCell(2);
        cell3.innerHTML = savedInventory[0].serialNumber;
        let cell4 = newRow.insertCell(3);
        cell4.innerHTML = savedInventory[0].type;
        let cell5 = newRow.insertCell(4);
        cell5.innerHTML = savedInventory[0].purchaseDate;
        let cell6 = newRow.insertCell(5);
        cell6.innerHTML = savedInventory[0].price;
        let cell7 = newRow.insertCell(6);
        cell7.innerHTML = savedInventory[0].bookingCategory;
        let cell8 = newRow.insertCell(7);
        cell8.innerHTML = savedInventory[0].deprecation;
        let cell9 = newRow.insertCell(8);
        cell9.innerHTML = savedInventory[0].validationEndDate;
        let cell10 = newRow.insertCell(9);
        cell10.innerHTML = `<div class="text-center">
                            <button onClick='editInventory(this)' class="btn btn-secondary">bearbeiten</button> <button onClick='deleteInventory(this.idPersonList)' class="btn btn-danger">löchen</button>
                       </div>`;
        cell10.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
            "<button onClick=\"editInventory(" + inventoryList.inventoryItemID + ")\" class=\"btn btn-secondary\">bearbeiten</button>" +
            "<button onClick=\"deleteInventory(" + inventoryListList.inventoryItemID + "); hideInventory();\" class=\"btn btn-danger\">löchen</button>" +
            "</div>";
    }
}*/
function showInventory() {
    let sInventory = document.getElementById('sInventory').className;
    document.getElementById('iUpdateBtn').className = 'd-none';
    document.getElementById('iSaveBtn').className = 'btn btn-primary';
    if (sInventory == 'd-none') {
        document.getElementById('sInventory').className = 'd-block';
        document.getElementById('nInventoryBtn').className = 'd-none';
        console.log('dblock');
    } else {
        console.log('showPerson is not working!!');
    }

}

function hideInventory() {
    refreshInventory();
    resetFormInventory();
    let hInventory = document.getElementById('sInventory').className;
    if (hInventory == 'd-block') {
        document.getElementById('sInventory').className = 'd-none';
        document.getElementById('nInventoryBtn').className = 'form-row justify-content-center';
    } else {
        console.log('hidePerson is not working!!');
    }
}

function clearInventoryTable() {
    const inventoryTable = document.getElementById("inventoryTableBody");
    inventoryTable.innerHTML = '';
}

function initInventoryTable() {
    //localstorage auslesen
    let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));
    // wenn:  Personenliste == leer
    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    clearInventoryTable();
    if (!inventoryList || inventoryList.length == 0) {
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
        let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));
        let x = inventoryTableIsEmpty.className
        x = x.replace('d-block', '');
        x = x.replace('d-none', '');
        x = x.trim();
        inventoryTableIsEmpty.className = x + ' d-none';

        //insertNewRecord(inventoryList);
        for (let i = 0; i < inventoryList.length; i++) {
            insertNewRecordInventory(inventoryList[i]);
        }
    }
}

function getInputInventory() {
    let inventoryData = {};
    inventoryData ["status"] = document.getElementById("idStatus").value;
    inventoryData ["label"] = document.getElementById("idLabel").value;
    inventoryData ["serialNumber"] = document.getElementById("idInventorySerialNumber").value;
    inventoryData ["type"] = document.getElementById("idType").value;
    inventoryData ["purchaseDate"] = document.getElementById("idPurchaseDate").value;
    inventoryData ["price"] = document.getElementById("idPrice").value;
    inventoryData ["bookingCategory"] = document.getElementById("bookingCategory").value;
    inventoryData ["deprecation"] = document.getElementById("idDepreciationInput").value;
    inventoryData ["validationEndDate"] = document.getElementById("validationEndDate").value;
    return inventoryData;
}

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        time: 12:55 PM | name: saveInventory | path: C:\deltastone\shamel-praktikum\inventory.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

//saving in localStorage
function saveInventory() {
    if (refresh()) {
        if (inputValidationInventory()) {

            let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));

            let status = document.getElementById("idStatus").value.trim();
            let label = document.getElementById("idLabel").value.trim();
            let serialNumber = document.getElementById("idInventorySerialNumber").value.trim();
            let type = document.getElementById("idType").value.trim();
            let purchaseDate = document.getElementById("idPurchaseDate").value.trim();
            let price = document.getElementById("idPrice").value.trim();
            let bookingCategory = document.getElementById("bookingCategory").value.trim();
            let deprecation = document.getElementById("idDepreciationInput").value.trim();
            let validationEndDate = document.getElementById("validationEndDate").value.trim();

            let inventoryID = document.getElementById("saveIDInventory").value;

            //storing as an object
            let inventoryItem = {
                status: status,
                label: label,
                serialNumber: serialNumber,
                type: type,
                purchaseDate: purchaseDate,
                price: price,
                bookingCategory: bookingCategory,
                deprecation: deprecation,
                validationEndDate: validationEndDate
            };
            let found_obj = inventoryList.find(element => element.inventoryItemID == inventoryID);
            let found_obj_index = inventoryList.indexOf(found_obj);

            if (inventoryID == '' || !found_obj) {
                //counter for itemID
                let inventoryItemID = localStorage.getItem('inventoryCounter');
                if (inventoryItemID === null) {
                    inventoryItemID = 0;
                } else {
                    inventoryItemID++;
                }
                localStorage.setItem("inventoryCounter", inventoryItemID);
                inventoryItem.inventoryItemID = inventoryItemID;
                // wenn:  Personenliste == leer
                // note(text):flag.. or tooltip wird and hidden div mit hinweiß
                //error handling
                if (!inventoryList || inventoryList.length == 0) {
                    inventoryList = []; // [personItem];
                    inventoryList.push(inventoryItem);
                }
                // sonst: neue Reihe zufügen für jeden Eintrag
                else {
                    //insertNewRecord(inventoryList);
                    inventoryList.push(inventoryItem);
                }
            } else {
                if (found_obj) {
                    inventoryItem.inventoryItemID = inventoryID;
                    inventoryList[found_obj_index] = inventoryItem;
                }
            }


            localStorage.setItem("inventoryList", JSON.stringify(inventoryList));
            //eingabe validierung
            //Localstorage auslesen
            //push auf die Liste und nicht neu erstellen
            //die Liste ist am besten sortiert (array) nach name
            // in localstorage speichern
            //Tsbelle aktualiesieren
            initInventoryTable();
            hideInventory();
            document.getElementById("inventoryIsSaved").className = 'd-block';
            document.getElementById("inventoryIsSavedText").innerText = 'Item' + JSON.stringify(inventoryList[inventoryList.length - 1].label) + 'ist gespeichert';
        } else {
            console.log('saveperson in not starting because valid is not valid');
        }
    } else {

    }

}


function dateChangeHandler() {
    let g = document.getElementById("idPurchaseDate").className;
    g = g.replace('is-invalid', '');
    g = g.replace('is-valid', '');
    g = g.trim();
    document.getElementById("idPurchaseDate").className = g + " is-invalid";
    document.getElementById("idPurchaseDateInvalid").innerText = "jetzt Brechnen drucken!";
}

// Konvertieren von Eingaben in das richtige Format
// Bsp Trim bei Textfeldern

function inputTranslation() {
    // "Bezeichnung", "Seriennummer", "Typ" die vorferen und hinteren Leerzeichen entfernen
    //Bezeichnung
    let label = document.getElementById('idLabel').value;

    label = label.replace(/\s+/g, " ");
    label = label.trim();
    console.log('trimmed Bezeichnung: ', label);
    document.getElementById('idLabel').value = label;
    //seriennummer
    let serialNumber = document.getElementById('idInventorySerialNumber').value;

    serialNumber = serialNumber.replace(/\s+/g, " ");
    console.log('Serial Number after replace: ', serialNumber);
    serialNumber = serialNumber.trim();
    console.log('trimmed serial NUmber: ', serialNumber);

    document.getElementById('idInventorySerialNumber').value = serialNumber;
    //typ
    let type = document.getElementById('idType').value;
    console.log('trimmed Type: ', type);
    type = type.replace(/\s+/g, " ");
    type = type.trim();
    console.log('result type: ', type);
    document.getElementById('idType').value = type;
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


function resetInventory() {
    let inventoryTable = document.getElementById('inventoryTable');
    localStorage.removeItem('inventoryList');
    inventoryTable.className = 'd-none'
}

//check all input validation
function inputValidationInventory() {

    //variable for refresh function for the return
    let ret = true;
    //Anschaffungsdatum validieren (muss nicht in zukunft sein)
    //Anschaffungsdatum als wert
    let purchaseDate = document.getElementById("idPurchaseDate").value;
    //jetztgen Datum
    let nowDate = new Date().toISOString().split('T')[0];

    console.log('purchase date is: ', Number(purchaseDate));
    console.log('now is: ', nowDate);

    if (purchaseDate > nowDate) {
        console.log('purchase date is bigger than now');
        let x = document.getElementById("idPurchaseDate").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("idPurchaseDate").className = x + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum legt in Zukunft!";
        ret = false;
    } else if (purchaseDate == '') {
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
    let deprecation = document.getElementById('idDepreciationInput').value;
    //Show booking category
    if (deprecation < 0) {
        console.log('deprecation is negative');
        let x = document.getElementById("idDepreciationInput").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("idDepreciationInput").className = x + " is-invalid";
        document.getElementById("idDepreciationInputIsInValid").innerText = "Kein negativem Wert bitte!";
        ret = false;
    } else {
        console.log('deprecation is not negative');
        let y = document.getElementById("idDepreciationInput").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("idDepreciationInput").className = y + " is-valid";
        document.getElementById("idDepreciationInputIsValid").innerText = "Der Wert ist gültig!";

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
    let serialNumber = document.getElementById('idInventorySerialNumber').value;
    if (serialNumber == '') {
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
    let inventoryType = document.getElementById('idType').value;
    if (inventoryType == '') {
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


    let purchaseDate = document.getElementById("idPurchaseDate").value;
    //let getMonth = new Date(purchaseDate);
    let inputMonthValue = parseInt(document.getElementById("idDepreciationInput").value);
    let d = new Date(purchaseDate);
    let currentMonth = d.getMonth();
    d.setMonth(currentMonth + inputMonthValue);
    console.log("d: ", d);
    let pd = new Date(purchaseDate);
    console.log('d: ', d.toISOString());
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
            $('#bookingCategoryChanged').modal('show');
            console.log('bookingCategory is changed!! Alert!!');
            document.getElementById('hiddenStatus').value = newStatus;
        }else{
            console.log('bookingCategory is not changed!! ALERT!');
        }
    }
}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
function refreshInventory() {

    showLastModified();
    initInventoryTable();

    //status ausgebucht?
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
    } else if (price <= 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';

    } else {
        document.getElementById("deprecationInputGroup").className = 'd-block';
        document.getElementById("validationEndDateGroup").className = 'd-block';

    }

    /*
    //old refreshForm
    //inventoyList existiert?
    let savedInventory = JSON.parse(localStorage.getItem('inventoryList'));
    const mainContainer = document.getElementById('mainContainer');
    const hrAfterTable = document.getElementById('afterTable');
    //wenn nein dann noTable dev zeigen
    if (!savedInventory || savedInventory.length == 0) {

        let noTable = document.getElementById('noTable');
        if (!noTable) {
            const noTable = document.createElement('div');
            mainContainer.insertBefore(noTable, hrAfterTable);
            noTable.className = 'alert alert-danger text-center';
            noTable.innerHTML = 'Localstorage ist leer!';
            noTable.id = 'noTable';
        } else {
            console.log('error at noTable!!');
        }
    } else {
        //wenn ja dann Inventory initializieren
        showInventory();
    }


    //status ausgebucht?
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
    } else if (price <= 0) {
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';

    } else {
        document.getElementById("deprecationInputGroup").className = 'd-block';
        document.getElementById("validationEndDateGroup").className = 'd-block';

    }
    initInventoryTable();*/
}

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

function editInventory(inventoryID) {
    showInventory();
    let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));
    document.getElementById('iUpdateBtn').className = 'btn btn-success';
    document.getElementById('iSaveBtn').className = 'd-none';
    for (let i = 0; i < inventoryList.length; i++) {
        if (inventoryID == inventoryList[i].inventoryItemID) {
            //wenn dateien löchen wollen dann:
            //personList.splice(i,1);
            console.log('editInventory', inventoryList[i]);
            document.getElementById("idStatus").value = inventoryList[i].status;
            document.getElementById("idLabel").value = inventoryList[i].label;
            document.getElementById("idInventorySerialNumber").value = inventoryList[i].serialNumber;
            document.getElementById("idType").value = inventoryList[i].type;
            document.getElementById("idPurchaseDate").value = inventoryList[i].purchaseDate;
            document.getElementById("idPrice").value = inventoryList[i].price;
            document.getElementById("bookingCategory").value = inventoryList[i].bookingCategory;
            document.getElementById("idDepreciationInput").value = inventoryList[i].deprecation;
            document.getElementById("validationEndDate").value = inventoryList[i].validationEndDate;

            document.getElementById("hiddenStatus").value = inventoryList[i].bookingCategory;

            document.getElementById("saveIDInventory").value = inventoryList[i].inventoryItemID;
            break;
        }
    }
    //initPerson??
}

function deleteInventory(inventoryID) {
    let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));

    for (let i = 0; i < inventoryList.length; i++) {
        if (inventoryID == inventoryList[i].inventoryItemID) {
            inventoryList.splice(i, 1);
            localStorage.setItem('inventoryList', JSON.stringify(inventoryList));
            break;
        }
    }

    initInventoryTable();
}

function updateInventory() {
    if (refresh()) {
        if (inputValidationInventory()) {
            let inventoryList = JSON.parse(localStorage.getItem('inventoryList'));

            let status = document.getElementById("idStatus").value.trim();
            let label = document.getElementById("idLabel").value.trim();
            let serialNumber = document.getElementById("idInventorySerialNumber").value.trim();
            let type = document.getElementById("idType").value.trim();
            let purchaseDate = document.getElementById("idPurchaseDate").value.trim();
            let price = document.getElementById("idPrice").value.trim();
            let bookingCategory = document.getElementById("bookingCategory").value.trim();
            let deprecation = document.getElementById("idDepreciationInput").value.trim();
            let validationEndDate = document.getElementById("validationEndDate").value.trim();

            let inventoryID = document.getElementById("saveIDInventory").value;

            let oldStatus = document.getElementById('hiddenStatus').value;

            if(oldStatus == bookingCategory){
                console.log('status not changed');
            }else {
                console.log('status changed!!');
            }
            let inventoryItem = {
                status: status,
                label: label,
                serialNumber: serialNumber,
                type: type,
                purchaseDate: purchaseDate,
                price: price,
                bookingCategory: bookingCategory,
                deprecation: deprecation,
                validationEndDate: validationEndDate
            };
            let found_obj = inventoryList.find(element => element.inventoryItemID == inventoryID);
            let found_obj_index = inventoryList.indexOf(found_obj);
            if (found_obj) {
                inventoryItem.inventoryItemID = inventoryID;
                inventoryList[found_obj_index] = inventoryItem;
            }
            localStorage.setItem("inventoryList", JSON.stringify(inventoryList));
            initInventoryTable();
        }
    }
}

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
