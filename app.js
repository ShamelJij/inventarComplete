
//check all input validation
function inputValidation() {
    //Anschaffungsdatum als wert
    let purchaseDate = document.getElementById("validationPurchaseDate").value;
    //jetztgen Datum
    let nowDate = new Date().toISOString().split('T')[0];

    console.log('purchasedate is: ', purchaseDate);
    console.log('now is: ',nowDate);

    if (purchaseDate > nowDate){
        console.log('purchase date is bigger than now');
    }
    else {
        console.log('purchase date is smaller than now');
    }

 /*
//Date + Monat
    var dt = new Date( "December 25, 1995 23:15:00" );
    //document.write("getMonth() : " + dt.getMonth() );
    let currentMonth = d.getMonth();
    let purchaseDate = document.getElementById("validationPurchaseDate").value;
    //let getMonth = new Date(purchaseDate);


    console.log("purchase date and current month ", currentMonth, purchaseDate);
//gegebene Anschaffungsdatum von Form als Var speichern
    // Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    function monthDiff(d1, d2) {
        console.log("m1: " + d1.getMonth(),
            "m2: " + d2.getMonth());
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();

        return months <= 0 ? 0 : months;
    }

    function monthCalc(d1, d2) {
        var diff = monthDiff(d1, d2);
        console.log(
            d1.toISOString().substring(0, 10),
            "to",
            d2.toISOString().substring(0, 10),
            ":",
            diff
        );

    }

    monthCalc(
        new Date(2020, 10, 16), // November 4th, 2008
        new Date()  // March 12th, 2010
    );
// Result: 16

    monthCalc(
        new Date(2010, 4, 1),  // January 1st, 2010
        new Date(2010, 2, 12)  // March 12th, 2010
    );
// Result: 2

    monthCalc(
        new Date(2010, 1, 1),  // February 1st, 2010
        new Date(2010, 2, 12)  // March 12th, 2010
    );
// Result: 1


// Divide Time with a year

*/






//Anschaffungsdatum validieren (muss nicht in zukunft sein)
    function puchaseDateValidation() {
        console.log("purchaseDateValidation started");

    }
    //unter Abschreibkategorie: entweder GWG oder Abschreibfähig





}

//macht alle berechnungen auf eine Maske
function calcForm(){
    let purchaseDate = document.getElementById("validationPurchaseDate").value;
    //let getMonth = new Date(purchaseDate);
    let inputMonthValue = parseInt(document.getElementById("depreciationInput").value);
    let d = new Date(purchaseDate);
    let currentMonth = d.getMonth();
    d.setMonth(currentMonth + inputMonthValue);
    console.log("d: ",d);
    let pd = new Date(purchaseDate);
    let resultDate = document.getElementById("validationEndDate").value;

    document.getElementById("validationEndDate").value= d.getFullYear()+"-"+parseInt(d.getMonth()+1)+"-"+d.getDay();


    console.log(resultDate);
    if (pd.getTime() <= d.getTime()){
        console.log("time");
        console.log(pd.getTime());
        console.log(currentMonth);



    }
    else{
        return false;
    }


//read date plus month and result is under by abgeschrieben
 /*   //Abschreiben am is the result for abschreibkategorie and abschreibzeitraum
    let price1 = document.getElementById('validationPrice').value;

    if (price1 <= 2000 && price >= 0){
        document.getElementById("formBookCategory").value = "GWG";
    }
    else {
        document.getElementById("formBookCategory").value = "Abschreibfähig";
    }*/

}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
function refreshForm(){
    console.log('works');

    //status ausgebucht
    let status = document.getElementById("formStatus").value;
    if (status == "Ausgebucht"){
        console.log('vis');
        document.getElementById("formEndDate").className = 'd-block';
    }
    else {
        console.log('invis');
        document.getElementById("formEndDate").className = 'd-none';
    }


    //price value to show or hide div (bookingCategory)
    let price = document.getElementById('validationPrice').value;
    //Show booking category
    let bCatValue = document.getElementById("formBookCategory").value;

    if (price <= 2000 && price >= 0){
        console.log('pricevis');

        document.getElementById("rowDepreciation").className = 'd-none';
    }
    else {
        console.log('priceinvis');
        document.getElementById("rowDepreciation").className = 'd-block';
    }




}











