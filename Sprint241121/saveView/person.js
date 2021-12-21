// Person
/*
Global Section
 */
const tableIsEmpty = document.getElementById("tableIsEmpty");
var old_data = JSON.parse(localStorage.getItem('data'));
old_data.push(new_data);
localStorage.setItem('data', JSON.stringify(old_data));

//--------------------------------------------------------------------------------
/*
Was macht das ...
 */
function readFormPersonData(){
    console.log("readFormPersonData")
    let formData = {};
    formData ["pLastName"] = document.getElementById("pLastName").value;
    formData ["pFirstName"] = document.getElementById("pFirstName").value;
    formData ["pPersonalNumber"] = document.getElementById("pPersonalNumber").value;
    formData ["pEmail"] = document.getElementById("pEmail").value;
    return formData;
}

//--------------------------------------------------------------------------------
//Insert data from Person
function insertNewRecord(data){
    let table = document.getElementById("pStoreList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.pLastName;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pFirstName;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.pPersonalNumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.pEmail;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick='editPerson(this)'>bearbeiten</button> <button onClick='deletePerson(this.pStoreList)'>löchen</button>`
}

//--------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------
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
/*function deletePerson(/!*parameter: ID. wird nach ID gelöcht*!/){
}*/