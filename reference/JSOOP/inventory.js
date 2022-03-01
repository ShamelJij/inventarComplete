import {Database} from "./database.js";

export class Inventory {
    #_dbName = 'InventoryO';
    #_id;
    #_body;
    #_db;
    constructor(id) {
        this.#_id = id;
        this.#_db = new Database(this.#_dbName);
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