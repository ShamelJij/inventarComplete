/*export class Person {

    #_dbName;
    #_id;
    #_body;
    #_db;

// ToDo: append JSDoc for alle functions
    /!**
     *
     * @param id
     *!/
    constructor(id) {
        this.#_dbName = 'Person';
        this.#_db   = new Database(this.#_dbName);

        if (id) {
            this.#_id = id;
            this.#_body = this.#_db.get(id);
        } else {
            let schema = {
                "_id": null,
                "lastName": '',
                "firstName": '',
                "email": '',
                "personalId": ''
            };
            this.#_body = schema;
            this.#_id = null
        }

    }

    /!**
     *
     * @param body
     *!/
    save(body) {
        let newBody = this.#schema(body);
        if(this.#_id){
            newBody._id = this.#_id;
        }
        this.#_body = this.#_db.save(this.#_id, newBody);
    }

    /!**
     *
     * @param oldBodyId
     * @type {number}
     * @param newBody
     *!/
    update(id, newBody){
        //erst alle eingaben trimmen
        this.#translate(newBody);
        //dann eingaben validieren
        if (this.#validate(newBody)){
            this.#_id = id;
            this.save(newBody);
            console.log('item: ', id,'ist geupdated!');
        } else {

        }

    }

    get(id){
        return this.#_db.get(id);
    }

    /!**
     *@param body
     *@returns {Object}
     *!/
    #schema(body){
        // ToDo: Complete code for alle attributes
        let newBody = {};
        if(body.lastName){
            newBody.lastName = body.lastName;
        } else {
            newBody.lastName = this.#_body.lastName;
        }
        if(body.firstName){
            newBody.firstName = body.firstName;

        } else {
            newBody.firstName = this.#_body.firstName;
        }
        if(body.email){
            newBody.email = body.email;
        } else {
            newBody.email = this.#_body.email;
        }
        if(body.personalID){
            newBody.personalID = body.personalID;
        } else {
            newBody.personalID = this.#_body.personalID;
        }
        return newBody;
    }

    /!**
     *
     *!/
    #validate(body) {
        // ToDo: Validate mandantory fields
        let persons = Personsop.getAll();

        let ret = true;
        let msg = '';
        let letters = /^[a-zA-Z]*$/;
        let is_email = body.email.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
        const found_personal_number = (persons.find(element => element.personalID == body.personalID));
        const found_email = (persons.find(element => element.email == body.email));

        if(found_personal_number){
            console.log('test: ',found_personal_number);
            msg = (`personalNumber: ${body.personalID} ist gefunden und könnte nicht dupliziert!`);
            ret = false;
        }else if (body.personalID == '' || body.personalID < 1){
            msg = ('personalNumber ist leer oder kleiner als 1');
            ret = false;
        } else {
            console.log('body ',this.#_body);
            //alles gut und ret ist true
        }

        if(is_email){

            if (found_email){
                msg = (`email: ${body.email}  ist gefunden und könnte nicht dupliziert`);
                ret = false;
            } else if (body.email == ''){
                msg = ('email ist leer!');
                ret = false;
            } else {
                //alles gut ret ist true
            }

        } else {
            //Eingabe ist nicht email ret ist falsch
            msg =('E-Mail ist nicht valid!');
            ret = false;
        }

        if(body.lastName == '' || !letters.test(body.lastName)){
            msg = ('lastName ist nicht valid!');
            ret = false;
        } else {
            //alles gut ret ist true
        }

        if (body.firstName == '' || !letters.test(body.firstName)) {
            msg = ('firstName ist nicht valid!');
            ret = false;
        } else {
            //alles gut ret ist true
        }
        if(ret == false){
            console.warn('Eingabe ist nicht valid weil:', msg);
        }

        return ret;

    }

    /!**
     *
     *!/
    #translate(body) {
        // ToDo: trim all values
        body.email = body.email.replace(/ +/g, "");
        body.lastName = body.lastName.replace(/ +/g, "");
        body.firstName = body.firstName.replace(/ +/g, "");
        return body;
    }

    /!**
     *
     * @param id
     *!/
    delete(id){
        this.#_db.delete(id);
    }

    /!**
     *
     * @returns {*}
     *!/
    document(){
        return this.#_body;
    }
}*/
//----------------------------------------------------------------------------------------------------------------------
function getPersons(getList, url){
    let personList = JSON.stringify(getList);
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();
    
    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log('GetAll successful');
        }
    }
    return personList;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/13/2022 | time: 5:52 PM | name: Person | path: C:\deltastone\shamel-praktikum\person.js
  - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
