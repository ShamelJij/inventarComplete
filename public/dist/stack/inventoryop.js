import {Databaseop} from "./database.js";

export class Inventoryop {
    #_dbName = 'inventory';
    #_id;
    #_body;
    #_db;
    constructor(id) {
        this.#_id = id;
        this.#_db = new Databaseop(this.#_dbName);
        this.#_body = this.#_db.get(id);
    }
    save(body) {
        this.#_db.save(this.#_id,body);
    }
    #validate() {

    }
    #translate() {
    }
    document(){
        return this.#_body;
    }
}