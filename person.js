 /*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        date: 1/13/2022 | time: 5:52 PM | name: Person | path: C:\deltastone\shamel-praktikum\person.js
  - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
/*
Global Section..
 */
const personTableIsEmpty = document.getElementById("personTableIsEmpty");
let saved_person = JSON.parse(localStorage.getItem('personList'));
//old_data.push(new_data);
localStorage.setItem('personList', JSON.stringify(saved_person));
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            name: getInputPerson | purpose: getting form input and assign it to obj
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getInputPerson(){
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
    let letters = /^[a-zA-Z]*$/;

    //Personal Nummer Validieren
    let personalNumber = getInputPerson().pPersonalNumber;
    let email = getInputPerson().pEmail;
    let l_name = getInputPerson().pLastName;
    let f_name = getInputPerson().pFirstName;
    const found_personal_number = personList.find(element => element.pPersonalNumber == getInputPerson().pPersonalNumber);
    const found_email = personList.find(element => element.pEmail == getInputPerson().pEmail);
    let is_email = getInputPerson().pEmail.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
    if(found_personal_number){
        let x = document.getElementById("pPersonalNumber").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("pPersonalNumber").className = x + " is-invalid";
            document.getElementById("pPersonalNumberIsInValid").innerText = "die Eingabe soll eindeutig sein!";
            ret = false;
    }else if (personalNumber == '' || personalNumber < 1){
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
    // E-Mail validieren
    if(is_email){
        let y = document.getElementById("pEmail").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("pEmail").className = y + " is-valid";
        if(found_email){
            let x = document.getElementById("pEmail").className;
                x = x.replace('is-invalid', '');
                x = x.replace('is-valid', '');
                x = x.trim();
                document.getElementById("pEmail").className = x + " is-invalid";
                document.getElementById("pEmailIsInValid").innerText = "die Eingabe soll eindeutig sein!";
                ret = false;
        }else if (email == ''){
            let x = document.getElementById("pEmail").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("pEmail").className = x + " is-invalid";
            document.getElementById("pEmailIsInValid").innerText = "es soll eine Eingabe geben!";
            ret = false;
        } else {
            let y = document.getElementById("pEmail").className;
            y = y.replace('is-invalid', '');
            y = y.replace('is-valid', '');
            y = y.trim();
            document.getElementById("pEmail").className = y + " is-valid";
        }
        
    } else {
        let x = document.getElementById("pEmail").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("pEmail").className = x + " is-invalid";
            document.getElementById("pEmailIsInValid").innerText = "die Eingabe ist kein E-Mail!";
            ret = false;
    }
    //Name validieren
    if (l_name == '' || !letters.test(l_name)){
        let x = document.getElementById("pLastName").className; 
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("pLastName").className = x + " is-invalid";
        document.getElementById("pLastNameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("pLastName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("pLastName").className = y + " is-valid";
    }
    //Vorname validieren
    if (f_name == '' || !letters.test(f_name)){
        let x = document.getElementById("pFirstName").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("pFirstName").className = x + " is-invalid";
        document.getElementById("pFirstNameIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("pFirstName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("pFirstName").className = y + " is-valid";
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
    cell5.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
                            "<button onClick=\"editPerson(" + personList.personItemID + ")\" class=\"btn btn-secondary\">bearbeiten</button>" +
                            "<button onClick=\"deletePerson(" + personList.personItemID + "); hidePerson();\" class=\"btn btn-danger\">löchen</button>" +
"</div>";
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
        let found_obj = personList.find(element => element.personItemID == personID );
        let found_obj_index = personList.indexOf(found_obj);

        if (personID == '' || !found_obj){
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
            if(found_obj){
                personItem.personItemID = personID;
                personList[found_obj_index] = personItem;
            }
            /*for (let i = 0; i < personList.length; i++) {
                if (personList[i].personItemID == personID){
                    personItem.personItemID = personID;
                    personList[i] = personItem;
                    break;
                    }
                }*/
            }



        localStorage.setItem("personList", JSON.stringify(personList));
        //eingabe validierung
        //Localstorage auslesen
        //push auf die Liste und nicht neu erstellen
        //die Liste ist am besten sortiert (array) nach name
        // in localstorage speichern
        //Tsbelle aktualiesieren
        initPerson();
    }else {
        console.log('saveperson in not starting because valid is not valid');
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
    showPerson();
    let personList = JSON.parse(localStorage.getItem('personList'));
    document.getElementById('pUpdateBtn').className = 'btn btn-success';
    document.getElementById('pSaveBtn').className = 'd-none';
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
function showPerson() {
    let sPerson = document.getElementById('sPerson').className;
    document.getElementById('pUpdateBtn').className = 'd-none';
    document.getElementById('pSaveBtn').className = 'btn btn-primary';
    if (sPerson == 'd-none') {
        document.getElementById('sPerson').className = 'd-block';
        document.getElementById('nPersonBtn').className = 'd-none';
        console.log('dblock');
    } else {
        console.log('showPerson is not working!!');
    }
     
}
function hidePerson(){
    refreshPerson();
    let hPerson = document.getElementById('sPerson').className;
    if(hPerson == 'd-block'){
        document.getElementById('sPerson').className = 'd-none';
        document.getElementById('nPersonBtn').className = 'form-row justify-content-center';
    } else {
        console.log('hidePerson is not working!!');
    }
}
function updatePerson() {
    let personList = JSON.parse(localStorage.getItem('personList'));
    let pLastName = document.getElementById("pLastName").value.trim();
    let pFirstName = document.getElementById("pFirstName").value.trim();
    let pPersonalNumber = document.getElementById("pPersonalNumber").value.trim();
    let pEmail = document.getElementById("pEmail").value.trim();
    let personID = document.getElementById("saveID").value;
    let personItem = {
        pLastName: pLastName,
        pFirstName: pFirstName,
        pPersonalNumber: pPersonalNumber,
        pEmail: pEmail
    };
    let found_obj = personList.find(element => element.personItemID == personID );
    let found_obj_index = personList.indexOf(found_obj);
    if(found_obj){
        personItem.personItemID = personID;
        personList[found_obj_index] = personItem;
    }
    localStorage.setItem("personList", JSON.stringify(personList));
    initPerson();
    /*
    let saveID = document.getElementById('saveID').value;
    deletePerson(saveID);
    savePerson(saveID);*/
}
function refreshPerson() {
    //aktuelle werte auf eingabefelder löchen
    document.getElementById("pLastName").value = '';
    document.getElementById("pFirstName").value = '';
    document.getElementById("pPersonalNumber").value = '';
    document.getElementById("pEmail").value = '';
    document.getElementById('saveID').value = '';

    document.getElementById("pLastName").className = 'form-control';
    document.getElementById("pFirstName").className = 'form-control';
    document.getElementById("pPersonalNumber").className = 'form-control';
    document.getElementById("pEmail").className = 'form-control';

}