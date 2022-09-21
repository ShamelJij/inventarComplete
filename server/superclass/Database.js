/**
 * SuperClass Database
 * Creates a handle to nano, every database connector inherits from
 * this class
 */

let module_nano = require('nano');
let json_config = require('../../config/' + (process.env.NODE_ENV || 'localhost') + '.json');
// bluebird converts every function of a class to a promise
// the original functionname was extened by 'Async'
let Promise  = require('bluebird');

/**
 * SuperClass Database
 * Creates a handle to nano and every database connector inherits from
 *
 * @class Database
 * @constructor
 */
class Database {

    //--------------------------------------------------------------------------------
    /**
     *
     * @returns {*}
     */
    constructor() {
        let str_couchURL = 'http://' + json_config.database.login + ':' +
            json_config.database.password + '@' + json_config.database.host;
        this.couchDb     = module_nano(str_couchURL);

        this._dbName = '';
        this._db     = null;

    }

    // --------------------------------------------------------------------------------
    promisify () {
        Promise.promisifyAll(this._db);
    }

    // --------------------------------------------------------------------------------
    /**
     * delete document by id from database
     * @param {string} id of requested document
     * @param {string} rev _rev field of requested document
     * @return {Object}
     * @throws {ApplicationError}
     */
    async deleteDocumentById(id, rev) {
        try {
            return await this._db.destroyAsync(id, rev);
        } catch (err) {
            // convert nano errors to application error
            console.error(`delete document by id DbName: ${this._dbName} / Id: ${id} failed`);
            console.error(err);
            throw err;
        }
    }

    // --------------------------------------------------------------------------------
    /**
     * get document by id from database
     * @param {string} id of requested document
     * @return {Object}
     * @throws {ApplicationError}
     */
    async getDocumentById(id) {
        try {
            return await this._db.getAsync(id);
        } catch (err) {
            if (err.statusCode === 404) {
                // not found
                return err;
            } else {
                // convert nano errors to application error
                console.warn('retrieval of getDocumentById DbName: ${this._dbName} / Id: ${id} failed, \n error ${JSON.stringify(err)}');
                throw err;
            }
        }
    }


    // --------------------------------------------------------------------------------
    /**
     * get document by id from view
     * @method getDocumentByKey
     * @param {String} designName Couch Design Name
     * @param {String} viewName Couch viewname
     * @param {[String]} keys searchkey
     * @param {number} offset number of first voucher
     * @param {number} [limit] max amount
     * @param {boolean} [descending] descending order*
     * @return {[object]}
     * @throws {ApplicationError}*
     */
    async getDocumentsByKeyFromView( designName, viewName, keys, offset, limit, descending, isBetweenKey ) {
        try {
            let body;
            let params = {
                descending:   descending || false,
                skip:         offset || 0,
                reduce:       false,
                include_docs: false
            };

            if (limit) {
                params.limit = limit;
            }

            // keys can be an array to search (Select Where In) or an between search
            if ( isBetweenKey ) {
                // between search with start- & endkey
                if (keys && keys.length===2 && Array.isArray(keys[0]) && Array.isArray(keys[1]) ) {
                    // start and endkey present
                    params.startkey = keys[0];
                    params.endkey = keys[1];
                }
            } else {
                // multible key search
                if ( Array.isArray(keys) ) {
                    params.keys = keys;
                } else if (keys) {
                    // single key search
                    params.key = keys;
                }
            }

            console.log('Query: designName: ' + designName + ' / viewName: ' + viewName + ' / params: ' + JSON.stringify(params));

            body = await this._db.viewAsync(designName, viewName, params);
            if (body.rows.length > 0) {
                return body.rows;
            } else {
                console.info('DbQuery result is empty');
                return null;
            }
        } catch (err) {
            if (err.statusCode === 404) {
                // not found
                return err;
            } else {
                // convert nano errors to application error
                console.warn('retrieval of getDocumentByKeyFromView DbName: ${this._dbName} / Id: ${keys} failed, \n error ${JSON.stringify( err )}');
                throw err;
                // throw new AppError('15000', err);
            }
        }
    }

    // --------------------------------------------------------------------------------
    /**
     * get List of document filtered with query
     * @param {number} offset number of first voucher
     * @param {number} [limit] max amount
     * @param {boolean} [descending] descending order true or false
     * @param {[string] | string | {}} startkey startkey for filter
     * @param {[string] | string | {}} endkey endkey for filter
     * @param {string} design name of design document
     * @param {string} view view name
     * @return {[Object]}
     * @throws {ApplicationError}
     */
    async getDocumentsByQuery(
        offset, limit, descending, startkey, endkey, design, view) {
        let backup, query, body;
        try {
            // switch keys in case of [descending]
            if (descending) {
                backup   = JSON.parse(JSON.stringify(startkey));
                startkey = endkey;
                endkey   = backup;
            }

            query = {
                startkey: startkey,
                endkey: endkey,
                descending: descending,
                skip: offset,
                reduce: false,
            };
            if (limit) {
                query.limit = limit;
            }
            body = await this._db.viewAsync(design, view, query);
            if (body.rows.length > 0) {
                return body.rows;
            } else {
                return null;
            }
        } catch (err) {
            // convert nano errors to application error
            console.error(`retrieval of getDocumentsByQuery DbName: ${this._dbName} / View: ${design}/${view}, Keys: [${startkey}] - [${endkey}] failed`);
            console.error(err);
            throw err; // new AppError('15000', err);
        }
    }

