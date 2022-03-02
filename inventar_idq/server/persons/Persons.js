/**
 * Created on 02.03.2017.
 */
const dbPersons = require('./PersonsDB');
const Person = require('./Person');
const lodash = require('lodash');
const moment = require('moment');

/**
 * Collection of persons
 *
 * @class Abstract class Persons
 * @static
 *
 */
class Persons {

    //--------------------------------------------------------------------------------
    constructor() {
        throw new Error('can not instantiate an abstract class');
    }

    //--------------------------------------------------------------------------------
    /**
     * get persons by id
     *
     * @method
     * @param {String} strUnid persons UNID
     * @return Person
     */
    static async getByUnid(strUnid) {
        try {
            let body = await dbPersons.getDocumentByKey(strUnid);

            if (body.statusCode === 404) {
                // not found
                throw {'appError': 20404};
            }
            if (body.form === 'person') {
                // found
                let objPerson = new Person(body._id);
                if (body.deliveryDate && body.deliveryDate.indexOf('T') > 0) {
                    body.deliveryDate = body.deliveryDate.slice(0, body.deliveryDate.indexOf('T'));
                }
                if (body.hasOwnProperty('alt_group') && body.alt_group) {
                    body.group = body.alt_group;
                }
                if (body.hasOwnProperty('retailPrice') && body.retailPrice === '') {
                    body.retailPrice = 0;
                }
                objPerson.setDbBody(body);

                return objPerson;
            } else {
                console.warn('requested id is not form=person');
                // not found
                throw {'appError': 20404};
            }

        } catch (err) {
            console.log('[Persons.getByUnid] error: ' + JSON.stringify(err));
            throw err;
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * get multiple persons by ids
     */
    static async getByUnids(ids) {
        try {
            let documents = await dbPersons.getDocumentsByIds(ids);
            if (!documents.length) {
                // not found
                return null;
            } else {
                // found
                let persons = [];
                for (let doc of documents) {
                    if (doc.form === 'person') {
                        let objPerson = new Person(doc);
                        if (doc.deliveryDate && doc.deliveryDate.indexOf('T') > 0) {
                            doc.deliveryDate = doc.deliveryDate.slice(0, doc.deliveryDate.indexOf('T'));
                        }
                        if (doc.hasOwnProperty('alt_group') && doc.alt_group) {
                            doc.group = doc.alt_group;
                        }
                        if (doc.hasOwnProperty('retailPrice') && doc.retailPrice === '') {
                            doc.retailPrice = 0;
                        }
                        objPerson.setDbBody(doc);
                        persons.push(objPerson);
                    }
                }
                return persons;
            }
        } catch (err) {
            console.log('[persons.getByUnids] error: ' + JSON.stringify(err));
            throw {'appError': 20000};
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * get all persons
     *
     * @param {boolean} complete not used!
     * @param {boolean} uniques Unique groups, creators and suppliers
     * @param {string} view name of the view
     * @param {boolean} desc sorting descenting
     * @return {Promise<{persons: Array, distinctGroups: Array, distinctCreators: Array, distinctSuppliers: Array}>}
     */
    static async getAll(complete, uniques, view, desc) {
        try {
            console.log('[Persons.getAll]');
            desc     = desc || false;
            let body = await dbPersons.getAllDocumentsByKey(null, view, desc);

            let result = {
                persons: [],
                distinctGroups: [],
                distinctCreators: [],
                distinctSuppliers: []
            };

            body.forEach(function(v) {
                if (v.doc['history']) {
                    if (v.doc['history'].createdBy) {
                        let i = v.doc['history'].createdBy.indexOf('/');
                        if (i !== -1) {
                            v.doc['history'].createdBy = v.doc['history'].createdBy.substr(0, i);
                        }
                    }
                    if (v.doc['history'].createdOn) {
                        v.doc['history'].createdOn = moment(v.doc['history'].createdOn).format('YYYY-MM-DD');
                    }
                }
                if (v.doc.hasOwnProperty('alt_group') && v.doc.alt_group) {
                    v.doc.group = v.doc.alt_group;
                }
                if (v.doc.hasOwnProperty('retailPrice') && v.doc.retailPrice === '') {
                    v.doc.retailPrice = 0;
                }
                result.persons.push(v.doc);

                if (uniques) {
                    result.distinctGroups.push(v.doc.group);
                    result.distinctCreators.push(v.doc.history.createdBy);
                    if (v.doc.supplier) {
                        result.distinctSuppliers.push(v.doc.supplier.no);
                    }
                }
            });

            if (uniques) {
                result.distinctGroups    = lodash.uniq(result.distinctGroups).sort();
                result.distinctCreators  = lodash.uniq(result.distinctCreators).sort();
                result.distinctSuppliers = lodash.uniq(result.distinctSuppliers).sort();
            }
            return result;
        } catch (err) {
            console.log('[Persons.getAllDocumentsByKey] error: ' + JSON.stringify(err));
            throw {'appError': 20001};
        }
    }
}

module.exports = Persons;