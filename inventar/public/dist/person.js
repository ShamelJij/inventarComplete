/**
 * person FRONTEND
 */
//################################################################################
/**
 * Global section
 */
const personTableIsEmpty = document.getElementById("personTableIsEmpty");
const personDelete = document.getElementById("personDelete");
const personDeletedName = document.getElementById("personDeletedName");

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
                alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
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
 * POST /persons
 *
 * @param {Object} postObj
 * @param {string} url
 */
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

//--------------------------------------------------------------------------------
/**
 * PUT /persons
 *
 * @param {Object} postObj
 * @param {string} url
 */
function putData(postObj,url) {
    let xhr = new XMLHttpRequest();
    let personData = JSON.stringify(postObj)
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(personData);

    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log("Put successfully done!");
        } else if (xhr.status === 400){
            console.log('invalid');
        } else if (xhr.status === 404){
            console.log('Person not found');
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * DELETE /persons/{id}
 *
 * @param url
 */
function delData(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();

    xhr.onload = function () {
        if(xhr.status === 200) {
            alert("Delete successful!");
            initPerson();

        } else if (xhr.status === 404){
            alert('person not found');
            initPerson();
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * GET /persons
 *
 * @return {Array.<Objects>} persons
 */
async function getPersons() {
    return sendHTTPRequest('GET', 'http://localhost:8080/v1/persons');
}

//################################################################################
//form section
/**
 * get input form as an object
 *
 * @return {personData}
 */
function getInputPerson(){
    let personData = {};
    personData ["lastname"] = document.getElementById("lastname").value;
    personData ["firstname"] = document.getElementById("firstname").value;
    personData ["personalno"] = document.getElementById("personalno").value;
    personData ["email"] = document.getElementById("email").value;
    return personData;
}

//################################################################################
/**
 * input validation
 * 
 * @return {boolean} ret
 */

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

//--------------------------------------------------------------------------------
/**
 * inserts new record into table below form
 *
 * @param {Object} person
 */
function insertNewRecord(person){

    let table = document.getElementById("persons").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = person.lastname;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = person.firstname;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = person.personalno;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = person.email;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = person._id;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = "<div class=\"text-center d-flex justify-content-between\">" +
                            "<button onClick=\"editPerson("  + "\'" + person._id + "\'" + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>&nbsp;" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deletePersonModel\" onClick=\"setRowId(" + "\'"  + person._id + "\'" + ")\"></button></div>" +
        "</div>";
}

//################################################################################
let globalPersonId = 0;

//--------------------------------------------------------------------------------
function setRowId(Id){

    globalPersonId = Id;
 }

 //--------------------------------------------------------------------------------
 function getRowId(){
     let gid = globalPersonId;
     console.log('person id bug: ', gid);
     return gid
 }

//--------------------------------------------------------------------------------
/**
 * clears Person table
 *
 */
function clearPersonTable() {
    const personTable = document.getElementById("personTableBody");
    personTable.innerHTML = '';
}

//--------------------------------------------------------------------------------
/**
 * delete Person from form and from database
 *
 * @param {srting} personId
 */
 async function deletePerson(personId) {

     delData('http://localhost:8080/v1/persons/' + personId);

    let persons = await getPersons();
    for(let i = 0; i < persons.length; i++) {
        if (personId == persons[i]._id) {
            let x = personDelete.className
            x = x.replace('d-block','');
            x = x.replace('d-none','');
            x = x.trim();
            personDelete.className = x + ' d-block' ;
            personDeletedName.innerText = persons[i].firstname + ' ' + persons[i].lastname;
            setTimeout(function () {

                // Closing the alert
                $('#personDelete').alert('close');
            }, 5000);
        } else {
            console.log('this person is not listed at all');
        }
    }





    

}
//################################################################################
/**
 * 
 * initiate Person page
 */

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
        //insertNewRecord(persons);
        for (let i=0;i<sortedPersonList.length;i++) {
            insertNewRecord(sortedPersonList[i]);
        }
    }
    // alert: consol.log function-validation.
    console.log("function initPerson");
}

//################################################################################
/**
 * saving Person Object from form
 * 
 * 
 */
function savePerson(){
    if (inputValidationPerson()) {
        //mark 3
        postData(getInputPerson(),'http://localhost:8080/v1/persons/');
        //return;
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
    }

}


//--------------------------------------------------------------------------------
/**
 * edit Person in form 
 *
 * @param {string} personId
 */
async function editPerson(personId) {
    showPerson();
    let persons = await getPersons();
    document.getElementById('pUpdateBtn').className = 'btn btn-success';
    document.getElementById('pSaveBtn').className = 'd-none';
    for(let i = 0; i < persons.length; i++){
        if (personId == persons[i]._id){
            //wenn dateien löchen wollen dann:
            //personList.splice(i,1);
            console.log('editPerson', persons[i]);
            document.getElementById("lastname").value = persons[i].lastname;
            document.getElementById("firstname").value = persons[i].firstname;
            document.getElementById("personalno").value = persons[i].personalno;
            document.getElementById("email").value = persons[i].email;
            document.getElementById("saveID").value = persons[i]._id;
            break;
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * show Person form 
 *
 */
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

//--------------------------------------------------------------------------------
/**
 * hides Person in form 
 *
 */
function hidePerson(){
    refreshPerson();
    let hPerson = document.getElementById('sPerson').className;
    if(hPerson == 'd-block'){
        document.getElementById('sPerson').className = 'd-none';
        document.getElementById('nPersonBtn').className = 'form-row justify-content-center';
    } else {
        console.log('hidePerson is not activated!!');
    }
}   

//--------------------------------------------------------------------------------
/**
 * updates Person in form 
 *
 */
async function updatePerson() {
    let persons = await getPersons();
    let lastname = document.getElementById("lastname").value.trim();
    let firstname = document.getElementById("firstname").value.trim();
    let personalno = document.getElementById("personalno").value.trim();
    let email = document.getElementById("email").value.trim();
    let personID = document.getElementById("saveID").value;
    let revision = document.getElementById("revision").value;
    let personItem = {
        lastname: lastname,
        firstname: firstname,
        personalno: personalno,
        email: email,
        _id: personID
    };
    if (personItem._rev !== null){
        _rev: revision;
    } else {
        console.log('no revision in Person');
    }
    let url = 'http://localhost:8080/v1/persons/' + personID;
    //await
    putData(personItem, url);
    //await
    initPerson();
}

//--------------------------------------------------------------------------------
/**
 * refreashed Person page
 *
 */
function refreshPerson() {
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

//--------------------------------------------------------------------------------
/**
 * updates Person in form
 *
 */
function refreashPerson (){

}

//--------------------------------------------------------------------------------
/**
 * check for any failures with string taken from input in form  
 *
 */
function personInputTranslation(input) {

}

//--------------------------------------------------------------------------------
/**
 * capitalize first and last name in Person form
 *
 */
function capitalizeFirstLetter(string) {
     let words = string.split(' ');
     for (let i = 0; i < words.length; i++) {
         words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
     }
     return string = words.join(' ')
}