/*
const tableIsEmpty = document.getElementById("tableIsEmpty");

function readFormPersonData(){
    console.log("readFormPersonData")
    var formData = {};
    formData ["pLastName"] = document.getElementById("pLastName").value;
    formData ["pFirstName"] = document.getElementById("pFirstName").value;
    formData ["pPersonalNumber"] = document.getElementById("pPersonalNumber").value;
    formData ["pEmail"] = document.getElementById("pEmail").value;
    return formData;
}
var old_data = JSON.parse(localStorage.getItem('data'));
old_data.push(new_data);
localStorage.setItem('data', JSON.stringify(old_data));

//Insert data from Person
function insertNewRecord(data){
    var table = document.getElementById("pStoreList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.pLastName;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pFirstName;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.pPersonalNumber;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.pEmail;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick='editPerson(this)'>bearbeiten</button> <button onClick='deletePerson(this.pStoreList)'>löchen</button>`
}
function initPerson(){
    //localstorage auslesen
    let personList = JSON.parse(localStorage.getItem('personList'));
    console.log(JSON.stringify(personList));
    // wenn:  Personenliste == leer
    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    if (!personList || personList.length == 0){
            tableIsEmpty.style.display = 'block' ;
            console.log('table is empty');
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        console.log('building a new row');
        //insertNewRecord(data);
        for (let i=0;i<personList.length;i++) {
            insertNewRecord(personList[i]);
            console.log(personList[i]);

        }
    }


    // alert: consol.log function-validation.
    //
    console.log("function initPerson")

}
function savePerson(){

    let personList = JSON.parse(localStorage.getItem('personList'));
    console.log(JSON.stringify(personList));
    var pLastName = document.getElementById("pLastName").value.trim();
    var pFirstName = document.getElementById("pFirstName").value.trim();
    var pPersonalNumber = document.getElementById("pPersonalNumber").value.trim();
    var pEmail = document.getElementById("pEmail").value.trim();


    //counter for itemID
    var personItemID = localStorage.getItem('counter');
    if (personItemID === null) {
        personItemID = 0;
    } else {
        personItemID++;
    }
    localStorage.setItem("counter", personItemID);

    console.log("Storage Key: ", personItemID);

    //storing as an object
    let personItem = {
        personItemID: personItemID,
        pLastName: pLastName,
        pFirstName: pFirstName,
        pPersonalNumber: pPersonalNumber,
        pEmail: pEmail

    };
    // wenn:  Personenliste == leer
    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    if (!personList || personList.length == 0){
        personList = [personItem];
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        console.log('building a new row');
        //insertNewRecord(data);
        personList.push(personItem);
    }
    localStorage.setItem("personList",JSON.stringify(personList));

    //eingabe validierung
    //Localstorage auslesen
    //push auf die Liste und nicht neu erstellen
    //die Liste ist am besten sortiert (array) nach name
    // in localstorage speichern
    //Tsbelle aktualiesieren
}
function deletePerson(/!*parameter: ID. wird nach ID gelöcht*!/){

}



var limitInput = document.getElementById('limitInput');
var source = document.getElementById('nettoPrice');
var result = document.getElementById('result');
var warning = document.getElementById('warning');
var limit = 1000;
limitInput.addEventListener('blur', (event) => {
    limit = limitInput.value;
    console.log(limit);
    console.log(limitInput.value);
});
source.addEventListener('focus', (event) => {
    warning.style.display = "block";
});
source.addEventListener('blur',(event) => {
    warning.style.display = "none";
});

//The tooltip

   /!* $('[id = "nettoPrice"]').tooltip({
        delay: {
            show: 500,
            hide: 500
        }
    });*!/

// Input handler
var inputHandler = function(e) {
    const statusDiv = document.getElementById("hideDiv");
    statusDiv.style.display = "none";

    const statusResultDiv = document.getElementById("statusResult");
    statusResultDiv.style.display = "none";

    var nettoPriceValue =  parseInt(e.target.value);
    if (nettoPriceValue <= limit && nettoPriceValue > 0) {
        result.innerHTML = "GwG";
        statusDiv.style.display = "block";
        statusResultDiv.innerHTML = "Abgebucht";
        statusResultDiv.style.display = "block";



        console.log("before else: " + limit + " and " + nettoPriceValue);
    }
    else if (nettoPriceValue <= 0 ||  isNaN(nettoPriceValue)) {
        console.log("after else if: " + limit + " and " + nettoPriceValue);

            result.innerHTML ="Kein Wert";
            statusDiv.style.display = "none";
    }
    else {
        console.log("after else: " + limit + " and " + nettoPriceValue);
        result.innerHTML = "Abschreibfähig";
        statusDiv.style.display = "block";
        statusResultDiv.innerHTML = "Aktiv";
        statusResultDiv.style.display = "block";
    }
}
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);


//Table saved on localStorage and listed on page



document
    .getElementById("inputForm")
    .addEventListener("submit", function (event){

        event.preventDefault();
        var itemLabel = document.getElementById("itemLabel").value.trim();
        var itemType = document.getElementById("itemType").value.trim();
        var serialNumber = document.getElementById("serialNumber").value.trim();
        var nettoPrice = document.getElementById("nettoPrice").value.trim();

        /!*!//error handling
        if (!itemLabel || !itemType || !serialNumber || !nettoPrice){
            return;
        }*!/
        //counter for itemID
        var itemID = localStorage.getItem('counter');
        if (itemID === null) {
            itemID = 0;
        } else {
            itemID++;
        }
        localStorage.setItem("counter", itemID);

        console.log("Storage Key: ", itemID);

        //storing as an object
        var storeInfo = {
            itemID: itemID,
            itemLabel: itemLabel,
            itemType: itemType,
            serialNumber: serialNumber,
            nettoPrice: nettoPrice

        };
        console.log("Item label:", itemLabel);
        console.log("Item type:", itemType);
        console.log("Serial number:", serialNumber);
        console.log("Netto price:", nettoPrice);

        localStorage.setItem("storeInfo", JSON.stringify(storeInfo));
        console.log("Store Info Object:", storeInfo);


        //making a table from local storage
        var storeFormStoreArray = [storeInfo]
        buildTableStoreForm(storeFormStoreArray);
        function buildTableStoreForm(data){
            var table = document.getElementById('formStoreTable')

            for (var i = 0; i < data.length; i++){
                var row = `<tr>
                        <td>${data[i].itemID}</td>
                        <td>${data[i].itemLabel}</td>
                        <td>${data[i].itemType}</td>
                        <td>${data[i].serialNumber}</td>
                        <td>${data[i].nettoPrice}</td>
                        </tr>`
                table.innerHTML += row


            }
        }
    });

//building the  CRUD table

var selectedRow = null;
function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormPersonData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}
//Edit the data
function editPerson(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('pLastName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('pFirstName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('pPersonalNumber').value = selectedRow.cells[2].innerHTML;
    document.getElementById('pEmail').value = selectedRow.cells[3].innerHTML;

}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.pLastName;
    selectedRow.cells[1].innerHTML = formData.pFirstName;
    selectedRow.cells[2].innerHTML = formData.pPersonalNumber;
    selectedRow.cells[3].innerHTML = formData.pEmail;
}

//Delete the data
function onDelete(td){
    if(confirm('Wollen Sie wirklich löschen?')){
        row = td.parentElement.parentElement;
        document.getElementById('pStoreList').deleteRow(row.rowIndex);
        //localstorage aktualiesieren (array - push)
    }
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('pLastName').value;
    document.getElementById('pFirstName').value;
    document.getElementById('pPersonalNumber').value;
    document.getElementById('pEmail').value;
}

//Storing the Crud table in the local storage

document
    .getElementById("personForm")
    .addEventListener("submit", function (event){

        event.preventDefault();
        var pLastName = document.getElementById("pLastName").value.trim();
        var pFirstName = document.getElementById("pFirstName").value.trim();
        var pPersonalNumber = document.getElementById("pPersonalNumber").value.trim();
        var pEmail = document.getElementById("pEmail").value.trim();


        //counter for itemID
        var personItemID = localStorage.getItem('counter');
        if (personItemID === null) {
            personItemID = 0;
        } else {
            personItemID++;
        }
        localStorage.setItem("counter", personItemID);

        console.log("Storage Key: ", personItemID);

        //storing as an object
        var personInfo = {
            personItemID: personItemID,
            pLastName: pLastName,
            pFirstName: pFirstName,
            pPersonalNumber: pPersonalNumber,
            pEmail: pEmail

        };
        console.log("pLastName:", pLastName);
        console.log("pFirstName:", pFirstName);
        console.log("pPersonalNumber:", pPersonalNumber);
        console.log("pEmail:", pEmail);

        localStorage.setItem("personInfo", JSON.stringify(personInfo));
        console.log("Person Info Object:", personInfo);
    });*/
