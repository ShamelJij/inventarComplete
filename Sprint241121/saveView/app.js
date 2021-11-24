
//single page switcher
window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');

    for (let i = 0; i < tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
            document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');

            SwitchPage(page_id);
        });
    }
}

function SwitchPage (page_id) {
    console.log(page_id);

    const current_page = document.querySelector('.pages .page.is-active');
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
}

//the save/view test
function save(){

    var new_data = document.getElementById('input').value;
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data','[]');

    }
    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));
}
    function view(){
        if (localStorage.getItem('data')!=null){
            document.getElementById('output').innerHTML = JSON.parse(localStorage.getItem('data'));
        }
}

//store function added to save button
    function store(){
    var inputItemName= document.getElementById("itemName");
    localStorage.setItem("itemName", inputItemName.value);
        var new_data = document.getElementById('itemName').value;
        if(localStorage.getItem('dataNew') == null){
            localStorage.setItem('dataNew','[]');

        }
        var old_data = JSON.parse(localStorage.getItem('dataNew'));
        old_data.push(new_data);
        localStorage.setItem('dataNew', JSON.stringify(old_data));
    }

//json array for the table
var personArray = [
    {'firstName':'Michael', 'sureName':'david', 'personalNumber':'223345', 'email':'mike@gmail.com'},
    {'firstName':'Mila', 'sureName':'Schmidt', 'personalNumber':'443355', 'email':'mila2231@gmail.com'},
    {'firstName':'Paul', 'sureName':'Salt', 'personalNumber':'998765', 'email':'paul.richard@gmail.com'},
    {'firstName':'Dennis', 'sureName':'Miller', 'personalNumber':'122345', 'email':'dennis@gmail.com'},
    {'firstName':'Tim', 'sureName':'Müller', 'personalNumber':'876543', 'email':'timmy@gmail.com'},
    {'firstName':'Erik', 'sureName':'Schmidt', 'personalNumber':'435532', 'email':'eriksson@gmail.com'},
]
var addressArray = [
    {'name':'Michael', 'street':'Musterstraße', 'houseNumber':'4', 'zipCode':'55130', 'city':'Mainz', 'level':'2', 'roomNumber':'112'},
    {'name':'Mila', 'street':'Haputstraße', 'houseNumber':'22', 'zipCode':'55120', 'city':'München', 'level':'4', 'roomNumber':'13'},
    {'name':'Paul', 'street':'Maxstraße', 'houseNumber':'13', 'zipCode':'56110', 'city':'Berlin', 'level':'10', 'roomNumber':'4'},
    {'name':'Dennis', 'street':'Winterstraße', 'houseNumber':'8', 'zipCode':'66130', 'city':'Koblenz', 'level':'1', 'roomNumber':'43'},
    {'name':'Tim', 'street':'Suderstraße', 'houseNumber':'34', 'zipCode':'44180', 'city':'Speyer', 'level':'1', 'roomNumber':'15'},
    {'name':'Erik', 'street':'Am Wald', 'houseNumber':'7', 'zipCode':'92130', 'city':'Frankfurt', 'level':'4', 'roomNumber':'6'},
]
//building the table functions (call)
buildTablePerson(personArray);
buildTableAddress(addressArray);

//building person table

function buildTablePerson(data){
    var table = document.getElementById('personalTable')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].firstName}</td>
                        <td>${data[i].sureName}</td>
                        <td>${data[i].personalNumber}</td>
                        <td>${data[i].email}</td>
                  </tr>`
        table.innerHTML += row


    }
}
//building the address table
function buildTableAddress(data){
    var table = document.getElementById('addressTable')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].street}</td>
                        <td>${data[i].houseNumber}</td>
                        <td>${data[i].zipCode}</td>
                        <td>${data[i].city}</td>
                        <td>${data[i].level}</td>
                        <td>${data[i].roomNumber}</td>
                  </tr>`
        table.innerHTML += row


    }
}

//the setting page using variables in css (still not fully functional!)
var fontColor;
var defaultColor = "white";
window.addEventListener("load", changeFont, false);
function changeFont(){
    fontColor = document.querySelector("#fontColor");
    fontColor.value = defaultColor;
    fontColor.addEventListener("input",updateFirst,false);
    fontColor.addEventListener("change", updateAll, false);
    fontColor.select();
    }
    function updateFirst(event){
    var h1 = document.querySelector("h1");
    if (h1) {
        h1.style.color = event.target.value;
    }
    }
    function updateAll(event){
    document.querySelectorAll("h1").forEach(function (h1){
        h1.style.color=event.target.value;
    })
    }
var darkColor;
var defaultColor = "#0f2b2e";
window.addEventListener("load", changeDarkColor, false);
function changeDarkColor(){
    darkColor = document.querySelector("#darkColor");
    darkColor.value = defaultColor;
    darkColor.addEventListener("change", updateAll, false);
    darkColor.select();
    var b = document.querySelector('body');
    b.style.setProperty('--darkcolor', darkColor)
}
function updateAllDarkColor(event){
    document.querySelectorAll("").forEach(function (h1){
        h1.style.color=event.target.value;
    })
}
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    alert("The value of --fontcolor is: " + rs.getPropertyValue('--fontcolor'));
}

// Create a function for setting a variable value
function myFunction_set() {
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty('--fontcolor', 'red');
}

//storing form input as json
document
    .getElementById("einputForm")
    .addEventListener("submit", function (event){
        event.preventDefault();

        var eitemName = document.getElementById("eitemName").value.trim();
        var eitemType = document.getElementById("eitemType").value.trim();
        var eserialNumber = document.getElementById("eserialNumber").value.trim();
        var enettoPrice = document.getElementById("enettoPrice").value.trim();

        //error handling
        if (!eitemName || !eitemType || !eserialNumber || !enettoPrice){
            return;
        }

        //storing as an object
        var storeInfo = {
            eitemName: eitemName,
            eitemType: eitemType,
            eserialNumber: eserialNumber,
            enettoPrice: enettoPrice

        };

        console.log("E-Item Name:", eitemName);
        console.log("E-Item Type:", eitemType);
        console.log("E-Serial Number:", eserialNumber);
        console.log("E-Netto Price:", enettoPrice);

        localStorage.setItem("storeInfo", JSON.stringify(storeInfo));
        console.log("E-Store Info Object:", storeInfo)
        //making a table from local storage
        var estoreFormStoreArray = [storeInfo]
        buildTableStoreForm(estoreFormStoreArray);
        function buildTableStoreForm(data){
            var table = document.getElementById('formStoreTable')

            for (var i = 0; i < data.length; i++){
                var row = `<tr>
                        <td>${data[i].eitemName}</td>
                        <td>${data[i].eitemType}</td>
                        <td>${data[i].eserialNumber}</td>
                        <td>${data[i].enettoPrice}</td>
                        </tr>`
                table.innerHTML += row


            }
        }
    });




