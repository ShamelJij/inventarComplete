/**
 * Created on 02.03.2022.
 */
const dbInventories = require('./InventoriesDB');
const Inventory = require('./Inventory');
const lodash = require('lodash');
const moment = require('moment');

/**
 * Collection of locations
 *
 * @class Abstract class Inventories
 * @static
 *
 */
class Inventories {

    //--------------------------------------------------------------------------------
    constructor() {
        throw new Error('can not instantiate an abstract class');
    }

    //--------------------------------------------------------------------------------
    /**
     * get inventories by id
     *
     * @method
     * @param {String} strUnid inventories UNID
     * @return Inventory
     */
    static async getById(strUnid) {
        try {
            let body = await dbInventories.getDocumentByKey(strUnid);

            if (body.statusCode === 404) {
                // not found
                throw {'appError': 20404};
            }
            if (body.form === 'inventory') {
                // found
                let objInventory = new Inventory(body._id);
                if (body.deliveryDate && body.deliveryDate.indexOf('T') > 0) {
                    body.deliveryDate = body.deliveryDate.slice(0, body.deliveryDate.indexOf('T'));
                }
                if (body.hasOwnProperty('alt_group') && body.alt_group) {
                    body.group = body.alt_group;
                }
                if (body.hasOwnProperty('retailPrice') && body.retailPrice === '') {
                    body.retailPrice = 0;
                }
                objInventory.setDbBody(body);

                return objInventory;
            } else {
                console.warn('requested id is not form=inventory');
                // not found
                throw {'appError': 20404};
            }

        } catch (err) {
            console.log('[Inventories.getById] error: ' + JSON.stringify(err));
            throw err;
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * get multiple inventories by ids
     */
    static async getByIds(ids) {
        try {
            let documents = await dbInventories.getDocumentsByIds(ids);
            if (!documents.length) {
                // not found
                return null;
            } else {
                // found
                let inventories = [];
                for (let doc of documents) {
                    if (doc.form === 'inventory') {
                        let objInventory = new Inventory(doc);
                        if (doc.deliveryDate && doc.deliveryDate.indexOf('T') > 0) {
                            doc.deliveryDate = doc.deliveryDate.slice(0, doc.deliveryDate.indexOf('T'));
                        }
                        if (doc.hasOwnProperty('alt_group') && doc.alt_group) {
                            doc.group = doc.alt_group;
                        }
                        if (doc.hasOwnProperty('retailPrice') && doc.retailPrice === '') {
                            doc.retailPrice = 0;
                        }
                        objInventory.setDbBody(doc);
                        inventories.push(objInventory);
                    }
                }
                return inventories;
            }
        } catch (err) {
            console.log('[inventories.getByIds] error: ' + JSON.stringify(err));
            throw {'appError': 20000};
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * get all inventories
     *
     * @param {boolean} complete not used!
     * @param {boolean} uniques Unique groups, creators and suppliers
     * @param {string} view name of the view
     * @param {boolean} desc sorting descenting
     * @return {Promise<{inventories: Array, distinctGroups: Array, distinctCreators: Array, distinctSuppliers: Array}>}
     */
    static async getAll( limit, offset,  desc,query) {
        try {
            console.log('[Inventories.getAll]');
            desc     = desc || false;
            limit = limit || 100;
            offset = offset || 0;
            let view = 'id';

            let body = await dbInventories.getAllDocumentsByKey(null, view, desc, limit, offset);
            let result = [];
            body.forEach(function (v) {result.push(v.value)});
            return result;
        } catch (err) {
            console.log('[Inventories.getAllDocumentsByKey] error: ' + JSON.stringify(err));
            throw {'appError': 20001};
        }
    }
}

module.exports = Inventories;