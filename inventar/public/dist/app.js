/*import {Person} from './person.js';
import {Inventory} from '../inventory.js';
import {Location} from '../location.js';*/

//--------------------------------------------------------------------------------
/**
 * inserts new option into select below choose person
 *
 */
async function insertPersons(){

    let selectPerson = document.getElementById('inventorySelectPerson');
    let options = await getPersons();
    for(let i = 0; i < options.length; i++ ){
        let opt = options[i];
        let el = document.createElement('option');
        el.innerHTML = "<div class=\"text-center\">" + opt.name + " " + opt.vorname + "<span>" + opt.email + " " + opt.personalno +  "</span></div>";
        selectPerson.appendChild(el);
    }
}



