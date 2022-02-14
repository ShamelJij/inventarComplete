import {Database} from './database.js';
// import {Document} from "./Document.js";

export class Person {

#_dbName;
#_id;
#_body;
#_db;

// ToDo: append JSDoc for alle functions
    /**
     *
     * @param id
     */
    constructor(id) {
        this.#_dbName = 'Person';
        this.#_db   = new Database(this.#_dbName);

        if (id) {
            this.#_id = id;
            this.#_body = this.#_db.get(id);
        } else {
            let schema = {
                "_id": null,
                "lastName": '',
                "firstName": '',
                "email": '',
                "personalID": ''
            };
            this.#_body = schema;
            this.#_id = null
        }

    }

    /**
     *
     * @param body
     */
    save(body) {
        let newBody = this.#schema(body);
        if(this.#_id){
            newBody._id = this.#_id;
        }
        this.#_body = this.#_db.save(this.#_id, newBody);
    }

    /**
     *
     * @param oldBodyId
     * @type {number}
     * @param newBody
     */
    update(id, newBody){
        this.#_id = id;
        this.save(newBody);
        console.log(id, newBody);
    }

    get(id){
        return this.#_db.get(id);
    }

    /**
     *@param body
     *@returns {Object} 
     */
    #schema(body){
        // ToDo: Complete code for alle attributes
        let newBody = {};
        if(body.lastName){
            newBody.lastName = body.lastName;
        } else {
            newBody.lastName = this.#_body.lastName;
        }
        if(body.firstName){
            newBody.firstName = body.firstName;

        } else {
            newBody.firstName = this.#_body.firstName;
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

    /**
     *
     */
    #validate() {
        // ToDo: Validate mandantory fields
    }

    /**
     *
     */
    #translate() {
        // ToDo: trim all values
    }

    /**
     *
     * @param id
     */
    delete(id){
        this.#_db.delete(id);
    }

    /**
     *
     * @returns {*}
     */
    document(){
        return this.#_body;
    }
}


/**
 *
 */
export class Persons {

    static getAll() {
        let p = new Database("Person");
        return p.getAll();
    }
}
/*
class CustomLogging {
    log(
        body = "" // defaults to empty string
    ) {
        console.log(
            `%c${body}`, // everything after the %c is styled
            `color: green; font-weight: bold; font-size: 8rem;border:red;border-style: solid;border-width: 15px;`
        );
    }
}
const custom = new CustomLogging;
custom.log('Hello there!');
let f = new Localdata('dienstag');
f.save(null,{ "name": "kim", "time": Date.now()});
console.log('persons here!!!');
const salad = ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑','🍭','🥧','🍩','🦐','🧟‍♀','🧟','🧟‍♂','🚲','🐳'];
custom.log(salad);
console.table(salad);
var arr = [5, 6, 13, 0, 1, 18, 23];
var sum = arr.reduce((a, b) => a + b);
var people = [["John", "Smith"], ["Jane", "Doe"], ["Emily", "Jones"],["Jane", "Doe"], ["Emily", "Jones"],["Jane", "Doe"], ["Emily", "Jones", "something"]]
console.table(people);
/!**
 *
 * @param a
 * @param b
 * @return {string}
 *!/
function justafunc(a,b){

    return `${a+b}`;
}
console.log(typeof (justafunc(5,6)));
//jsDoc will notify if you have no param in your function or if you have another type of variable in your function
localStorage.setItem('firstname', 'Moritz');
localStorage.setItem('lastname', 'Peter');
let firstname = localStorage.getItem('firstname');
let lastname = localStorage.getItem('lastname');
console.log(firstname); // Moritz
console.log(lastname); // Peterso
localStorage.setItem('username', 'Max Mustermann');
localStorage.setItem('shoppingCartItemIDs', JSON.stringify(
    ['id22345','id23446','id65464','id8888','id46646'])
);
let shop = JSON.parse(localStorage.getItem('shoppingCartItemIDs',));
shop.push(
    ['id22345','id23446','id65464','id55999','id46646']);
localStorage.setItem('shoppingCartItemIDs',JSON.stringify(shop));
let date = new Date(2021, 11 - 1, 6);
let year = date.getFullYear();
console.log(new Intl.DateTimeFormat('de',{day: '2-digit',month: '2-digit'}).format(date)+year);
console.log("This is the outer level");
console.group();
console.log("Level 2");
console.group();
console.log("Level 3");
console.warn("More of level 3");
console.groupEnd();
console.log("Back to level 2");
console.groupEnd();
console.log("Back to the outer level");*/
