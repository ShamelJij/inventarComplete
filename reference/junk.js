/*
class Person extends Database {
    //#_db = 'Personfive';
    #_id;
    #_body;

    constructor(id, db) {

        super(db);
        //this.#_db = db;
        this.#_id = id;



    }

    loggID() {
        console.log(this.#_id,this.#_body);
    }


    save(id,body) {
        this.save(id,body);
    }

    #validate() {
    }

    #translate() {
    }

    document() {
        return this.#_body;
    }
}
let p = new Person(22,'persontt');
p.save(350,{ "name": "sevenPerson", "time": Date.now()})
p.loggID();
let d = new Database("montag");
console.log('Erstelle neuen Datensatz ');
d.save(null,{ "name": "Andreas", "time": Date.now()});
console.log('Ändere vorhandenen Datensatz ');
d.save(1,{ "name": "Max", "time": Date.now()});
console.log('Ändere Datensatz mit nicht gegebene ID');
try{
    d.save(75,{ "name": "seven", "time": Date.now()});
} catch (err) {
    console.error(err);
}
console.log('Get Funktion mit nicht existierten ID : ');
try{
    d.get(70);
} catch (err) {
    console.error(err);
}
console.log('Get Funktion mit existierten ID : ');
//uncaught error Problem
//console.log(d.get(0));
console.log('Delete Funktion mit nicht existierten ID : ');
//uncaught error Problem
//console.log(d.delete(0));


/!*
console.log('Alle Datenbank: ');
let arr = d.getAll();
console.log(arr);
console.log('Get Funktion: ');
console.log(d.get(4));
console.log('Deleted Item: ');
d.delete(9);*!/
//todo: try - catch
//todo: lastOf = .length-1*/

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