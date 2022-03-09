
/**
 var ajv = require('ajv');
 ajv.addSchema(swagger, 'swagger.json')
 var isValid = ajv.validate({ $ref: 'swagger.json#/definitions/IDQ' }, { name: "John" });
 */

let Ajv      = require('ajv'); // https://www.npmjs.com/package/ajv
const moment   = require('moment');
const lodash   = require('lodash');

/**
 * SuperClass Document
 * provide common fucntions to objects that are stored to database
 *
 * @class Document
 * @constructor
 */
class Document {

    //--------------------------------------------------------------------------------
    constructor() {
        this._id       = "";        // Unique ID
        this._form     = "";        // form name
        this._dbBody   = null;      // Database Body
        this._body     = null;      // Model Body
        this._ressourcePath = "";   // ressource url

        this._schema = '';

    }

    //--------------------------------------------------------------------------------
    /**
     * has read access
     *
     * @method hasReadAccess
     * @param {array} accesslist list of strings
     * @return Boolean
     *
     */
    hasReadAccess( accesslist ) {
        if (this._dbBody.access) {
            // ToDo: (cp) has readaccess fertigstellen
            if (this._dbBody.access.readers) {
                // if useraccess roles is member of 'readers'
                //    return true
                // else
                //    return false

            } else {
                // access ok
                return true;
            }
        } else {
            // access ok
            return true;
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * has write access
     *
     * @method hasWriteAccess
     * @param {array} accesslist list of strings
     * @return Boolean
     *
     */
    hasWriteAccess( accesslist ) {
        if (this._dbBody.access) {
            // ToDo: (cp) has writeAccess fertigstellen
            if (this._dbBody.access.readers) {
                // if useraccess roles is member of 'authors'
                //    return true
                // else
                //    return false

            } else {
                // access ok
                return true;
            }
        } else {
            // access ok
            return true;
        }
    }

    //--------------------------------------------------------------------------------
    /**
     * initialize object with database item
     *
     * @method setDbBody
     * @param {Object} obj_dbBody data from database
     */
    setDbBody( obj_dbBody ) {
        this._dbBody = this._dbBody || {};
        this._dbBody = obj_dbBody;
        this._dbBodyToBody();
    }

    //--------------------------------------------------------------------------------
    /**
     * convert dbBody to body (remove from)
     *
     * @method private
     */
    _dbBodyToBody() {
        this._body = this._body || {};
        this._body = this._dbBody;
        delete this._body.form;
    }

    //--------------------------------------------------------------------------------
    /**
     * convert dbBody to body (remove from)
     *
     * @method document
     * @return body
     */
    get document() {
        return this._dbBody || this._body
    }


    //--------------------------------------------------------------------------------
    /**
     * set default access to authornames, readernames
     *
     * @method setDefaultAccess
     */
    setDefaultAccess( extendAccess ) {
        let defAccess = {
            'authors': ['authornames'],
            'readers': ['readernames']
        };

        // extend default access
        if (extendAccess) {
            if (extendAccess.r) {
                defAccess.readers = lodash.concat(defAccess.readers, extendAccess.r)
            }
            if (extendAccess.w) {
                defAccess.authors = lodash.concat(defAccess.authors, extendAccess.w)
            }
        }

        this._dbBody.access = defAccess;
    }

    //--------------------------------------------------------------------------------
    /**
     *
     * @param statusOld {number}
     * @param statusNew {number}
     * @param strUsername {username}
     */
    logWorkflowstep(statusOld, statusNew, strUsername) {
        strUsername = strUsername || 'Anonymous';

        if ( !this._dbBody.history) { this._dbBody.history = {} }
        if ( !this._dbBody.history.workflowsteps) { this._dbBody.history.workflowsteps = [] }


        // workflowsteps[i]

        let oldStep = {
            "status" : statusOld,
            "out"    : moment.utc().toISOString(),
            "outBy"  : strUsername
        };

        if (statusOld === 1) {
            oldStep.in   = this._dbBody.history.createdOn;
            oldStep.inBy = this._dbBody.history.createdBy;
        }

        let newStep = {
            "status" : statusNew,
            "in"    : moment.utc().toISOString(),
            "inBy"  : strUsername,
            "out"   : '',
            "outBy" : ''
        };
        let tmp = [];
        let l = this._dbBody.history.workflowsteps.length;
        for (let i = 0; i < l; i++ ) {
            if (this._dbBody.history.workflowsteps[i].status === statusOld) {
                oldStep = {
                    "status" : statusOld,
                    "in": this._dbBody.history.workflowsteps[i].in,
                    "inBy": this._dbBody.history.workflowsteps[i].inBy,
                    "out"    : moment.utc().toISOString(),
                    "outBy"  : strUsername
                };
            } else if (this._dbBody.history.workflowsteps[i].status === statusNew) {
                // nothing
            } else {
                tmp.push(this._dbBody.history.workflowsteps[i]);
            }
        }

        if (statusOld !== 0) {
            tmp.push(oldStep);
        }
        tmp.push(newStep);

        // this._dbBody.history.workflowsteps.push(oldStep);
        // this._dbBody.history.workflowsteps.push(newStep);
        this._dbBody.history.workflowsteps = tmp;

    }

    //--------------------------------------------------------------------------------
    /**
     * set last modified on / by and created on / by
     *
     * @method setHistory
     */
    setHistory(strUsername, strText) {
        strUsername = strUsername || 'Anonymous';
        if (!this._dbBody.history) {
            this._dbBody.history = {};

            this._dbBody.history.createdBy = strUsername;
            this._dbBody.history.createdOn = moment.utc().toISOString();
        }

        if (strText === "deleted") {
            this._dbBody.history.deletedBy = strUsername;
            this._dbBody.history.deletedOn = moment.utc().toISOString();
            strText = "Gelöscht /Deleted"
        } else {
            this._dbBody.history.modifiedBy = strUsername;
            this._dbBody.history.modifiedOn = moment.utc().toISOString();
        }

        if ( strText ) {
            let o = {
                "on": moment.utc().toISOString(),
                "by": strUsername,
                "entry": strText,
            };

            if (!this._dbBody.history.historylist || !Array.isArray(this._dbBody.history.historylist)) {
                this._dbBody.history.historylist = [];
            }
            this._dbBody.history.historylist.push(o);
        }
    }

    //--------------------------------------------------------------------------------
    validateSchema( body ) {
        // https://github.com/epoberezkin/ajv/issues/195
        // https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343
        // https://ajv.js.org/keywords.html#keywords-for-numbers
        // https://www.npmjs.com/package/ajv/v/4.9.2#filtering-data
        try {
            if (this._schema === '') return null;

            // remove items that are not in schema
            let ajv = Ajv({removeAdditional: 'all', useDefaults: true});
            ajv.addSchema(global.swaggerDoc, 'swagger.json');
            // remove fields that are only read only
            ajv.addKeyword('x-validation-readOnly', {
                modifying: true,
                schema: false,
                valid: true,
                validate: function( propertyData, dataPath, objectData, propertyName, objectData2) {
                    /**
                     *
                     console.log('propertyData' + JSON.stringify(propertyData));
                     console.log('dataPath' + JSON.stringify(dataPath));
                     console.log('objectData' + JSON.stringify(objectData));
                     console.log('propertyName' + JSON.stringify(propertyName));
                     console.log('objectData2' + JSON.stringify(objectData2));
                     */
                    delete objectData[propertyName];
                }
            });

            let isValid;
            if (body) {
                isValid = ajv.validate({ $ref: this._schema}, body);
            } else {
                isValid = ajv.validate({ $ref: this._schema}, this._dbBody);
            }

            if (isValid === false) {
                let message = ajv.errors.map( function( item ){
                    return item.message + " " + item.dataPath;
                });

                throw {'appError': '10601', 'details': JSON.stringify(message)};
            }
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Document;