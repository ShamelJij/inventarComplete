import {Person, Persons} from './persons.js';
import {Inventory} from './inventory.js';
import {Location} from './location.js';
import {Database} from "./database.js";

console.log( '*** CRUD TEST OF PERSON ***' );

//--------------------------------------------------------------------------------
console.group( '--- Create Person---' );
console.log( 'create object' );
let p   = new Person();
console.log( 'content of person' );
let doc = p.document();
console.log( doc );

console.log( 'set person values' );
doc.lastName  = "testmann";
doc.firstName = "maxi";
doc.email      = "testMail";
doc.age = 33;


console.log( 'save person' );
//p.save(doc);

console.log( 'content of saveed person' );
console.log(p.document());
console.groupEnd();
//--------------------------------------------------------------------------------

console.group( '--- Read Person---' );
// ToDo: add read
console.log(p.get(4));
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Update Person---' );
// ToDo: add update
let toUpdateObj = {};
toUpdateObj.lastName = "updatedLastName";
toUpdateObj.firstName = "updatedName";
toUpdateObj.email = "updatedEmail";

p.update(5,toUpdateObj);
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Delete Person---' );
// ToDo: add delete
p.delete(4);
console.groupEnd();


console.log( '*** LOGIC TEST OF PERSON ***' );
console.log('the id is: ', doc._id);
// ToDo: Was passiert bei "doc.age = 33"
//wird nicht genommen weil es ist kein Teil von NewBody in #schema
// ToDo: Was passiert wenn bei einem Update lastname nicht mitgelifert wird ?
// ToDo: Was passiert wenn eine Person mit einer nicht existierender ID erstellt wird
// ToDo: Was passiert wenn ein pflichtfeld z.B. email nicht geliefert wird
// ToDo: Was passiert wenn lastname führende und nachfolgende leerzeichen enthält