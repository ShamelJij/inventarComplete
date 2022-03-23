/**
 * Created on 16.03.2022.
 */
/**
 * route handler persons
 */
'use strict';

//################################################################################
/**
 * require section
 */
let Person   = require('../server/persons/Person');
let Persons  = require('../server/persons/Persons');
let AppError  = require('../server/inventarUtils/ApplicationError');
let lodash    = require('lodash');



//################################################################################
/**
 * routes section
 */

//--------------------------------------------------------------------------------
/**
 * POST /persons
 *
 * @param req
 * @param res
 */
module.exports.addPerson = async function addPerson (req, res) {
    console.log('(POST) body: ' + JSON.stringify(req.body));

    try {
            let person = new Person("");
            await person.createnew(req.body,"anonym");
           //let ret = { "response": "Person created! (function addPerson)" };
        let ret = { "url": person.getRessource(),
                    "data": person.document};
            res.statusCode    = 201;
            res.setHeader('Content-Type', 'application/json');
            res.send( ret );
    } catch (err) {
        console.log('error: ' + JSON.stringify( err ));
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }

};

//--------------------------------------------------------------------------------
/**
 * PUT /persons/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.updatePerson = async function updatePerson (req, res) {
    console.log(' (PUT) id: ' +  req.swagger.params.id.value);

    try {
        let ret = { "response": "Person updated!" + req.swagger.params.id.value + " (function addPerson)" };
        console.log(JSON.stringify(req.body));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(ret);

    } catch (err) {
        console.log('error: ' + JSON.stringify( err ));
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }
};

//--------------------------------------------------------------------------------
/**
 * DELETE /persons/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.deletePerson = async function deletePerson(req, res) {
    console.log(' (DELETE) id: ' +  req.swagger.params.personId.value);

    try {
        let objPerson = await Persons.getByUnid( req.swagger.params.personId.value );

        if (objPerson.hasWriteAccess( req.objUser.getRoles() )) {
            let userName = req.objUser.username();

            await objPerson.update(objPerson.document, userName, true);

            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.send({});
        } else {
            // no access
            throw {'appError': 20403};
        }
    } catch (err) {
        console.log('error: ' + JSON.stringify( err ));
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }
};

//--------------------------------------------------------------------------------
/**
 * GET /persons
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getPersons = async function getPersons(req, res) {
    console.log('(GET) ');

    try {
        // ids parameter available?
        let ret;

            // get all persons
            ret = await Persons.getAll(false, true);


        res.statusCode    = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(ret);
    } catch (err) {
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }

};

//--------------------------------------------------------------------------------
/**
 * GET /persons/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getPersonById = async function getPersonById (req, res) {
    // console.log(' (GET) path: ' + req.swagger.params.personId.value);

    try {
        let ret = await Persons.getByUnid(req.swagger.params.personId.value);
        // console.log(JSON.stringify(ret.document));
        if ( req.objUser.isEK() === false && req.objUser.isGF() === false ) {
            // this user should not have access to
            let newret = lodash.omit( ret.document, ['supplier.buyPrice', 'supplier.buyPriceCurr', 'preSupplier.buyPrice', 'preSupplier.buyPriceCurr'] );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(newret);
        } else {
            // sometimes supplier.buyPrice is saved as string in german format
            // this causes failure of the formatted number display in frontend
            if (ret.document && ret.document.supplier && ret.document.supplier.buyPrice) {
                if (typeof ret.document.supplier.buyPrice === 'string') {
                    ret.document.supplier.buyPrice = ret.document.supplier.buyPrice.replace(',', '.');
                }
            }
            if (ret.document && ret.document.preSupplier && ret.document.preSupplier.buyPrice) {
                if (typeof ret.document.preSupplier.buyPrice === 'string') {
                    ret.document.preSupplier.buyPrice = ret.document.preSupplier.buyPrice.replace(',', '.');
                }
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(ret.document);
        }
    } catch(err) {
        console.error(err);
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }

};
