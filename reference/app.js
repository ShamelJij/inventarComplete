import {Person, Persons} from './persons.js';
import {Inventory} from './inventory.js';
import {Location} from './location.js';
import {Database} from "./database.js";
//person
/*let f = new Person(3);
f.save(null,{ "name": "kimmer", "time": Date.now()});
let p = new Person(1);
console.log(p.document());
let change = p.document();
change.name= 'Karl';
change.email= 'cali@cali.com';
p.save(change);
console.log(p.document());
console.log(Persons.getAll());*/
//inventory
/*let newInventory = new Database('InventoryO');
newInventory.save(null,{ deprecationInput: "12", formBookCategory: "GWG", formStatus: "Aktiv", Price: "0", label: "HP", purchaseDate: "07.01.2022", serialNumber: "223344", type: "Monitor", validationEndDate: "12", "time": Date.now()});
let inventory = new Inventory(15);
console.log(inventory.document());
let iChange = inventory.document();
iChange.status= 'Aktiv.';
iChange.price= 2500;
inventory.save(iChange);
console.log(inventory.document());
//location
let newLocation = new Database('LocationO');
newLocation.save(null,{ floorNumber: "5", houseNumber: "24b", locationLabel: "firmaName", locationName: "Mainz", roomNumber: "7", zipCode: "55120", "time": Date.now()});
let location = new Location(3);
console.log(location.document());
let lChange = location.document();
lChange.locationName= 'Bingen';
lChange.zipCode= 77777;
location.save(lChange);
console.log(location.document());*/


console.log( '*** CRUD TEST OF PERSON ***' );

//--------------------------------------------------------------------------------
console.group( '--- Create Person---' );
console.log( 'create object' );
let p   = new Person();
console.log( 'content of person' );
let doc = p.document();
console.log( doc );

console.log( 'set person values' );
doc.lastName  = "maxmann";
doc.firstName = "max";
doc.mail      = "someMail";

console.log( 'save person' );
p.save(doc);

console.log( 'content of saveed person' );
console.log(p.document());
console.groupEnd();
//--------------------------------------------------------------------------------

console.group( '--- Read Person---' );
// ToDo: add read
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Update Person---' );
// ToDo: add update
console.groupEnd();

//--------------------------------------------------------------------------------
console.group( '--- Delete Person---' );
// ToDo: add delete
console.groupEnd();


console.log( '*** LOGIC TEST OF PERSON ***' );
// ToDo: Was passiert bei "doc.age = 33"
// ToDo: Was passiert wenn bei einem Update lastname nicht mitgelifert wird ?
// ToDo: Was passiert wenn eine Person mit einer nicht existierender ID erstellt wird
// ToDo: Was passiert wenn ein pflichtfeld z.B. email nicht geliefert wird
// ToDo: Was passiert wenn lastname führende und nachfolgende leerzeichen enthält