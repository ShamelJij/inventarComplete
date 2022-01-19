/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/11/2022 | time: 11:28 AM | name: getInventoryID | path: C:\deltastone\shamel-praktikum\inventory.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
function getInventoryID() {
    let savedInventory = JSON.parse(localStorage.getItem('inventoryList'));
    let inventoryID;
    if(!savedInventory || savedInventory.length == 0){
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
function showInventory() {
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
        let cell11 = newRow.insertCell(10);
        cell11.innerHTML = `<i class="fa fa-clone" style="font-size:24px"></i>`;
    }
}

    /*
     - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            date: 1/11/2022 | time: 9:43 AM | name: initInventory | path: C:\deltastone\shamel-praktikum\inventory.js
     - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */
    function initInventory() {

        /*} else {
            console.log('building a new row');
            //insertNewRecord(data);
            //showInventory();
            console.log("show Inventory");

            let savedInventoryID = savedInventory.length;
            //checking on saveInventory



        }*/
        //console.log(inventoryTable);
    }


    function getInputInventory() {
        let inventoryData = {};

        /*inventoryData [0] = document.getElementById("idStatus").value;
        inventoryData [1] = document.getElementById("idLabel").value;
        inventoryData [2] = document.getElementById("idInventorySerialNumber").value;
        inventoryData [3] = document.getElementById("idType").value;
        inventoryData [4] = document.getElementById("idPurchaseDate").value;
        inventoryData [5] = document.getElementById("idPrice").value;
        inventoryData [6] = document.getElementById("bookingCategory").value;
        inventoryData [7] = document.getElementById("idDepreciationInput").value;
        inventoryData [8] = document.getElementById("validationEndDate").value;*/

        inventoryData ["status"] = document.getElementById("idStatus").value;
        inventoryData ["label"] = document.getElementById("idLabel").value;
        inventoryData ["serialNumber"] = document.getElementById("idInventorySerialNumber").value;
        inventoryData ["type"] = document.getElementById("idType").value;
        inventoryData ["purchaseDate"] = document.getElementById("idPurchaseDate").value;
        inventoryData ["price"] = document.getElementById("idPrice").value;
        inventoryData ["bookingCategory"] = document.getElementById("bookingCategory").value;
        inventoryData ["deprecation"] = document.getElementById("idDepreciationInput").value;
        inventoryData ["validationEndDate"] = document.getElementById("validationEndDate").value;
        console.log("inventoryData: ", inventoryData);
        return inventoryData;
    }

    /*
     - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            time: 12:55 PM | name: saveInventory | path: C:\deltastone\shamel-praktikum\inventory.js
     - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    */

//saving in localStorage
    function saveInventory() {
        getInventoryID();

        let inventoryList = [getInputInventory()];
        inventoryList.push(getInputInventory());
        localStorage.setItem("inventoryList", JSON.stringify(inventoryList));
        console.log('inventoryList----', inventoryList);
        showInventory();
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
    }


    function resetInventory() {
        let inventoryTable = document.getElementById('inventoryTable');
        localStorage.removeItem('inventoryList');
        inventoryTable.className = 'd-none'
    }

//check all input validation
    function inputValidation() {

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
        let price = document.getElementById('idPrice').value;
        //Show booking category
        if (price <= 2000 && price >= 0) {
            console.log('category: GWG');
            document.getElementById('bookingCategory').value = 'GWG';
        } else {
            console.log('category: Abschribsfähig');
            document.getElementById('bookingCategory').value = 'Abschreibfähig';
        }
    }

//function to refresh form calculated hide and visibility
    /*
    DIESE Funktion macht nur folgend und sonst nichts!:
    - Ein und Ausblenden von Designelementen. SONST NICHTS!
     */
    function refreshForm() {
        //zuletzt bearbeitet Feld
        showLastModified();
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
    }

//this is for the speichern button!
    function refresh() {
        refreshForm();
        inputTranslation();
        if (inputValidation()) {
            calcForm()
            return true;
        } else {
            return false;
        }

    }