    // --------------------------------------------------------------------------------
    /**
     * get multiple documents by id and calls fn
     * @param {[string]} ids id of requested document
     * @return {[Object]}
     * @throws {ApplicationError}
     */
    async getDocumentsByIds(ids) {
        let body;
        let documents;
        try {
            body = await this._db.fetchAsync({keys: ids});
            documents = [];
            for (let row of body.rows) {
                // throw db error if any doc has an error message
                if (!row.error) {
                    documents.push(row.doc);
                } else {
                    console.warn(`retrieval of documents with ids ${JSON.stringify(ids)} failed, \n error ${JSON.stringify(doc.error)}`);
                    throw {err: '15000'};
                }
            }
            return documents;
        } catch (err) {
            // convert nano errors to application error
            console.warn('retrieval of getDocumentsByIds DbName: ${this._dbName} / Id: ${key} failed, \n error ${JSON.stringify( err)}');
            throw err;
        }
    }

    // --------------------------------------------------------------------------------
    /**
     * get report filtered with query
     * @param {number} offset number of first voucher
     * @param {number} [limit] max amount
     * @param {[string] | string | {}} startkey startkey for filter
     * @param {[string] | string | {}} endkey endkey for filter
     * @param {string} design name of design doc
     * @param {string} view view name
     * @param {number} groupLevel group level for reduce
     * @param {boolean} descending
     * @return {[Object]}
     * @throws {ApplicationError}
     */
    async getReport(offset, limit, startkey, endkey, design, view, groupLevel, descending) {
        let query = {
            reduce: true,
            descending: descending || false,
            group_level: groupLevel,
        };
        if (startkey) {
            query.startkey = startkey
        }
        if (endkey) {
            query.endkey = endkey
        }
        if (offset) {
            query.skip = offset
        }
        if (limit) {
            query.limit = limit;
        }
        try {
            let body = await this._db.viewAsync(design, view, query);
            return body.rows;
        } catch (err) {
            // convert nano errors to application error
            console.warn('retrieval of getReport DbName: ${this._dbName} / Id: ${key} failed, \n error ${JSON.stringify( err)}');
            throw err; // new AppError('15000', err);
        }
    };

    // --------------------------------------------------------------------------------
    /**
     * get report filtered with query and list function
     * @param {number} offset number of first voucher
     * @param {number} [limit] max amount
     * @param {[string] | string | {}} startkey startkey for filter
     * @param {[string] | string | {}} endkey endkey for filter
     * @param {string} design name of design doc
     * @param {string} view view name
     * @param {string} list list name
     * @param {number} groupLevel group level for reduce
     * @return {[Object]}
     * @throws {ApplicationError}
     */
    async getReportWithList(offset, limit, startkey, endkey, design, view, list, groupLevel) {
        let query = {
            startkey: startkey,
            endkey: endkey,
            skip: offset,
            reduce: true,
            descending: false,
            group_level: groupLevel,
        };
        if (limit) {
            query.limit = limit;
        }
        try {
            let body = await this._db.viewWithListAsync(design, view, list, query);
            return body.rows;
        } catch (err) {
            // convert nano errors to application error
            console.warn('retrieval of getReportWithList DbName: ${this._dbName} / Id: ${key} failed, \n error ${JSON.stringify( err)}');
            throw err; // new AppError('15000', err);
        }
    };

    // --------------------------------------------------------------------------------
    /**
     * @method save
     * @param {Object} body JSON Object that should saved
     * @param {String} strKey id of the object
     * @return promise
     */
    async save(body, strKey) {
        console.log('Database.save ==> (Key: ' + strKey + ') body: ' + JSON.stringify(body));

        try {
            // remove _rev if available
            delete body._rev;
            body = await this._db.insertAsync(body, strKey);
            console.log('...saved: ' + JSON.stringify( body ));
            return body;
        } catch (err) {
            console.error( 'save of document DbName: ${this._dbName} and body ${JSON.stringify( body)} failed, \n error ${JSON.stringify(err)}');
            throw err;
        }
    }



    // --------------------------------------------------------------------------------
    /**
     * updates given document in db
     *
     * @param document
     * @return {Promise<*>}
     */
    async update(document) {
        // console.log('Database.update ==> body: ' + JSON.stringify(document));
        let body;
        try {
            // let tmpId = document._id;
            // savedDoc = await this.getDocumentById( tmpId );

            // update rev to ensure we have the latest rev number
            // document._rev = savedDoc._rev;
            //delete document._rev;
            body = await this._db.insertAsync(document);

            // update rev number
            document._rev = body._rev || body.rev;
            return document;
        } catch (err) {
            // Object not found update -> insert
            if (err.errid === 'non_200' && err.error === 'conflict') {
                throw {'appError': 10409};
            } else {
                if (err.statusCode === 404) {
                    return await this.save(document);
                } else {
                    console.error('update of document type DbName: ${this._dbName} and body ${JSON.stringify(document)} failed, \n error ${JSON.stringify(err)}');
                    // convert nano errors to app errors
                    throw err; // new AppError('15002', err, null);
                }
            }
        }
    }

    // --------------------------------------------------------------------------------
    /**
     * @method saveCollection
     * @param {Object} body JSON-List that should saved
     * @return promise
     */
    async saveCollection(body) {
        console.log('Database bulksave');
        try {
            return await this._db.bulkAsync(body);
        } catch (err) {
            console.error(`saveCollection failed`);
            console.error(error);
            // convert nano errors to app errors
            throw err; // new AppError('15002', err, null);
        }
    }
}

module.exports = Database;