import {Person, Personsop} from './persons.js';
import {Inventoryop} from '../inventory.js';
import {Locationop} from '../location.js';
import {Databaseop} from "./database.js";

console.log( '*** CRUD TEST OF PERSON ***' );

//--------------------------------------------------------------------------------
console.group( '--- Create Person---' );
console.log( 'create object' );
let p   = new Person();
console.log( 'content of person.' );
let doc = p.document();
console.log( doc );



console.log( 'set person values' );
doc.lastName  = "Dritt2312ermann";
doc.firstName = "maxmillian";
doc.email      = "anyMail@mail.cl";
doc.age = 33;


console.log( 'save person' );
p.save(doc);

console.log( 'content of saveed person' );
console.log(p.document());
console.groupEnd();
//--------------------------------------------------------------------------------

console.group( '--- Read Person---' );
// ToDo: add read
console.log(p.get(5));
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Update Person---' );
// ToDo: add update
let toUpdateObj = {};
toUpdateObj.lastName = "dasd";
toUpdateObj.firstName = "dddd";
toUpdateObj.email = "upda   @ffzzzgggf   .il";
toUpdateObj.personalID = 65444774;
toUpdateObj.xyz = 1;

p.update(70,toUpdateObj);
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Delete Person---' );
// ToDo: add delete
//p.delete(2);
console.groupEnd();


console.log( '*** LOGIC TEST OF PERSON ***' );
console.log('the id is: ', doc._id);
// ToDo: Was passiert bei "doc.age = 33"
//wird nicht genommen weil es ist kein Teil von NewBody in #schema
// ToDo: Was passiert wenn bei einem Update lastname nicht mitgelifert wird ?
//wird nicht validiert und dazu ein console.warn msg geben
// ToDo: Was passiert wenn eine Person mit einer nicht existierender ID erstellt wird
//Uncaught item not found. ID : 700
// ToDo: Was passiert wenn ein pflichtfeld z.B. email nicht geliefert wird
//wird nicht validiert und dazu ein console.warn msg geben
// ToDo: Was passiert wenn lastname führende und nachfolgende leerzeichen enthält
//wird translated