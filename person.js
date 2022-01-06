// Person
/*
Global Section
 */
const tableIsEmpty = document.getElementById("tableIsEmpty");
let saved_person = JSON.parse(localStorage.getItem('personList'));
//old_data.push(new_data);
localStorage.setItem('personList', JSON.stringify(saved_person));

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/5/2022 | time: 4:16 PM | name: readFormPersonData | path: C:\deltastone\shamel-praktikum\person.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
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
    console.log("this is formData: ",formData);
    return formData;
}
    console.log("form Data: ", readFormPersonData());

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/5/2022 | time: 4:16 PM | name: insertNewRecord | path: C:\deltastone\shamel-praktikum\person.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
//Insert data from Person
function insertNewRecord(personList){
    let table = document.getElementById("idPersonList").getElementsByTagName('tbody')[0];
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
    cell5.innerHTML = `<div class="text-center">
                            <button onClick='editPerson(this)' class="btn btn-secondary">bearbeiten</button> <button onClick='deletePerson(this.idPersonList)' class="btn btn-danger">löchen</button>
                       </div>`;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<i class="fa fa-clone" style="font-size:24px"></i>`;
}

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/5/2022 | time: 4:16 PM | name: initPerson | path: C:\deltastone\shamel-praktikum\person.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
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
        //insertNewRecord(personList);
        for (let i=0;i<personList.length;i++) {
            insertNewRecord(personList[i]);
            console.log(personList[i]);
        }
    }
    // alert: consol.log function-validation.
    //
    console.log("function initPerson")
}

/*
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/5/2022 | time: 4:15 PM | name: savePerson | path: C:\deltastone\shamel-praktikum\person.js
 - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
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
        //insertNewRecord(personList);
        personList.push(personItem);
    }
    localStorage.setItem("personList",JSON.stringify(personList));
    //eingabe validierung
    //Localstorage auslesen
    //push auf die Liste und nicht neu erstellen
    //die Liste ist am besten sortiert (array) nach name
    // in localstorage speichern
    //Tsbelle aktualiesieren

    // das ist nur ein test
    let items = [];
    let item1 = { i:1 };
    items.push(item1);
    localStorage.setItem("items", JSON.stringify(items));
    let stored = JSON.parse(localStorage.getItem("items"));
    let item2 = { i:2 };
    stored.push(item2);
    localStorage.setItem("items",JSON.stringify(stored));
    let result = JSON.parse(localStorage.getItem("items"));
    console.log(result,items,item1,item2);
}
/*function deletePerson(/!*parameter: ID. wird nach ID gelöcht*!/){
}*/

