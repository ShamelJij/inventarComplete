/*import {Person} from './person.js';
import {Inventory} from '../inventory.js';
import {Location} from '../location.js';*/

/*//--------------------------------------------------------------------------------
/!**
 * inserts new option into select below choose person
 *
 *!/
async function insertPersons(){

    let selectPerson = document.getElementById('inventorySelectPerson');
    let options = await getPersons();
    for(let i = 0; i < options.length; i++ ){
        let opt = options[i];
        let el = document.createElement('option');
        el.innerHTML = "<div class=\"text-center\">" + opt.name + " " + opt.vorname + "<span>" + opt.email + " " + opt.personalno +  "</span></div>";
        selectPerson.appendChild(el);
    }
}*/


/*let ctx = document.getElementById("myChart");
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        legend: {
            display: false,
        }
    }
    });*/


