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
                "lastname": '',
                "firstname": '',
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
        if(body.lastname){
            newBody.lastname = body.lastname;
        } else {
            newBody.lastname = this.#_body.lastname;
        }
        if(body.firstname){
            newBody.firstname = body.firstname;

        } else {
            newBody.firstname = this.#_body.firstname;
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

        if(body.lastname == '' || !letters.test(body.lastname)){
            msg = ('lastname ist nicht valid!');
            ret = false;
        } else {
            //alles gut ret ist true
        }

        if (body.firstname == '' || !letters.test(body.firstname)) {
            msg = ('firstname ist nicht valid!');
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
        body.lastname = body.lastname.replace(/ +/g, "");
        body.firstname = body.firstname.replace(/ +/g, "");
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


/* - - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        date: 1/13/2022 | time: 5:52 PM | name: Person | path: C:\deltastone\shamel-praktikum\person.js
  - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
/*
Global Section..
 */
const personTableIsEmpty = document.getElementById("personTableIsEmpty");

function sendHTTPRequest (method, url) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status != 200) { // analyze HTTP status of the response
                alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
                alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
                resolve(xhr.response);
            }
        };
        xhr.send();
    });
    return promise;
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                            name: getInputPerson | purpose: getting form input and assign it to obj
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function getInputPerson(){
    let personData = {};
    personData ["lastname"] = document.getElementById("lastname").value;
    personData ["firstname"] = document.getElementById("firstname").value;
    personData ["personalno"] = document.getElementById("personalno").value;
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
    let personalNumber = getInputPerson().personalno;
    let email = (getInputPerson().email).replace(/ +/g, "");
    let l_name = (getInputPerson().lastname).replace(/ +/g, "");
    let f_name = (getInputPerson().firstname).replace(/ +/g, "");
    const found_personal_number = personList.find(element => element.personalno == getInputPerson().personalno);
    const found_email = personList.find(element => element.email == getInputPerson().email);
    let is_email = email.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
    if(found_personal_number){
        let x = document.getElementById("personalno").className;
            x = x.replace('is-invalid', '');
            x = x.replace('is-valid', '');
            x = x.trim();
            document.getElementById("personalno").className = x + " is-invalid";
            document.getElementById("personalnoIsInValid").innerText = "die Eingabe soll eindeutig sein!";
            ret = false;
    }else if (personalNumber == '' || personalNumber < 1){
        let x = document.getElementById("personalno").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("personalno").className = x + " is-invalid";
        document.getElementById("personalnoIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("personalno").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("personalno").className = y + " is-valid";
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
        let x = document.getElementById("lastname").className; 
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("lastname").className = x + " is-invalid";
        document.getElementById("lastnameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("lastname").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("lastname").className = y + " is-valid";
    }
    //Vorname validieren
    if (f_name == '' || !letters.test(f_name)){
        let x = document.getElementById("firstname").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("firstname").className = x + " is-invalid";
        document.getElementById("firstnameIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("firstname").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("firstname").className = y + " is-valid";
    }

    return ret;
}
//---name: insertNewRecord | purpose: building a new row for every new query - insert dat from Person          ***

//Insert data from Person
//table not showing yet!
function insertNewRecord(persons){

    let table = document.getElementById("persons").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = persons.lastname;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = persons.firstname;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = persons.personalno;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = persons.email;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
                            "<button onClick=\"editPerson(" + persons._id + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deletePersonModel\" onClick=\"setRowID(" + persons._id + ")\"></button></div>" +
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

//---name: initPerson | purpose: parse from localstorage then insert a new person to personList          ***

async function initPerson(){
    //localstorage auslesen
    //mark 2 wokring...
    //promise that awaits for getPersons()
    let persons = await getPersons();
    console.log('GET: person: ', persons);
    hidePerson();
    // wenn:  Personenliste == leer
    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    clearPersonTable();
    if (!persons || persons.length == 0){
        let x = personTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        personTableIsEmpty.className = x + ' d-block' ;
        console.log('table is empty');
    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        let x = personTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        personTableIsEmpty.className = x + ' d-none' ;
        let sortedPersonList = persons.sort(function(a,b){
            if (a.lastname < b.lastname) {return -1;}
            if (a.lastname > b.lastname) {return  1;}
            return 0;
        });
        console.log(sortedPersonList);
        //insertNewRecord(persons);
        for (let i=0;i<sortedPersonList.length;i++) {
            insertNewRecord(sortedPersonList[i]);
        }
    }
    // alert: consol.log function-validation.
    //
    console.log("function initPerson");
}
//---name: postData | purpose: sending Person form to backend
function postData(postObj,url) {
    let xhr = new XMLHttpRequest();
    let personData = JSON.stringify(postObj)
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(personData);

    xhr.onload = function () {
        if(xhr.status === 201) {
            console.log("Post successfully created!");
        } else if (xhr.status === 400){
            console.log('400 (Bad Request)');
        }
    }

}
// must build a try catch (throw) here
async function getPersons() {
     return sendHTTPRequest('GET', 'http://localhost:8080/v1/persons');
}
/*function getPersons(getList, url){
    let personList = JSON.stringify(getList);
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();

    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log('GetAll successful' + personList);
        }
    }
    return personList;
}*/
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
        postData(getInputPerson(),'http://localhost:8080/v1/persons/');
        return;
        //localStorage ist nicht mehr gebraucht
        //let personList = JSON.parse(localStorage.getItem('personList'));

        let lastname = document.getElementById("lastname").value.trim();
        let firstname = document.getElementById("firstname").value.trim();
        let personalno = document.getElementById("personalno").value.trim();
        let email = document.getElementById("email").value.trim();
        let personID = document.getElementById("saveID").value;

        //capitalize names
        lastname = capitalizeFirstLetter(lastname.replace(/ +/g, ""));
        firstname = capitalizeFirstLetter(firstname.replace(/ +/g, ""));

        //storing as an object
        let personItem = {
            lastname: lastname,
            firstname: firstname,
            personalno: personalno,
            email: email
        };

        /*let found_obj = personList.find(element => element.personItemID == personID );
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
    }*/

}
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                name: deletePerson | purpose: delete person obj from localStorage and table
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
async function deletePerson(personID) {
    let persons = await getPersons();
    
    for(let i = 0; i < persons.length; i++){
        if (personId == persons[i].personItemID){
            persons.splice(i,1);
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
            document.getElementById("lastname").value = personList[i].lastname;
            document.getElementById("firstname").value = personList[i].firstname;
            document.getElementById("personalno").value = personList[i].personalno;
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
    let lastname = document.getElementById("lastname").value.trim();
    let firstname = document.getElementById("firstname").value.trim();
    let personalno = document.getElementById("personalno").value.trim();
    let email = document.getElementById("email").value.trim();
    let personID = document.getElementById("saveID").value;
    let personItem = {
        lastname: lastname,
        firstname: firstname,
        personalno: personalno,
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
    document.getElementById("lastname").value = '';
    document.getElementById("firstname").value = '';
    document.getElementById("personalno").value = '';
    document.getElementById("email").value = '';
    document.getElementById('saveID').value = '';

    document.getElementById("lastname").className = 'form-control';
    document.getElementById("firstname").className = 'form-control';
    document.getElementById("personalno").className = 'form-control';
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