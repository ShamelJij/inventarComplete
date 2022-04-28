/**
 * Created on 02.03.2022.
 */
var Database = require('../superclass/Database');

/**
 * storagelayer for inventories
 *
 * @class InventoriesDb
 * @constructor
 */
class InventoriesDb extends Database {

    // --------------------------------------------------------------------------------
    constructor() {
        super();

        this._dbName  = "inventar";
        this._db      = this.couchDb.use(this._dbName);

        this.promisify();
    }

    // --------------------------------------------------------------------------------
    /**
     * get document by key
     * if key is not specified the all documents returned
     *
     * @method getDocumentByKey
     * @param {String} key searchkey
     * @return promise
     */
    getDocumentByKey( key ) {
        return super.getDocumentById( key );
    }

    // --------------------------------------------------------------------------------
    /**
     * get document by key
     * if key is not specified the all documents returned
     *
     * @method getDocumentByKey
     * @param {String} key searchkey
     * @return promise
     */
    getAllDocumentsByKey( key, view ,desc ) {
        if (!view) {
            view = 'id';
        }
        let body = super.getDocumentsByKeyFromView('inventories', view, key, 0,0, false);
        return body;
    }

    // --------------------------------------------------------------------------------
    /**i
     * update existing item
     *
     * @method updateItem
     * @param {Object} Json to save
     * @return promise
     */
    updateDocument( objDbBody ) {
        return super.update(objDbBody, objDbBody._id);
    }

    // --------------------------------------------------------------------------------
    /**
     * save new item
     *
     * @method createItem
     * @param {Object} Json to save
     * @return promise
     */
    createDocument( objDbBody ) {
        let id = objDbBody.id;
        return super.save(objDbBody, objDbBody._id);
    }

    // --------------------------------------------------------------------------------
    /**
     * save new item
     *
     * @method createItem
     * @param {Object} Json to save
     * @return promise
     */
    createDocument( objDbBody ) {
        let id = objDbBody.id;
        return super.save(objDbBody, id);
    }
}


module.exports = new InventoriesDb();