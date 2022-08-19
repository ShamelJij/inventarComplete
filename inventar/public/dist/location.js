/**
 * location FRONTEND
 */
//################################################################################
/**
 * Global section
 */
const locationTableIsEmpty = document.getElementById("locationTableIsEmpty");
const locationDelete = document.getElementById('locationDelete');
const locationDeletedName = document.getElementById('locationDeletedName')

//################################################################################
/**
 * Custom Functions
 */
//--------------------------------------------------------------------------------

// to be added

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
 * POST /locations
 *
 * @param {Object} postObj
 * @param {string} url
 */
function postLocation(postObj,url) {
    let xhr = new XMLHttpRequest();
    let locationData = JSON.stringify(postObj)
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(locationData);

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
 * PUT /locations
 *
 * @param {Object} postObj
 * @param {string} url
 */
function putLocation(postObj,url) {
    let xhr = new XMLHttpRequest();
    let locationData = JSON.stringify(postObj)
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(locationData);

    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log("Put successfully done!");
            initLocation();
        } else if (xhr.status === 400){
            console.log('invalid');
        } else if (xhr.status === 404){
            console.log('Location not found');
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * DELETE /locations/{id}
 *
 * @param url
 */
function delLocation(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();

    xhr.onload = function () {
        if(xhr.status === 200) {
            console.log("Delete successful!");
            initLocation();

        } else if (xhr.status === 404){
            alert('Location not found');
            initLocation();
        }
    }

}

//--------------------------------------------------------------------------------
/**
 * GET /locations
 *
 * @return {Array.<Objects>} locations
 */
async function getLocations() {
    return sendHTTPRequest('GET', 'http://localhost:8080/v1/locations');
}

//--------------------------------------------------------------------------------
/**
 * GET /locations/id
 * @param url
 * @param id
 * @return {<Objects>} locationObject
 */
async function getLocationById(url) {
   return sendHTTPRequest('GET', 'http://localhost:8080/v1/locations/' + url);
}

//################################################################################
//form section
/**
 * get input form as an object
 *
 * @return {locationData}
 */
function getInputLocation(){
    let locationData = {};
    locationData ["locationBusinessName"] = document.getElementById("locationBusinessName").value;
    locationData ["locationStreetName"] = document.getElementById("locationStreetName").value;
    locationData ["locationHouseNumber"] = document.getElementById("locationHouseNumber").value;
    locationData ["locationZipcode"] = document.getElementById("locationZipcode").value;
    locationData ["locationAreaName"] = document.getElementById("locationAreaName").value;
    locationData ["locationFloorNumber"] = document.getElementById("locationFloorNumber").value;
    locationData ["locationRoomNumber"] = document.getElementById("locationRoomNumber").value;
    return locationData;
}



//################################################################################
/**
 * input validation
 *
 * @return {boolean} ret
 */
async function inputValidationLocation() {
    let ret = true;
    let locationList = await getLocations() || [];
    let letters = /^[a-zA-Z]*$/;

    let locationBusinessName = getInputLocation().locationBusinessName;
    let locationStreetName = getInputLocation().locationStreetName;
    let locationHouseNumber = getInputLocation().locationHouseNumber;
    let locationZipcode = getInputLocation().locationZipcode;
    let locationAreaName= getInputLocation().locationAreaName;
    let locationFloorNumber = getInputLocation().locationFloorNumber;
    let locationRoomNumber = getInputLocation().locationRoomNumber;

    if (locationHouseNumber == '' || locationHouseNumber < 1){
        let x = document.getElementById("locationHouseNumber").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationHouseNumber").className = x + " is-invalid";
        document.getElementById("houseNumberIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("locationHouseNumber").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationHouseNumber").className = y + " is-valid";
    }
    //Ort validieren
    if (locationAreaName== '' || !letters.test(locationAreaName)){
        let x = document.getElementById("locationAreaName").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationAreaName").className = x + " is-invalid";
        document.getElementById("locationNameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("locationAreaName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationAreaName").className = y + " is-valid";
    }
    //strasse validieren
    if (locationStreetName == '' || !letters.test(locationStreetName)){
        let x = document.getElementById("locationStreetName").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationStreetName").className = x + " is-invalid";
        document.getElementById("locationStreetIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("locationStreetName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationStreetName").className = y + " is-valid";
    }

    return ret;
}

//--------------------------------------------------------------------------------
/**
 * inserts new record into table below form
 *
 * @param {Object} location
 */
function insertNewRecordLocation(locationList){

    let table = document.getElementById("idLocationList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = locationList.locationBusinessName;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = locationList.locationStreetName;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = locationList.locationHouseNumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = locationList.locationZipcode;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = locationList.locationAreaName;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = locationList.locationFloorNumber;
    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = locationList.locationRoomNumber;
    let cell8 = newRow.insertCell(7);
    cell8.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
        "<button onClick=\"editLocation(" + "\'" + locationList._id + "\'" + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deleteLocationModel\" onClick=\"setRowID(" + "\'" + locationList._id + "\'" + ")\"></button></div>" +
        "</div>";
}

//################################################################################
let globalLocationId = 0;
function setRowID(id){
    globalLocationId = id
}

//--------------------------------------------------------------------------------
function getRowID(){
    let gid = globalLocationId;
    return gid
}

//--------------------------------------------------------------------------------
/**
 * clears Location table
 *
 */
function clearLocationTable() {
    const locationTable = document.getElementById("locationTableBody");
    locationTable.innerHTML = '';
}

//--------------------------------------------------------------------------------
/**
 * delete Location from form and from database
 *
 * @param {srting} locationId
 */
async function deleteLocation(locationId) {

    delLocation('http://localhost:8080/v1/locations/' + locationId);

    let locations = await getLocations();
    for(let i = 0; i < locations.length; i++) {
        if (locationId == locations[i]._id) {
            let x = locationDelete.className
            x = x.replace('d-block','');
            x = x.replace('d-none','');
            x = x.trim();
            locationDelete.className = x + ' d-block';
            locationDeletedName.innerText = locations[i].locationBusinessName + ' ' + locations[i].locationAreaName;
            initLocation();
            setTimeout(function () {

                // Closing the alert
                $('#locationDelete').alert('close');
            }, 4000);
        } else {
            console.log('this location is not listed at all');
        }
    }

}

//################################################################################
/**
 *
 * initiate Location page
 */
async function initLocation(){
    //localstorage auslesen
    let locationList = await getLocations();

    // note(text):flag.. or tooltip wird and hidden div mit hinweiß
    //error handling
    clearLocationTable();
    if (!locationList || locationList.length == 0){;
        let x = locationTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        locationTableIsEmpty.className = x + ' d-block' ;
        console.log('location table is empty');

    }
    // sonst: neue Reihe zufügen für jeden Eintrag
    else {
        let x = locationTableIsEmpty.className
        x = x.replace('d-block','');
        x = x.replace('d-none','');
        x = x.trim();
        locationTableIsEmpty.className = x + ' d-none' ;

        //insertNewRecord(locationList);
        for (let i=0;i<locationList.length;i++) {
            insertNewRecordLocation(locationList[i]);
        }
    }
    // alert: consol.log function-validation.
    //
    console.log("function initLocation")
}

//################################################################################
/**
 * saving Location Object from form
 *
 */
function saveLocation(){
    if (inputValidationLocation()) {

        postLocation(getInputLocation(),'http://localhost:8080/v1/locations/');

        let locationBusinessName = document.getElementById("locationBusinessName").value.trim();
        let locationStreetName = document.getElementById("locationStreetName").value.trim();
        let locationHouseNumber = document.getElementById("locationHouseNumber").value.trim();
        let locationZipcode = document.getElementById("locationZipcode").value.trim();
        let locationAreaName= document.getElementById("locationAreaName").value.trim();
        let locationFloorNumber = document.getElementById("locationFloorNumber").value.trim();
        let locationRoomNumber = document.getElementById("locationRoomNumber").value.trim();
        let locationId = document.getElementById("locationId").value;

        //storing as an object
        let locationItem = {
            locationBusinessName: locationBusinessName,
            locationStreetName: locationStreetName,
            locationHouseNumber: locationHouseNumber,
            //locationZipcode muss ein Number sein
            locationZipcode: locationZipcode,
            locationAreaName: locationAreaName,
            locationFloorNumber: locationFloorNumber,
            locationRoomNumber: locationRoomNumber
        };

        initLocation();

        hideLocation();

        //locationIsSaved alert!!
    }else {
        console.log('saveLocation in not starting because valid is not valid');
    }

}

//--------------------------------------------------------------------------------
/**
 * edit Location in form
 *
 * @param {string} locationId
 */
async function editLocation(locationId) {
    showLocation();
    let location = await getLocationById(locationId);
    document.getElementById('lUpdateBtn').className = 'btn btn-success';
    document.getElementById('lSaveBtn').className = 'd-none';

            console.log('editLocation', location);

            document.getElementById("locationBusinessName").value = location.locationBusinessName;
            document.getElementById("locationStreetName").value = location.locationStreetName;
            document.getElementById("locationHouseNumber").value = location.locationHouseNumber;
            document.getElementById("locationZipcode").value = location.locationZipcode;
            document.getElementById("locationAreaName").value = location.locationAreaName;
            document.getElementById("locationFloorNumber").value = location.locationFloorNumber;
            document.getElementById("locationRoomNumber").value = location.locationRoomNumber;
            document.getElementById("locationId").value = location._id;
            document.getElementById("locationRev").value =location._rev;
}

//--------------------------------------------------------------------------------
/**
 * show Location form
 *
 */
function showLocation() {
    let sLocation = document.getElementById('sLocation').className;
    document.getElementById('lUpdateBtn').className = 'd-none';
    document.getElementById('lSaveBtn').className = 'btn btn-primary';
    if (sLocation == 'd-none') {
        document.getElementById('sLocation').className = 'd-block';
        document.getElementById('newLocationBtn').className = 'd-none';
    } else {
        console.log('showLocation is not working!!');
    }

}

//--------------------------------------------------------------------------------
/**
 * hides Location in form
 *
 */
function hideLocation(){
    refreshLocation();
    let hLocation = document.getElementById('sLocation').className;
    if(hLocation == 'd-block'){
        document.getElementById('sLocation').className = 'd-none';
        document.getElementById('newLocationBtn').className = 'form-row justify-content-center';
    } else {
        console.log('hideLocation is not working!!');
    }
}

//--------------------------------------------------------------------------------
/**
 * updates Location in form
 *
 */
async function updateLocation() {

    //let locationList = await getLocations();

    let locationBusinessName = document.getElementById("locationBusinessName").value.trim();
    let locationStreetName = document.getElementById("locationStreetName").value.trim();
    let locationHouseNumber = document.getElementById("locationHouseNumber").value.trim();
    let locationZipcode = document.getElementById("locationZipcode").value.trim();
    let locationAreaName= document.getElementById("locationAreaName").value.trim();
    let locationFloorNumber = document.getElementById("locationFloorNumber").value.trim();
    let locationRoomNumber = document.getElementById("locationRoomNumber").value.trim();
    let locationId = document.getElementById("locationId").value;
    let revision = document.getElementById("locationRev").value;

    let locationItem = {
        locationBusinessName: locationBusinessName,
        locationStreetName: locationStreetName,
        locationHouseNumber: locationHouseNumber,
        locationZipcode: locationZipcode,
        locationAreaName: locationAreaName,
        locationFloorNumber: locationFloorNumber,
        locationRoomNumber: locationRoomNumber,
        _id: locationId,
        _rev: revision
    };

    if (locationItem._rev !== null){
        _rev: revision;
    } else {
        console.log('no revision in Location');
    }

    let url = 'http://localhost:8080/v1/locations/' + locationId;

    putLocation(locationItem, url);

    //initLocation()??
}

//--------------------------------------------------------------------------------
/**
 * refreshes Location page
 *
 */
function refreshLocation() {
    //aktuelle werte auf eingabefelder löchen

    document.getElementById("locationBusinessName").value = '';
    document.getElementById("locationStreetName").value = '';
    document.getElementById("locationHouseNumber").value = '';
    document.getElementById("locationZipcode").value = '';
    document.getElementById("locationAreaName").value = '';
    document.getElementById("locationFloorNumber").value = '';
    document.getElementById("locationRoomNumber").value = '';
    document.getElementById("locationId").value = '';
    document.getElementById("locationRev").value = '';

    document.getElementById("locationBusinessName").className = 'form-control';
    document.getElementById("locationStreetName").className = 'form-control';
    document.getElementById("locationHouseNumber").className = 'form-control';
    document.getElementById("locationZipcode").className = 'form-control';
    document.getElementById("locationAreaName").className = 'form-control';
    document.getElementById("locationFloorNumber").className = 'form-control';
    document.getElementById("locationRoomNumber").className = 'form-control';

}