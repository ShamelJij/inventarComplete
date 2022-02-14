import {Database} from './database.js';
// import {Document} from "./Document.js";

export class Person {

#_dbName;
#_id;
#_body;
#_db;

// ToDo: append JSDoc for alle functions
    /**
     *
     * @param id
     */
    constructor(id) {
        this.#_dbName = 'Person';
        this.#_db   = new Database(this.#_dbName);

        if (id) {
            this.#_id = id;
            this.#_body = this.#_db.get(id);
        } else {
            let schema = {
                "_id": null,
                "lastName": '',
                "firstName": '',
                "email": '',
                "personalID": ''
            };
            this.#_body = schema;
            this.#_id = null
        }

    }

    /**
     *
     * @param body
     */
    save(body) {
        let newBody = this.#schema(body);
        if(this.#_id){
            newBody._id = this.#_id;
        }
        this.#_body = this.#_db.save(this.#_id, newBody);
    }

    /**
     *
     * @param oldBodyId
     * @type {number}
     * @param newBody
     */
    update(id, newBody){
        //erst alle eingaben trimmen
        this.#translate(newBody);
        //dann eingaben validieren
        if (this.#validate(newBody)){
            this.#_id = id;
            this.save(newBody);
            console.log('item: ',id, newBody,'ist geupdated!');
        } else {

        }

    }

    get(id){
        return this.#_db.get(id);
    }

    /**
     *@param body
     *@returns {Object} 
     */
    #schema(body){
        // ToDo: Complete code for alle attributes
        let newBody = {};
        if(body.lastName){
            newBody.lastName = body.lastName;
        } else {
            newBody.lastName = this.#_body.lastName;
        }
        if(body.firstName){
            newBody.firstName = body.firstName;

        } else {
            newBody.firstName = this.#_body.firstName;
        }
        if(body.email){
            newBody.email = body.email;
        } else {
            newBody.email = this.#_body.email;
        }
        if(body.personalID){
            newBody.personalID = body.personalID;
        } else {
            newBody.personalID = this.#_body.personalID;
        }
        return newBody;
    }

    /**
     *
     */
    #validate(body) {
        // ToDo: Validate mandantory fields
        let persons = Persons.getAll();

        let ret = true;
        let msg = '';
        let letters = /^[a-zA-Z]*$/;
        let is_email = body.email.match(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
        const found_personal_number = (persons.find(element => element.personalID == body.personalID));
        const found_email = (persons.find(element => element.email == body.email));

        if(found_personal_number){
            console.log('test: ',found_personal_number);
            msg = (`personalNumber: ${body.personalID} ist gefunden und könnte nicht dupliziert!`);
            ret = false;
        }else if (body.personalID == '' || body.personalID < 1){
            msg = ('personalNumber ist leer oder kleiner als 1');
            ret = false;
        } else {
            console.log('body ',this.#_body);
            //alles gut und ret ist true
        }

        if(is_email){

            if (found_email){
                msg = (`email: ${body.email}  ist gefunden und könnte nicht dupliziert`);
                ret = false;
            } else if (body.email == ''){
                msg = ('email ist leer!');
                ret = false;
            } else {
                //alles gut ret ist true
            }

        } else {
            //Eingabe ist nicht email ret ist falsch
            msg =('E-Mail ist nicht valid!');
            ret = false;
        }

        if(body.lastName == '' || !letters.test(body.lastName)){
            msg = ('lastName ist nicht valid!');
            ret = false;
        } else {
            //alles gut ret ist true
        }

        if (body.firstName == '' || !letters.test(body.firstName)) {
            msg = ('firstName ist nicht valid!');
            ret = false;
        } else {
            //alles gut ret ist true
        }
        if(ret == false){
            console.warn('Eingabe ist nicht valid weil:', msg);
        }

        return ret;

    }

    /**
     *
     */
    #translate(body) {
        // ToDo: trim all values
        body.email = body.email.replace(/ +/g, "");
        body.lastName = body.lastName.replace(/ +/g, "");
        body.firstName = body.firstName.replace(/ +/g, "");
        return body;
    }

    /**
     *
     * @param id
     */
    delete(id){
        this.#_db.delete(id);
    }

    /**
     *
     * @returns {*}
     */
    document(){
        return this.#_body;
    }
}


/**
 *
 */
export class Persons {

    static getAll() {
        let p = new Database("Person");
        return p.getAll();
    }
}

