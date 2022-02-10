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
let p = new Person();
p.lastName = "maxmann";
p.firstName = "max";
p.mail = "someMail";
console.log(p.document());