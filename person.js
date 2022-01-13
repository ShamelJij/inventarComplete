 /*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        date: 1/13/2022 | time: 5:52 PM | name: Person | path: C:\deltastone\shamel-praktikum\person.js
  - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
/*
Global Section
 */
const personTableIsEmpty = document.getElementById("personTableIsEmpty");
let saved_person = JSON.parse(localStorage.getItem('personList'));
//old_data.push(new_data);
localStorage.setItem('personList', JSON.stringify(saved_person));
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            name: getInputInventory | purpose: getting form input and assign it to obj
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getInputInventory(){
    let personData = {};
    personData ["pLastName"] = document.getElementById("pLastName").value;
    personData ["pFirstName"] = document.getElementById("pFirstName").value;
    personData ["pPersonalNumber"] = document.getElementById("pPersonalNumber").value;
    personData ["pEmail"] = document.getElementById("pEmail").value;
    return personData;
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                        name: inputValidationPerson | purpose: input form validation
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function inputValidationPerson() {
    let ret = true;
    let personList = JSON.parse(localStorage.getItem('personList')) || [];

    //Personal Nummer Validieren
    let personalNumber = document.getElementById("pPersonalNumber").value;
    let personID = document.getElementById('saveID');
    for(let i = 0; i < personList.length; i++){
        if (personalNumber == personList[i].pPersonalNumber && personList[i].personItemID == personID){
            let x = document.getElementById("pPersonalNumber").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("pPersonalNumber").className = x + " is-invalid";
            document.getElementById("pPersonalNumberIsInValid").innerText = "die Eingabe soll eindeutig sein!";
            ret = false;
        } else {
            let y = document.getElementById("pPersonalNumber").className;
            y = y.replace('is-invalid', '');
            y = y.replace('is-valid', '');
            y = y.trim();
            document.getElementById("pPersonalNumber").className = y + " is-valid";

        }
        if (personalNumber == '' || personalNumber < 1){
            let x = document.getElementById("pPersonalNumber").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("pPersonalNumber").className = x + " is-invalid";
            document.getElementById("pPersonalNumberIsInValid").innerText = "es soll eine Eingabe geben!";
            ret = false;
        } else {
            let y = document.getElementById("pPersonalNumber").className;
            y = y.replace('is-invalid', '');
            y = y.replace('is-valid', '');
            y = y.trim();
            document.getElementById("pPersonalNumber").className = y + " is-valid";
        }
        //Personal Nummer Validieren
        let email = personList[i].pEmail;
        console.log('pppp',email);
        let personEmail = document.getElementById("pEmail").value;
        if (personEmail == personList[i].pEmail && personList[i].personItemID == personID){
            let m = document.getElementById("pEmail").className;
            m = m.replace('is-invalid', '');
            m = m.replace('is-valid', '');
            m = m.trim();
            document.getElementById("pEmail").className = m + " is-invalid";
            let y = document.getElementById("pEmail").className;
            document.getElementById("pEmailIsInValid").innerText = "Email ist schon gespeichert!";
            ret = false;

        }else {let mf = document.getElementById("pEmail").className;
            mf = mf.replace('is-invalid', '');
            mf = mf.replace('is-valid', '');
            mf = mf.trim();
            document.getElementById("pEmail").className = mf + " is-valid";
        }
        if (personEmail == ''){
            let m = document.getElementById("pEmail").className;
            m = m.replace('is-invalid', '');
            m = m.replace('is-valid', '');
            m = m.trim();
            document.getElementById("pEmail").className = m + " is-invalid";
            let y = document.getElementById("pEmail").className;
            document.getElementById("pEmailIsInValid").innerText = "es soll ein E-Mail geben!";
            ret = false;
        }else {
            let mf = document.getElementById("pEmail").className;
            mf = mf.replace('is-invalid', '');
            mf = mf.replace('is-valid', '');
            mf = mf.trim();
            document.getElementById("pEmail").className = mf + " is-valid";
        }
        /*if (person == ''){
            let m = document.getElementById("pLastName").className;
            m = m.replace('is-invalid', '');
            m = m.replace('is-valid', '');
            m = m.trim();
            document.getElementById("pLastName").className = m + " is-invalid";
            let y = document.getElementById("pLastName").className;
            document.getElementById("pLastNameIsInValid").innerText = "es soll ein E-Mail geben!";
            ret = false;
        }*/

    }
    return ret;
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                                name: insertNewRecord | purpose: building a new row for every new query
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
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
    cell5.innerHTML = "<div class=\"text-center\">" +
                            "<button onClick=\"editPerson(" + personList.personItemID + ")\" class=\"btn btn-secondary\">bearbeiten</button>" +
                            "<button onClick=\"deletePerson(" + personList.personItemID + ")\" class=\"btn btn-danger\">löchen</button>" +
"</div>";
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<i class="fa fa-clone" style="font-size:24px"></i>`;
}
function clearPersonTable() {
    const personTable = document.getElementById("personTableBody");
    personTable.innerHTML = '';
//    while (personTable.firstChild) {
  //      personTable.removeChild(personTable.lastChild);
    //}
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        name: initPerson | purpose: parse from localstorage then insert a new person to personList
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function initPerson(){
    //localstorage auslesen
    let personList = JSON.parse(localStorage.getItem('personList'));

    // wenn:  Personenliste == leer
    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    clearPersonTable();
    if (!personList || personList.length == 0){;
        let x = personTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        personTableIsEmpty.className = x + ' d-block' ;
        console.log('table is empty');

    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        let personList = JSON.parse(localStorage.getItem('personList'));
        let x = personTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        personTableIsEmpty.className = x + ' d-none' ;

        //insertNewRecord(personList);
        for (let i=0;i<personList.length;i++) {
            insertNewRecord(personList[i]);
        }
    }
    // alert: consol.log function-validation.
    //
    console.log("function initPerson")
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            name: savePerson | purpose: storing in localStorage and build a new row
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function savePerson(){
    if (inputValidationPerson()) {

        let personList = JSON.parse(localStorage.getItem('personList'));
        let pLastName = document.getElementById("pLastName").value.trim();
        let pFirstName = document.getElementById("pFirstName").value.trim();
        let pPersonalNumber = document.getElementById("pPersonalNumber").value.trim();
        let pEmail = document.getElementById("pEmail").value.trim();
        let personID = document.getElementById("saveID").value;

        //storing as an object
        let personItem = {
            pLastName: pLastName,
            pFirstName: pFirstName,
            pPersonalNumber: pPersonalNumber,
            pEmail: pEmail
        };

        if (personID == ''){

            console.log('newitem saved');
            //counter for itemID
            let personItemID = localStorage.getItem('counter');
            if (personItemID === null) {
                personItemID = 0;
            } else {
                personItemID++;
            }
            localStorage.setItem("counter", personItemID);
            personItem.personItemID = personItemID;
            // wenn:  Personenliste == leer
            // note(text):flag.. or tooltip wird and hidden div mit hinweiß
            //error handling
            if (!personList || personList.length == 0) {
                personList = []; // [personItem];
                personList.push(personItem);
            }
            // sonst: neue Reihe zufügen für jeden Eintrag
            else {
                console.log('building a new row');
                //insertNewRecord(personList);
                personList.push(personItem);
            }
        } else {
            for (let i = 0; i < personList.length; i++) {
                if (personList[i].personItemID == personID){
                    personItem.personItemID = personID;
                    personList[i] = personItem;
                    break;
                    }
                }
            }



        localStorage.setItem("personList", JSON.stringify(personList));
        //eingabe validierung
        //Localstorage auslesen
        //push auf die Liste und nicht neu erstellen
        //die Liste ist am besten sortiert (array) nach name
        // in localstorage speichern
        //Tsbelle aktualiesieren
        initPerson();
    }

}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                name: deletePerson | purpose: delete person obj from localStorage and table
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function deletePerson(personID) {
    let personList = JSON.parse(localStorage.getItem('personList'));
    for(let i = 0; i < personList.length; i++){
        if (personID == personList[i].personItemID){
            personList.splice(i,1);
            localStorage.setItem('personList', JSON.stringify(personList));
            break;
        }
    }
    initPerson();
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            name: editPerson | purpose: edit person obj from localStorage and table row
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function editPerson(personID) {
    let personList = JSON.parse(localStorage.getItem('personList'));
    for(let i = 0; i < personList.length; i++){
        if (personID == personList[i].personItemID){
            //wenn dateien löchen wollen dann:
            //personList.splice(i,1);
            console.log('editPerson', personList[i]);
            document.getElementById("pLastName").value = personList[i].pLastName;
            document.getElementById("pFirstName").value = personList[i].pFirstName;
            document.getElementById("pPersonalNumber").value = personList[i].pPersonalNumber;
            document.getElementById("pEmail").value = personList[i].pEmail;
            document.getElementById("saveID").value = personList[i].personItemID;
            break;
        }
    }
    //initPerson??
}