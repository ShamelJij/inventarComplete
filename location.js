/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
       date: 1/13/2022 | time: 5:52 PM | name: Location | path: C:\deltastone\shamel-praktikum\Location.js
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
/*
Global Section
 */
const locationTableIsEmpty = document.getElementById("locationTableIsEmpty");
let saved_location = JSON.parse(localStorage.getItem('locationList'));
localStorage.setItem('locationList', JSON.stringify(saved_location));
//- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getInputLocation(){
    let locationData = {};
    locationData ["locationLabel"] = document.getElementById("locationLabel").value;
    locationData ["locationStreet"] = document.getElementById("locationStreet").value;
    locationData ["houseNumber"] = document.getElementById("houseNumber").value;
    locationData ["zipCode"] = document.getElementById("zipCode").value;
    locationData ["locationName"] = document.getElementById("locationName").value;
    locationData ["floorNumber"] = document.getElementById("floorNumber").value;
    locationData ["roomNumber"] = document.getElementById("roomNumber").value;
    return locationData;
}
//- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function inputValidationLocation() {
    let ret = true;
    let locationList = JSON.parse(localStorage.getItem('locationList')) || [];
    let letters = /^[a-zA-Z]*$/;

    let locationLabel = getInputLocation().locationLabel;
    let locationStreet = getInputLocation().locationStreet;
    let houseNumber = getInputLocation().houseNumber;
    let zipCode = getInputLocation().zipCode;
    let locationName = getInputLocation().locationName;
    let floorNumber = getInputLocation().floorNumber;
    let roomNumber = getInputLocation().roomNumber;

    if (houseNumber == '' || houseNumber < 1){
        let x = document.getElementById("houseNumber").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("houseNumber").className = x + " is-invalid";
        document.getElementById("houseNumberIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("houseNumber").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("houseNumber").className = y + " is-valid";
    }
    //Ort validieren
    if (locationName == '' || !letters.test(locationName)){
        let x = document.getElementById("locationName").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationName").className = x + " is-invalid";
        document.getElementById("locationNameIsInValid").innerText = "es soll eine Eingabe geben!";
        ret = false;
    } else {
        let y = document.getElementById("locationName").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationName").className = y + " is-valid";
    }
    //strasse validieren
    if (locationStreet == '' || !letters.test(locationStreet)){
        let x = document.getElementById("locationStreet").className;
        x = x.replace('is-invalid', '');
        x = x.replace('is-valid', '');
        x = x.trim();
        document.getElementById("locationStreet").className = x + " is-invalid";
        document.getElementById("locationStreetIsInValid").innerText = "Eingabe ist falsch!";
        ret = false;
    } else {
        let y = document.getElementById("locationStreet").className;
        y = y.replace('is-invalid', '');
        y = y.replace('is-valid', '');
        y = y.trim();
        document.getElementById("locationStreet").className = y + " is-valid";
    }

    return ret;
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                name: insertNewRecord | purpose: building a new row for every new query
 - - - - - - - - - - - - - - - - - - - - - - - - - -*** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//Insert data from location
function insertNewRecordLocation(locationList){

    let table = document.getElementById("idLocationList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = locationList.locationLabel;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = locationList.locationStreet;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = locationList.houseNumber;
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = locationList.zipCode;
    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = locationList.locationName;
    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = locationList.floorNumber;
    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = locationList.roomNumber;
    let cell8 = newRow.insertCell(7);
    cell8.innerHTML = "<div class=\"text-center d-flex justify-content-around\">" +
        "<button onClick=\"editLocation(" + locationList.locationItemID + ")\" class=\"btn btn-secondary fa fa-edit\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"bearbeiten\"></button>" +
        "<div data-toggle=\"tooltip\" data-placement=\"left\"><button   class=\"btn btn-danger fa fa-trash\" data-toggle=\"modal\"  title=\"löschen\" data-target=\"#deleteLocationModel\" onClick=\"setRowID(" + locationList.locationItemID + ")\"></button></div>" +
        "</div>";
}
//get row id
let globalLocationId = 0;
function setRowID(ID){
    globalLocationId = ID
}
function getRowID(){
    let gid = globalLocationId;
    return gid
}
function clearLocationTable() {
    const locationTable = document.getElementById("locationTableBody");
    locationTable.innerHTML = '';
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        name: initLocation | purpose: parse from localstorage then insert a new location to locationList
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function initLocation(){
    //localstorage auslesen
    let locationList = JSON.parse(localStorage.getItem('locationList'));
    hideLocation();
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
        let locationList = JSON.parse(localStorage.getItem('locationList'));
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
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            name: saveLocation | purpose: storing in localStorage and build a new row
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function saveLocation(){
    if (inputValidationLocation()) {



        let locationList = JSON.parse(localStorage.getItem('locationList'));
        let locationLabel = document.getElementById("locationLabel").value.trim();
        let locationStreet = document.getElementById("locationStreet").value.trim();
        let houseNumber = document.getElementById("houseNumber").value.trim();
        let zipCode = document.getElementById("zipCode").value.trim();
        let locationName = document.getElementById("locationName").value.trim();
        let floorNumber = document.getElementById("floorNumber").value.trim();
        let roomNumber = document.getElementById("roomNumber").value.trim();
        let locationID = document.getElementById("saveIDLocation").value;

        //storing as an object
        let locationItem = {
            locationLabel: locationLabel,
            locationStreet: locationStreet,
            houseNumber: houseNumber,
            zipCode: zipCode,
            locationName: locationName,
            floorNumber: floorNumber,
            roomNumber: roomNumber
        };
        let found_obj = locationList.find(element => element.locationItemID == locationID );
        let found_obj_index = locationList.indexOf(found_obj);

        if (locationID == '' || !found_obj){
            console.log('new location is saved');
            //locationCounter for itemID
            let locationItemID = localStorage.getItem('locationCounter');
            if (locationItemID === null) {
                locationItemID = 0;
            } else {
                locationItemID++;
            }
            localStorage.setItem("locationCounter", locationItemID);
            locationItem.locationItemID = locationItemID;
            // note(text):flag.. or tooltip wird and hidden div mit hinweiß
            //error handling
            if (!locationList || locationList.length == 0) {
                locationList = []; // [locationItem];
                locationList.push(locationItem);
            }
            // sonst: neue Reihe zufügen für jeden Eintrag
            else {
                console.log('building a new row location');
                //insertNewRecord(locationList);
                locationList.push(locationItem);
            }
        } else {
            if(found_obj){
                locationItem.locationItemID = locationID;
                locationList[found_obj_index] = locationItem;
            }
        }



        localStorage.setItem("locationList", JSON.stringify(locationList));
        //eingabe validierung
        //Localstorage auslesen
        //push auf die Liste und nicht neu erstellen
        //die Liste ist am besten sortiert (array) nach name
        // in localstorage speichern
        //Tsbelle aktualiesieren
        initLocation();
        hidePerson();
    }else {
        console.log('saveLocation in not starting because valid is not valid');
    }

}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                name: deleteLocation | purpose: delete location obj from localStorage and table
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function deleteLocation(locationID) {
    let locationList = JSON.parse(localStorage.getItem('locationList'));
    for(let i = 0; i < locationList.length; i++){
        if (locationID == locationList[i].locationItemID){
            locationList.splice(i,1);
            localStorage.setItem('locationList', JSON.stringify(locationList));
            break;
        }
    }
    initLocation();
}
/*- - - - - - - - - - - - - - - - - - - - - - - - - *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            name: editLocation | purpose: edit location obj from localStorage and table row
 - - - - - - - - - - - - - - - - - - - - - - - - -  *** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function editLocation(locationID) {
    showLocation();
    let locationList = JSON.parse(localStorage.getItem('locationList'));
    document.getElementById('lUpdateBtn').className = 'btn btn-success';
    document.getElementById('lSaveBtn').className = 'd-none';
    for(let i = 0; i < locationList.length; i++){
        if (locationID == locationList[i].locationItemID){
            //wenn dateien löchen wollen dann:
            //locationList.splice(i,1);
            console.log('editLocation', locationList[i]);

            document.getElementById("locationLabel").value = locationList[i].locationLabel;
            document.getElementById("locationStreet").value = locationList[i].locationStreet;
            document.getElementById("houseNumber").value = locationList[i].houseNumber;
            document.getElementById("zipCode").value = locationList[i].zipCode;
            document.getElementById("locationName").value = locationList[i].locationName;
            document.getElementById("floorNumber").value = locationList[i].floorNumber;
            document.getElementById("roomNumber").value = locationList[i].roomNumber;
            document.getElementById("saveIDLocation").value = locationList[i].locationItemID;
            break;
        }
    }
    //initLocation??
}
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
function updateLocation() {

    let locationList = JSON.parse(localStorage.getItem('locationList'));

    let locationLabel = document.getElementById("locationLabel").value.trim();
    let locationStreet = document.getElementById("locationStreet").value.trim();
    let houseNumber = document.getElementById("houseNumber").value.trim();
    let zipCode = document.getElementById("zipCode").value.trim();
    let locationName = document.getElementById("locationName").value.trim();
    let floorNumber = document.getElementById("floorNumber").value.trim();
    let roomNumber = document.getElementById("roomNumber").value.trim();
    let locationID = document.getElementById("saveIDLocation").value;

    let locationItem = {
        locationLabel: locationLabel,
        locationStreet: locationStreet,
        houseNumber: houseNumber,
        zipCode: zipCode,
        locationName: locationName,
        floorNumber: floorNumber,
        roomNumber: roomNumber
    };
    let found_obj = locationList.find(element => element.locationItemID == locationID );
    let found_obj_index = locationList.indexOf(found_obj);
    if(found_obj){
        locationItem.locationItemID = locationID;
        locationList[found_obj_index] = locationItem;
    }
    localStorage.setItem("locationList", JSON.stringify(locationList));
    initLocation();
    /*
    let saveID = document.getElementById('saveID').value;
    deleteLocation(saveID);
    saveLocation(saveID);*/
}
function refreshLocation() {
    //aktuelle werte auf eingabefelder löchen

    document.getElementById("locationLabel").value = '';
    document.getElementById("locationStreet").value = '';
    document.getElementById("houseNumber").value = '';
    document.getElementById("zipCode").value = '';
    document.getElementById("locationName").value = '';
    document.getElementById("floorNumber").value = '';
    document.getElementById("roomNumber").value = '';
    document.getElementById('saveIDLocation').value = '';

    document.getElementById("locationLabel").className = 'form-control';
    document.getElementById("locationStreet").className = 'form-control';
    document.getElementById("houseNumber").className = 'form-control';
    document.getElementById("zipCode").className = 'form-control';
    document.getElementById("locationName").className = 'form-control';
    document.getElementById("floorNumber").className = 'form-control';
    document.getElementById("roomNumber").className = 'form-control';

}