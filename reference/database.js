//datenbank aufbau
/*
{"counter": zahl,
"body":[{...},
        {...},
        {...},
            ]

}
 */
/**
 * Datenbank aufbau: im LocalStorage: key: 'Name', Value: {"counter": Zahl, "body":[{..},{..},{..}]}
 * @class
 */
export class Database {
    #_db = '';

    /**
     * @constructor
     * @param dbname
     */
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
     *@function get
     * @param id
     * @return {item}
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

    /**
     *@function getNewId
     * @return {*|number|Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|DataView|ArrayBuffer}
     */
    #getNewId() {
        let db = JSON.parse(localStorage.getItem(this.#_db));
        let id = db.counter;
        (db.counter)++;
        localStorage.setItem(this.#_db, JSON.stringify(db));
        return id;
    }

    /**
     * @function save
     * @param id
     * @param body
     */
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

    /**
     * @function delete
     * @param id
     */
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


//export Database;
