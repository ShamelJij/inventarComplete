//import { MyAlert } from "./myAlert";
//import { Req } from "./request";
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
//make id the same name as function and then id to the end of id
//################################################################################
/**
 * Custom Functions
 */
//--------------------------------------------------------------------------------
function customAlert(elementId, strongText, text, delay) {
  let x = elementId.className;
  x = x.replace("d-block", "");
  x = x.replace("d-none", "");
  x = x.trim();
  elementId.className = x + " d-block";
  personDeletedName.innerText =
    persons[i].personFirstName + " " + persons[i].personLastName;
  setTimeout(function () {
    // Closing the alert
    $("#personDelete").alert("close");
  }, 5000);
}

//################################################################################
/**
 * @param {string} method
 * @param {string} url
 */
function sendHTTPRequest(method, url) {
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status != 200) {
        // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else {
        // show the result
        console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
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
function postPerson(postObj, url) {
  let xhr = new XMLHttpRequest();
  let personData = JSON.stringify(postObj);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(personData);

  xhr.onload = function () {
    if (xhr.status === 201) {
      console.log("Post successfully created!");
    } else if (xhr.status === 400) {
      console.log("400 (Bad Request)");
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * PUT /persons
 *
 * @param {Object} postObj
 * @param {string} url
 */
function putPerson(postObj, url) {
  let xhr = new XMLHttpRequest();
  let personData = JSON.stringify(postObj);
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(personData);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Put successfully done!");
      initPerson();
    } else if (xhr.status === 400) {
      console.log("invalid");
    } else if (xhr.status === 404) {
      console.log("Person not found");
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * DELETE /persons/{id}
 *
 * @param url
 */
function delPerson(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Delete successful!");
      initPerson();
    } else if (xhr.status === 404) {
      alert("person not found");
      initPerson();
    }
  };
}

//--------------------------------------------------------------------------------
/**
 * GET /persons
 *
 * @return {Array.<Objects>} persons
 */
export async function getPersons() {
  return sendHTTPRequest("GET", "http://localhost:8080/v1/persons");
}

//--------------------------------------------------------------------------------
/**
 * GET /persons/id
 * @param url
 * @param id
 * @return {<Objects>} personObject
 */
async function getPersonById(url) {
  return sendHTTPRequest("GET", "http://localhost:8080/v1/persons/" + url);
}

//################################################################################
//form section
/**
 * get input form as an object
 *
 * @return {personData}
 */
function getInputPerson() {
  let personData = {};
  personData["personLastName"] = document.getElementById("personLastName").value;
  personData["personFirstName"] = document.getElementById("personFirstName").value;
  personData["personPersonalNumber"] = document.getElementById("personPersonalNumber").value;
  personData["personEmail"] = document.getElementById("personEmail").value;
  return personData;
}

//################################################################################
/**
 * input validation
 *
 * @return {boolean} ret
 */

async function inputValidationPerson() {
  let ret = true;
  let personList = (await getPersons()) || [];
  let letters = /^[a-zA-Z]*$/;

  //Personal Nummer Validieren
  let personalNumber = getInputPerson().personPersonalNumber;
  let personEmail = getInputPerson().personEmail.replace(/ +/g, "");
  let l_name = getInputPerson().personLastName.replace(/ +/g, "");
  let f_name = getInputPerson().personFirstName.replace(/ +/g, "");
  const found_personal_number = personList.find(
    (element) => element.personPersonalNumber == getInputPerson().personPersonalNumber
  );
  const found_personEmail = personList.find(
    (element) => element.personEmail == getInputPerson().personEmail
  );
  let is_personEmail = personEmail.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
  if (found_personal_number) {
    let x = document.getElementById("personPersonalNumber").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("personPersonalNumber").className = x + " is-invalid";
    document.getElementById("personPersonalNumberIsInValid").innerText =
      "die Eingabe soll eindeutig sein!";
    ret = false;
  } else if (personalNumber == "" || personalNumber < 1) {
    let x = document.getElementById("personPersonalNumber").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("personPersonalNumber").className = x + " is-invalid";
    document.getElementById("personPersonalNumberIsInValid").innerText =
      "es soll eine Eingabe geben!";
    ret = false;
  } else {
    let y = document.getElementById("personPersonalNumber").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("personPersonalNumber").className = y + " is-valid";
  }
  // E-Mail validieren
  if (is_personEmail) {
    let y = document.getElementById("personEmail").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("personEmail").className = y + " is-valid";
    if (found_personEmail) {
      let x = document.getElementById("personEmail").className;
      x = x.replace("is-invalid", "");
      x = x.replace("is-valid", "");
      x = x.trim();
      document.getElementById("personEmail").className = x + " is-invalid";
      document.getElementById("personEmailIsInValid").innerText =
        "die Eingabe soll eindeutig sein!";
      ret = false;
    } else if (personEmail == "") {
      let x = document.getElementById("personEmail").className;
      x = x.replace("is-invalid", "");
      x = x.replace("is-valid", "");
      x = x.trim();
      document.getElementById("personEmail").className = x + " is-invalid";
      document.getElementById("personEmailIsInValid").innerText =
        "es soll eine Eingabe geben!";
      ret = false;
    } else {
      let y = document.getElementById("personEmail").className;
      y = y.replace("is-invalid", "");
      y = y.replace("is-valid", "");
      y = y.trim();
      document.getElementById("personEmail").className = y + " is-valid";
    }
  } else {
    let x = document.getElementById("personEmail").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("personEmail").className = x + " is-invalid";
    document.getElementById("personEmailIsInValid").innerText =
      "die Eingabe ist kein E-Mail!";
    ret = false;
  }
  //Name validieren
  if (l_name == "" || !letters.test(l_name)) {
    let x = document.getElementById("personLastName").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("personLastName").className = x + " is-invalid";
    document.getElementById("personLastNameIsInValid").innerText =
      "es soll eine Eingabe geben!";
    ret = false;
  } else {
    let y = document.getElementById("personLastName").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("personLastName").className = y + " is-valid";
  }
  //Vorname validieren
  if (f_name == "" || !letters.test(f_name)) {
    let x = document.getElementById("personFirstName").className;
    x = x.replace("is-invalid", "");
    x = x.replace("is-valid", "");
    x = x.trim();
    document.getElementById("personFirstName").className = x + " is-invalid";
    document.getElementById("personFirstNameIsInValid").innerText =
      "Eingabe ist falsch!";
    ret = false;
  } else {
    let y = document.getElementById("personFirstName").className;
    y = y.replace("is-invalid", "");
    y = y.replace("is-valid", "");
    y = y.trim();
    document.getElementById("personFirstName").className = y + " is-valid";
  }

  return ret;
}

//--------------------------------------------------------------------------------
/**
 * inserts new record into table below form
 *
 * @param {Object} person
 */
function insertNewRecord(person) {
  let table = document
    .getElementById("personTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = person.personLastName;
  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = person.personFirstName;
  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = person.personPersonalNumber;
  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = person.personEmail;
  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = person.personId;
  let cell6 = newRow.insertCell(5);
  cell6.innerHTML =
    '<div class="text-center d-flex justify-content-between">' +
    '<button onclick="editPerson(' +
    "'" +
    person.personId +
    "'" +
    ')" class="btn btn-secondary fa fa-edit" data-toggle="tooltip" data-placement="left" title="bearbeiten"></button>&nbsp;' +
    '<div data-toggle="tooltip" data-placement="left"><button   class="btn btn-danger fa fa-trash" data-toggle="modal"  title="löschen" data-target="#deletePersonModel" onclick="setRowId(' +
    "'" +
    person.personId +
    "'" +
    ')"></button></div>' +
    "</div>";
}

//################################################################################
let globalPersonId = 0;

//--------------------------------------------------------------------------------
function setRowId(id) {
  globalPersonId = id;
}

//--------------------------------------------------------------------------------
function getRowId() {
  let gid = globalPersonId;
  return gid;
}

//--------------------------------------------------------------------------------
/**
 * clears Person table
 *
 */
function clearPersonTable() {
  const personTable = document.getElementById("personTableBody");
  personTable.innerHTML = "";
}

//--------------------------------------------------------------------------------
/**
 * delete Person from form and from database
 *
 * @param {srting} personId
 */
async function deletePerson(personId) {
  delPerson("http://localhost:8080/v1/persons/" + personId);

  let persons = await getPersonById(personId);

  let x = personDelete.className;
  x = x.replace("d-block", "");
  x = x.replace("d-none", "");
  x = x.trim();
  personDelete.className = x + " d-block";
  personDeletedName.innerText = persons.personFirstName + " " + persons.personLastName;
  initPerson();
  setTimeout(function () {
    // Closing the alert
    $("#personDelete").alert("close");
  }, 4000);
}

//################################################################################
/**
 *
 * initiate Person page
 */

async function initPerson() {
  let persons = await getPersons();
  console.log("GET: person: ", persons);

  clearPersonTable();

  if (!persons || persons.length == 0) {
    let x = personTableIsEmpty.className;
    x = x.replace("d-block", "");
    x = x.replace("d-none", "");
    x = x.trim();
    personTableIsEmpty.className = x + " d-block";
    console.log("table is empty");
  }
  // sonst: neue Reihe zufügen für jeden Eintrag
  else {
    let x = personTableIsEmpty.className;
    x = x.replace("d-block", "");
    x = x.replace("d-none", "");
    x = x.trim();
    personTableIsEmpty.className = x + " d-none";
    let sortedPersonList = persons.sort(function (a, b) {
      if (a.personLastName < b.personLastName) {
        return -1;
      }
      if (a.personLastName > b.personLastName) {
        return 1;
      }
      return 0;
    });
    //insertNewRecord(persons);
    for (let i = 0; i < sortedPersonList.length; i++) {
      insertNewRecord(sortedPersonList[i]);
    }
  }

  console.log("function initPerson");
}

//################################################################################
/**
 * saving Person Object from form
 *
 */
function savePerson() {
  if (inputValidationPerson()) {
    postPerson(getInputPerson(), "http://localhost:8080/v1/persons/");

    let personLastName = document.getElementById("personLastName").value.trim();
    let personFirstName = document.getElementById("personFirstName").value.trim();
    let personPersonalNumber = document.getElementById("personPersonalNumber").value.trim();
    let personEmail = document.getElementById("personEmail").value.trim();
    let personId = document.getElementById("personId").value;

    //capitalize names
    personLastName = capitalizeFirstLetter(personLastName.replace(/ +/g, ""));
    personFirstName = capitalizeFirstLetter(personFirstName.replace(/ +/g, ""));

    //function für personEmail Eingabe.. personEmail muss eindeutig

    //storing as an object
    let personItem = {
      personLastName: personLastName,
      personFirstName: personFirstName,
      personPersonalNumber: personPersonalNumber,
      personEmail: personEmail,
    };

    initPerson();

    hidePerson();

    //personIsSaved alert!!
  } else {
    console.log(
      "savePerson is not working because query is not validated (inputValidationPerson"
    );
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
  let persons = await getPersonById(personId);
  document.getElementById("updatePersonBtn").className = "btn btn-success";
  document.getElementById("savePersonBtn").className = "d-none";

  document.getElementById("personLastName").value = persons.personLastName;
  document.getElementById("personFirstName").value = persons.personFirstName;
  document.getElementById("personPersonalNumber").value = persons.personPersonalNumber;
  document.getElementById("personEmail").value = persons.personEmail;
  document.getElementById("personId").value = persons.personId;
  document.getElementById("personRevision").value = persons.personRevision;
}

//--------------------------------------------------------------------------------
/**
 * show Person form
 *
 */
function showPerson() {
  let showPerson = document.getElementById("showInventoryForm").className;
  document.getElementById("updatePersonBtn").className = "d-none";
  document.getElementById("savePersonBtn").className = "btn btn-primary";
  if (showPerson == "d-none") {
    document.getElementById("showInventoryForm").className = "d-block";
    document.getElementById("newPersonBtn").className = "d-none";
    console.log("dblock");
  } else {
    console.log("showPerson is not working!!");
  }
}

//--------------------------------------------------------------------------------
/**
 * hides Person in form
 *
 */
function hidePerson() {
  refreshPerson();
  let hPerson = document.getElementById("showInventoryForm").className;
  if (hPerson == "d-block") {
    document.getElementById("showInventoryForm").className = "d-none";
    document.getElementById("newPersonBtn").className =
      "form-row justify-content-center";
  } else {
    console.log("hidePerson is not activated!!");
  }
}

//--------------------------------------------------------------------------------
/**
 * updates Person in form
 *
 */
async function updatePerson() {
  let persons = await getPersons();
  let personLastName =    document.getElementById("personLastName").value.trim();
  let personFirstName =   document.getElementById("personFirstName").value.trim();
  let personPersonalNumber =  document.getElementById("personPersonalNumber").value.trim();
  let personEmail =       document.getElementById("personEmail").value.trim();
  let personId =    document.getElementById("personId").value;
  let personRevision =    document.getElementById("personRevision").value;

  let personItem = {
    personLastName:   personLastName,
    personFirstName:  personFirstName,
    personPersonalNumber: personPersonalNumber,
    personEmail:      personEmail,
    personId:        personId,
    personRevision:       personRevision,
  };

  if (personItem.personRevision !== null) {
    personRevision: personRevision;
  } else {
    console.log("no personRevision in Person");
  }

  let url = "http://localhost:8080/v1/persons/" + personId;

  putPerson(personItem, url);

  //initPerson()??
}

//--------------------------------------------------------------------------------
/**
 * refreshes Person page
 *
 */
function refreshPerson() {
  document.getElementById("personLastName").value = "";
  document.getElementById("personFirstName").value = "";
  document.getElementById("personPersonalNumber").value = "";
  document.getElementById("personEmail").value = "";
  document.getElementById("personId").value = "";
  document.getElementById("personRevision").value = "";

  document.getElementById("personLastName").className = "form-control";
  document.getElementById("personFirstName").className = "form-control";
  document.getElementById("personPersonalNumber").className = "form-control";
  document.getElementById("personEmail").className = "form-control";
}

//--------------------------------------------------------------------------------
/**
 * check for any failures with string taken from input in form
 *
 */
function personInputTranslation(input) {}

//--------------------------------------------------------------------------------
/**
 * capitalize first and last name in Person form
 *
 */
function capitalizeFirstLetter(string) {
  let words = string.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }
  return (string = words.join(" "));
}
