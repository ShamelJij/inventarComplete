/**
 * Created on 16.03.2022.
 */
/**
 * route handler inventories
 */
'use strict';

//################################################################################
/**
 * require section
 */
let Inventory   = require('../server/inventories/Inventory');
let Inventories  = require('../server/inventories/Inventories');
let AppError  = require('../server/inventarUtils/ApplicationError');
let lodash    = require('lodash');



//################################################################################
/**
 * routes section
 */

//--------------------------------------------------------------------------------
/**
 * POST /inventories
 *
 * @param req
 * @param res
 */
module.exports.addInventory = async function addInventory (req, res) {
    console.log('(POST) body: ' + JSON.stringify(req.body));

    try {
        let inventory = new Inventory("");

        await inventory.createnew(req.body,"anonym");

        let ret = { "url": inventory.getRessource(),
                    "data": inventory.document};
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
 * PUT /inventories/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.updateInventory = async function updateInventory (req, res) {
    console.log(' (PUT) id: ' +  req.swagger.params.id.value);

    try {

        let inventory = await Inventories.getById( req.swagger.params.id.value );

        await inventory.update(req.body, "anonym");
        let ret = { "data": inventory.document };

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
 * DELETE /inventories/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.deleteInventory = async function deleteInventory(req, res) {
    console.log(' (DELETE) id: ' +  req.swagger.params.id.value);
    let objInventory = await Inventories.getById( req.swagger.params.id.value );
    if (objInventory.document.deleted){
        console.log('(---------------------DELETED --------------------');
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(404);
    } else {
        try {
            await objInventory.update(objInventory.document, "testNamez", true);
            res.setHeader('Content-Type', 'application/json');
            res.sendStatus(200);
        } catch (err) {
            console.log('error: ' + JSON.stringify( err ));
            let appErr = new AppError(err.appError || '10500', err, req);
            res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
        }
    }

};

//--------------------------------------------------------------------------------
/**
 * GET /inventories
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getInventories = async function getInventories(req, res) {

    console.log('(GET) all Inventories:  ');

    try {
        let limit = req.query.limit;
        let offset = req.query.offset;
        let desc = req.query.desc;
        // ids parameter available?
        let ret;
        // get all inventories
        ret = await Inventories.getAll(limit,offset,desc);


        res.statusCode    = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(ret);

        console.log('§§§§§§§§', ret.map(a => a.label + ' ' + a.inventorytype));

    } catch (err) {
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }

};

//--------------------------------------------------------------------------------
/**
 * GET /inventories/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getInventoryById = async function getInventoryById (req, res) {


    try {
        let ret = await Inventories.getById(req.swagger.params.id.value);
        console.log(JSON.stringify(ret.document));
        // this user should not have access to
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(ret.document);
    } catch(err) {
        console.error(err);
        let appErr = new AppError(err.appError || '10500', err, req);
        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
    }
};