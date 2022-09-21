import {Databaseop} from "./database.js";

export class Locationop {
    #_dbName = 'LocationO';
    #_id;
    #_body;
    #_db;

    constructor(id) {
        this.#_id = id;
        this.#_db = new Databaseop(this.#_dbName);
        if (id) {
            this.#_id = id;
            this.#_body = this.#_db.get(id);
        } else {
            let schema = {
                "_id": null,
                "company": '',
                "street": '',
                "": '',
                "personalID": ''
            };
            this.#_body = schema;
            this.#_id = null
        }
    }
    save(body) {
        this.#_db.save(this.#_id,body);
    }
    #schema(body){
        // ToDo: Complete code for alle attributes
        let newBody = {};
        if(body.company){
            newBody.company = body.company;
        } else {
            newBody.company = this.#_body.company;
        }
        if(body.street){
            newBody.street = body.street;
        } else {
            newBody.street = this.#_body.street;
        }
        if(body.houseNumber){
            newBody.houseNumber = body.houseNumber;

        } else {
            newBody.houseNumber = this.#_body.houseNumber;
        }
        if(body.zipCode){
            newBody.zipCode = body.zipCode;
        } else {
            newBody.zipCode = this.#_body.zipCode;
        }
        if(body.locationName){
            newBody.locationName = body.locationName;
        } else {
            newBody.locationName = this.#_body.locationName;
        }
        if(body.floor){
            newBody.floor = body.floor;
        } else {
            newBody.floor = this.#_body.floor;
        }
        if(body.room){
            newBody.room = body.room;
        } else {
            newBody.room = this.#_body.room;
        }
        return newBody;
    }

    #validate() {
    }

    #translate() {

    }
    document(){

        return this.#_body;
    }
}