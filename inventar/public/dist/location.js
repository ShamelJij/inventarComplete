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
function postData(postObj,url) {
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
function delData(url) {
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
    locationData ["locationlabel"] = document.getElementById("locationlabel").value;
    locationData ["locationstreet"] = document.getElementById("locationstreet").value;
    locationData ["housenumber"] = document.getElementById("housenumber").value;
    locationData ["zipcode"] = document.getElementById("zipcode").value;
    locationData ["locationname"] = document.getElementById("locationname").value;
    locationData ["floornumber"] = document.getElementById("floornumber").value;
    locationData ["roomnumber"] = document.getElementById("roomnumber").value;
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

    let locationlabel = getInputLocation().locationlabel;
    let locationstreet = getInputLocation().locationstreet;
    let housenumber = getInputLocation().housenumber;
    let zipcode = getInputLocation().zipcode;
    let locationname= getInputLocation().locationname;
    let floornumber = getInputLocation().floornumber;
    let roomnumber = getInputLocation().roomnumber;

    if (housenumber == '' || housenumber < 1){
        let x = document.getElementById("housenumber").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("housenumber").className = x + " is-invalid";
        document.getElementById("houseNumberIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("housenumber").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("housenumber").className = y + " is-valid";
    }
    //Ort validieren
    if (locationname== '' || !letters.test(locationname)){
        let x = document.getElementById("locationname").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationname").className = x + " is-invalid";
        document.getElementById("locationNameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("locationname").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationname").className = y + " is-valid";
    }
    //strasse validieren
    if (locationstreet == '' || !letters.test(locationstreet)){
        let x = document.getElementById("locationstreet").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationstreet").className = x + " is-invalid";
        document.getElementById("locationStreetIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("locationstreet").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationstreet").className = y + " is-valid";
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
    cell1.innerHTML = locationList.locationlabel;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = locationList.locationstreet;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = locationList.housenumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = locationList.zipcode;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = locationList.locationname;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = locationList.floornumber;
    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = locationList.roomnumber;
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

    delData('http://localhost:8080/v1/locations/' + locationId);

    let locations = await getLocations();
    for(let i = 0; i < locations.length; i++) {
        if (locationId == locations[i]._id) {
            let x = locationDelete.className
            x = x.replace('d-block','');
            x = x.replace('d-none','');
            x = x.trim();
            locationDelete.className = x + ' d-block';
            locationDeletedName.innerText = locations[i].locationlabel + ' ' + locations[i].locationname;
            initLocation();
            setTimeout(function () {

                // Closing the alert
                $('#LocationDelete').alert('close');
            }, 10000);
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

        postData(getInputLocation(),'http://localhost:8080/v1/locations/');

        let locationlabel = document.getElementById("locationlabel").value.trim();
        let locationstreet = document.getElementById("locationstreet").value.trim();
        let housenumber = document.getElementById("housenumber").value.trim();
        let zipcode = document.getElementById("zipcode").value.trim();
        let locationname= document.getElementById("locationname").value.trim();
        let floornumber = document.getElementById("floornumber").value.trim();
        let roomnumber = document.getElementById("roomnumber").value.trim();
        let locationId = document.getElementById("locationId").value;

        //storing as an object
        let locationItem = {
            locationlabel: locationlabel,
            locationstreet: locationstreet,
            housenumber: housenumber,
            //zipcode muss ein Number sein
            zipcode: zipcode,
            locationname: locationname,
            floornumber: floornumber,
            roomnumber: roomnumber
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

            document.getElementById("locationlabel").value = location.locationlabel;
            document.getElementById("locationstreet").value = location.locationstreet;
            document.getElementById("housenumber").value = location.housenumber;
            document.getElementById("zipcode").value = location.zipcode;
            document.getElementById("locationname").value = location.locationname;
            document.getElementById("floornumber").value = location.floornumber;
            document.getElementById("roomnumber").value = location.roomnumber;
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
        document.getElementById('nLocationBtn').className = 'd-none';
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
        document.getElementById('nLocationBtn').className = 'form-row justify-content-center';
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

    let locationlabel = document.getElementById("locationlabel").value.trim();
    let locationstreet = document.getElementById("locationstreet").value.trim();
    let housenumber = document.getElementById("housenumber").value.trim();
    let zipcode = document.getElementById("zipcode").value.trim();
    let locationname= document.getElementById("locationname").value.trim();
    let floornumber = document.getElementById("floornumber").value.trim();
    let roomnumber = document.getElementById("roomnumber").value.trim();
    let locationId = document.getElementById("locationId").value;
    let revision = document.getElementById("locationRev").value;

    let locationItem = {
        locationlabel: locationlabel,
        locationstreet: locationstreet,
        housenumber: housenumber,
        zipcode: zipcode,
        locationname: locationname,
        floornumber: floornumber,
        roomnumber: roomnumber,
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

    document.getElementById("locationlabel").value = '';
    document.getElementById("locationstreet").value = '';
    document.getElementById("housenumber").value = '';
    document.getElementById("zipcode").value = '';
    document.getElementById("locationname").value = '';
    document.getElementById("floornumber").value = '';
    document.getElementById("roomnumber").value = '';
    document.getElementById("locationId").value = '';

    document.getElementById("locationlabel").className = 'form-control';
    document.getElementById("locationstreet").className = 'form-control';
    document.getElementById("housenumber").className = 'form-control';
    document.getElementById("zipcode").className = 'form-control';
    document.getElementById("locationname").className = 'form-control';
    document.getElementById("floornumber").className = 'form-control';
    document.getElementById("roomnumber").className = 'form-control';

}