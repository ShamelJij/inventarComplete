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