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
var myArray = [
    {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
    {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
    {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
    {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
    {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
    {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
]

buildTable(myArray);



function buildTable(data){
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].age}</td>
                        <td>${data[i].birthdate}</td>
                  </tr>`
        table.innerHTML += row


    }
}
//the setting page
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