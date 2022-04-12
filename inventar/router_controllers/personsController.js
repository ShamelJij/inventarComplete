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

        //let person = new Person(req.swagger.params.id.value);
        let person = await Persons.getById( req.swagger.params.id.value );

        await person.update(req.body, "anonym");
        let ret = { "data": person.document };

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
    console.log(' (DELETE) id: ' +  req.swagger.params.id.value);

    try {
        let objPerson = await Persons.getById( req.swagger.params.id.value );

        /*if (objPerson.hasWriteAccess( req.objUser.getRoles() )) {
            let userName = req.objUser.username();*/

            await objPerson.update(objPerson.document, "testNamez", true);

            //let ret = { "deleted" };
            res.setHeader('Content-Type', 'application/json');
            res.sendStatus(200);

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
        let limit = req.query.limit;
        let offset = req.query.offset;
        let desc = req.query.desc;
        // ids parameter available?
        let ret;
        // get all persons
        ret = await Persons.getAll(limit,offset,desc);


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
        let ret = await Persons.getById(req.swagger.params.id.value);
        // console.log(JSON.stringify(ret.document));
            // this user should not have access to
            let newret = lodash.omit( ret.document, ['supplier.buyPrice', 'supplier.buyPriceCurr', 'preSupplier.buyPrice', 'preSupplier.buyPriceCurr'] );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(newret);
    } catch(err) {
        console.error(err);
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }

};
