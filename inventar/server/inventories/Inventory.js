/**
 * Created on 16.03.2017.
 */

//################################################################################
/**
 * require section
 */
let dbInventories = require('./InventoriesDB');
let Document   = require('../superclass/Document');
const ld       = require('lodash');


//################################################################################
/**
 * PRIVATE DECLARATION
 * ES6 Class does not support private attributes / functions
 * Use this as workaraound
 */

//--------------------------------------------------------------------------------
/**
 * convert data
 */
/*function inputTranslation( body ) {

    // if flyer
    if (body.flyer == true) {
        body.flyerCount = body.flyerCount | 1;
    } else {
        body.flyerCount = 0;
    }

    // Tealgoal always = true
    body.supplier.tealgoal    = true;
    body.preSupplier.tealgoal = true;

    return body;
}*/


//################################################################################
/**
 * inventory object
 *
 * @class Inventory
 * @constructor
 */
class Inventory extends Document {

    //--------------------------------------------------------------------------------
    constructor(arg1) {
        super();

        this._ressourcePath = '/v1/inventories/'; // + {id}
        this._form          = 'inventory';
        this._schema        = 'swagger.json#/definitions/Inventory';

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

            this._dbBody = await dbInventories.getDocumentById( key );
            this._dbBodyToBody();

            return true;
        } catch(err) {
            console.error('[Inventory.reloadFromDb] error:' + JSON.stringify(err));
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
                //newBody = inputTranslation(newBody);
                this.validateSchema( newBody );
            } else {
                newBody.deleted = true;
            }

            // merge the new object and the object from database
            this._dbBody      = this._dbBody || {};
            this._dbBody = ld.merge( this._dbBody, newBody );

            // if new .img or .docs are empty arrays, they will be not updated
            // have to do it explicitly
            this._dbBody.docs = newBody.docs;
            this._dbBody.img = newBody.img;

            this._dbBody.form   = this._form;
            this._dbBody._id    = this._id;
            if (this._dbBody.deleted) {
                this.setHistory(userName, "deleted");
            } else {
                this.setHistory(userName, "Aktualisiert /Updated");
            }

            await dbInventories.updateDocument(this._dbBody);
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
            //this.validateSchema( newBody );
            this._dbBody        = {};
            this._dbBody        = newBody;
            this._dbBody.status = 1;
            this._dbBody.form   = this._form;
            this.setHistory(strUsername, "Neu erstellt / created");
            this.setDefaultAccess();

            let ret = await dbInventories.createDocument(this._dbBody);
            this._id          = ret.id;
            this._dbBody._rev = ret.rev;
            await this.reloadFromDb();
            return true;
        } catch(err) {
            console.error('[Inventory.createnew] error:' + JSON.stringify(err));
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

module.exports = Inventory;