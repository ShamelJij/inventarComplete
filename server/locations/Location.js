/**
 * Created on 18.07.2017.
 */

//################################################################################
/**
 * require section
 */
let dbLocations = require('./LocationsDb');
let Document   = require('../superclass/Document');
const ld       = require('lodash');

//################################################################################
/**
 * location object
 *
 * @class Location
 * @constructor
 */
class Location extends Document {

    //--------------------------------------------------------------------------------
    constructor(arg1) {
        super();

        this._ressourcePath = '/v1/locations/'; // + {id}
        this._form          = 'location';
        this._schema        = 'swagger.json#/definitions/LocationWithoutID';

        if (ld.isObject(arg1)) {
            this._dbBody = arg1;
            this._id     = arg1._id || arg1.id;
            if (arg1.form !== this._form) {
                throw {'appError': 21404};
            }
        } else {
            this._id = arg1;
        }
    }

    //--------------------------------------------------------------------------------
    schema() {

    }

    //--------------------------------------------------------------------------------
    /**
     * reload body from database
     *
     * @method reloadFromDb
     */
    async reloadFromDb() {
        try {
            let key = this._id;

            this._dbBody = await dbLocations.getDocumentById( key );
            this._dbBodyToBody();

            return true;
        } catch(err) {
            console.error('[Location.reloadFromDb] error:' + JSON.stringify(err));
            throw err;
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * updated doc on database with given object
     *
     * @method update
     * @param {Object} newBody updated data
     * @param {string} userName
     * @param {boolean} [deleteIt]
     */
    async update(newBody, userName, deleteIt) {
        try {
            if (!deleteIt) {
                // don't validate if should be deleted
               // newBody = inputTranslation(newBody);
                this.validateSchema( newBody );
            } else {
                newBody.deleted = true;
            }

            // merge the new object and the object from database
            this._dbBody      = this._dbBody || {};
            this._dbBody = ld.merge( this._dbBody, newBody );

            this._dbBody.form   = this._form;
            this._dbBody._id    = this._id;
            if (this._dbBody.deleted) {
                this.setHistory(userName, "deleted");
            } else {
                this.setHistory(userName, "Aktualisiert /Updated");
            }

            await dbLocations.updateDocument(this._dbBody);
            await this.reloadFromDb();
            return true;
        } catch( err ) {
            console.error(err);
            throw err;
        }
    }

//--------------------------------------------------------------------------------
    /**
     * create new doc on database with given object
     *
     * @method update
     * @param {Object} newBody updated data
     * @param {string} strUsername name of current user
     */
    async createnew(newBody, strUsername) {
        try {
            //newBody = inputTranslation(newBody);
            this.validateSchema( newBody );
            this._dbBody        = {};
            this._dbBody        = newBody;
            this._dbBody.status = 1;
            this._dbBody.form   = this._form;
            this.setHistory(strUsername, "Neu erstellt / created");

            let ret = await dbLocations.createDocument(this._dbBody);
            this._id          = ret.id;
            this._dbBody._rev = ret.rev;
            //await this.reloadFromDb();
            return true;
        } catch(err) {
            console.error('[Location.createnew] error:' + JSON.stringify(err));
            throw err;
        }
    }

//--------------------------------------------------------------------------------
    /**
     * get ressource url and object
     *
     * @method getRessource
     * @return {Object} {'url': <ressourceURL>}
     */
    getRessource() {
        this._dbBodyToBody();

        return {
            'url': this._ressourcePath + this._id,
        };
    }
}

module.exports = Location;