/*
Global Section..
 */
const personTableIsEmpty = document.getElementById("personTableIsEmpty");

/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            name: getInputPerson | purpose: getting form input and assign it to obj
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getInputPerson(){
    let personData = {};
    personData ["lastName"] = document.getElementById("lastName").value;
    personData ["firstName"] = document.getElementById("firstName").value;
    personData ["personalNo"] = document.getElementById("personalNo").value;
    personData ["email"] = document.getElementById("email").value;
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
    let personalNumber = getInputPerson().personalNo;
    let email = (getInputPerson().email).replace(/ +/g, "");
    let l_name = (getInputPerson().lastName).replace(/ +/g, "");
    let f_name = (getInputPerson().firstName).replace(/ +/g, "");
    const found_personal_number = personList.find(element => element.personalNo == getInputPerson().personalNo);
    const found_email = personList.find(element => element.email == getInputPerson().email);
    let is_email = email.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
    if(found_personal_number){
        let x = document.getElementById("personalNo").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("personalNo").className = x + " is-invalid";
            document.getElementById("personalNoIsInValid").innerText = "die Eingabe soll eindeutig sein!";
            ret = false;
    }else if (personalNumber == '' || personalNumber < 1){
        let x = document.getElementById("personalNo").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("personalNo").className = x + " is-invalid";
        document.getElementById("personalNoIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("personalNo").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("personalNo").className = y + " is-valid";
    }
    // E-Mail validieren
    if(is_email){
        let y = document.getElementById("email").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("email").className = y + " is-valid";
        if(found_email){
            let x = document.getElementById("email").className;
                x = x.replace('is-invalid', '');
                x = x.replace('is-valid', '');
                x = x.trim();
                document.getElementById("email").className = x + " is-invalid";
                document.getElementById("emailIsInValid").innerText = "die Eingabe soll eindeutig sein!";
                ret = false;
        }else if (email == ''){
            let x = document.getElementById("email").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("email").className = x + " is-invalid";
            document.getElementById("emailIsInValid").innerText = "es soll eine Eingabe geben!";
            ret = false;
        } else {
            let y = document.getElementById("email").className;
            y = y.replace('is-invalid', '');
            y = y.replace('is-valid', '');
            y = y.trim();
            document.getElementById("email").className = y + " is-valid";
        }
        
    } else {
        let x = document.getElementById("email").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("email").className = x + " is-invalid";
            document.getElementById("emailIsInValid").innerText = "die Eingabe ist kein E-Mail!";
            ret = false;
    }
    //Name validieren
    if (l_name == '' || !letters.test(l_name)){
        let x = document.getElementById("lastName").className; 
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("lastName").className = x + " is-invalid";
        document.getElementById("lastNameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("lastName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("lastName").className = y + " is-valid";
    }
    //Vorname validieren
    if (f_name == '' || !letters.test(f_name)){
        let x = document.getElementById("firstName").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("firstName").className = x + " is-invalid";
        document.getElementById("firstNameIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("firstName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("firstName").className = y + " is-valid";
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
    cell1.innerHTML = personList.lastName;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = personList.firstName;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = personList.personalNo;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = personList.email;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
                            "<button onClick=\"editPerson(" + personList.personItemID + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deletePersonModel\" onClick=\"setRowID(" + personList.personItemID + ")\"></button></div>" +
        "</div>";
}
 //get row id
 let globalPersonId = 0;
 function setRowID(ID){
     globalPersonId = ID
 }
 function getRowID(){
     let gid = globalPersonId;
     return gid
 }
function clearPersonTable() {
    const personTable = document.getElementById("personTableBody");
    personTable.innerHTML = '';
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        name: initPerson | purpose: parse from localstorage then insert a new person to personList
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function initPerson(){
    //localstorage auslesen
    //mark 2 wokring...
    let personList = JSON.parse(getPersons('http://localhost:8080/v1/person'));
    hidePerson();
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

        //mark 1
        //let personList = JSON.parse(localStorage.getItem('personList'));
        let perosonList = JSON.parse(getPersons('http://localhost:8080/v1/person'));
        let x = personTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        personTableIsEmpty.className = x + ' d-none' ;
        /*let sortedPersonList = personList.sort(function(a,b){
            if (a.lastName < b.lastName) {return -1;}
            if (a.lastName > b.lastName) {return  1;}
            return 0;
        });
        console.log(sortedPersonList);*/
        console.log('getReq: ', personList);
        //insertNewRecord(personList);
        /*for (let i=0;i<sortedPersonList.length;i++) {
            insertNewRecord(sortedPersonList[i]);
        }*/
    }
    // alert: consol.log function-validation.
    //
    console.log("function initPerson");
}
//----------------------------------------------
let xhr = new XMLHttpRequest();

function postData(postObj,url) {
    let personData = JSON.stringify(postObj)
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(personData);

    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!")
        }
    }

}
/* function postData(personData,url) {
     fetch(url, {
         method: 'POST', // or 'PUT'
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(personData),
     })
         .then(response => response.json())
         .then(data => {
             console.log('Success:', data);
         })
         .catch((error) => {
             console.error('Error:', error);
         });
 }*/
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            name: savePerson | purpose: storing in localStorage and build a new row
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function savePerson(){
    if (inputValidationPerson()) {
        //mark 3
        postData(getInputPerson(),'http://localhost:8080/v1/person');
        //return;
        //localStorage ist nicht mehr gebraucht
        //let personList = JSON.parse(localStorage.getItem('personList'));

        let lastName = document.getElementById("lastName").value.trim();
        let firstName = document.getElementById("firstName").value.trim();
        let personalNo = document.getElementById("personalNo").value.trim();
        let email = document.getElementById("email").value.trim();
        let personID = document.getElementById("saveID").value;

        //capitalize names
        lastName = capitalizeFirstLetter(lastName.replace(/ +/g, ""));
        firstName = capitalizeFirstLetter(firstName.replace(/ +/g, ""));

        //storing as an object
        let personItem = {
            lastName: lastName,
            firstName: firstName,
            personalNo: personalNo,
            email: email
        };

        let found_obj = personList.find(element => element.personItemID == personID );
        let found_obj_index = personList.indexOf(found_obj);

        if (personID == '' || !found_obj){
            console.log('newitem saved');
            //counter for itemID
            let personItemID = localStorage.getItem('personCounter');
            if (personItemID === null) {
                personItemID = 0;
            } else {
                personItemID++;
            }
            localStorage.setItem("personCounter", personItemID);
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
            }



        localStorage.setItem("personList", JSON.stringify(personList));
        //eingabe validierung
        //Localstorage auslesen
        //push auf die Liste und nicht neu erstellen
        //die Liste ist am besten sortiert (array) nach name
        // in localstorage speichern
        //Tsbelle aktualiesieren
        initPerson();
        hidePerson();
    }else {
        console.log('saveperson in not starting because it is not valid');
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
            document.getElementById("lastName").value = personList[i].lastName;
            document.getElementById("firstName").value = personList[i].firstName;
            document.getElementById("personalNo").value = personList[i].personalNo;
            document.getElementById("email").value = personList[i].email;
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
    let lastName = document.getElementById("lastName").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let personalNo = document.getElementById("personalNo").value.trim();
    let email = document.getElementById("email").value.trim();
    let personID = document.getElementById("saveID").value;
    let personItem = {
        lastName: lastName,
        firstName: firstName,
        personalNo: personalNo,
        email: email
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
    document.getElementById("lastName").value = '';
    document.getElementById("firstName").value = '';
    document.getElementById("personalNo").value = '';
    document.getElementById("email").value = '';
    document.getElementById('saveID').value = '';

    document.getElementById("lastName").className = 'form-control';
    document.getElementById("firstName").className = 'form-control';
    document.getElementById("personalNo").className = 'form-control';
    document.getElementById("email").className = 'form-control';

}
function personInputTranslation(input) {

}
function capitalizeFirstLetter(string) {
     let words = string.split(' ');
     for (let i = 0; i < words.length; i++) {
         words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
     }
     return string = words.join(' ')
}