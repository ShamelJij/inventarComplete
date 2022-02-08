//datenbank aufbau
/*
{"counter": zahl,
"body":[{...},
        {...},
        {...},
            ]

}
 */

class Database {
    #_db = '';

    constructor(dbname) {
        this.#_db = dbname;
        //  stored-obj found?
        let item = localStorage.getItem(this.#_db);
        if (!item || item.length == 0) {
            //  wenn nicht dann neu erstellen
            //      obj = {"counter": 0,
            //             "body": []
            //             }
            let item = {
                "counter": 0,
                "body": []
            };
            //      localstorage initialization und obj speichern
            localStorage.setItem(this.#_db, JSON.stringify(item));
        } else {
            //  wenn ja dann ok
        }
    }

    getAll() {
        let items = JSON.parse(localStorage.getItem(this.#_db));
        return items.body;
    }

    /**
     *
     * @param id
     * @return {T}
     */
    get(id) {
        let items = JSON.parse(localStorage.getItem(this.#_db)).body;
        let item = items.find(element => element._id == id);
        if (!item){
            //item nicht gefunden
            throw (30000,'item not found. ID : ' + id );
        }
        return item;
    }

    #getNewId() {
        let db = JSON.parse(localStorage.getItem(this.#_db));
        let id = db.counter;
        (db.counter)++;
        localStorage.setItem(this.#_db, JSON.stringify(db));
        return id;
    }

    save(id, body) {
        //wenn id leer dann 4
        let isNew = false;
        if (!id) {
            //id ist gleich getNewId aufrufen
            id = this.#getNewId();
            isNew = true;
        } else {
            //sonst wenn id nicht existiert return false
            //throw('cannot be saved. no ID found!');
            try{
                this.get(id);
            } catch (err) {
                throw err;
            }
        }
        //datenBank auslesen
        let db = JSON.parse(localStorage.getItem(this.#_db));
        let items = db.body;
        //body_id ist gleich id
        body._id = id;

        if (isNew) {
            items.push(body);
        }
        else {
            //wenn existiert. item mit dem id ermittelen dann überschreiben
            // todo: id ermittelen und überschreiben
            let found = items.find(element => element._id == id );
            let found_index = items.indexOf(found);
            items[found_index]= body;
        }
        db.body = items;
        localStorage.setItem(this.#_db, JSON.stringify(db));
    }

    delete(id) {
        try{
            this.get(id);
        } catch (err) {
            throw err;
        }
        //todo: element mit id löchen
        let db = JSON.parse(localStorage.getItem(this.#_db));
        let items = db.body;
        let item = items.find(element => element._id == id);
        console.log('delete: ',item);
        items.splice( items.indexOf(item),1);
        db.body = items;
        localStorage.setItem(this.#_db, JSON.stringify(db));
    }

}
class Person extends Database {
    #_db = 'Personfive';
    #_id;
    #_body;

    constructor(id, db) {

        super(db);
        this.#_db = db;
        this.#_id = id;



    }

    loggID() {
        console.log(this.#_id,this.#_body);
    }


    save(body) {

    }

    #validate() {
    }

    #translate() {
    }

    document() {
        return this.#_body;
    }
}
let p = new Person(280,'persontestseven');
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


/*
console.log('Alle Datenbank: ');
let arr = d.getAll();
console.log(arr);
console.log('Get Funktion: ');
console.log(d.get(4));
console.log('Deleted Item: ');
d.delete(9);*/
//todo: try - catch
//todo: lastOf = .length-1

export {Database as Localdata};
