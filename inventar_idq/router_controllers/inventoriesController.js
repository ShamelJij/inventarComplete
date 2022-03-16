/**
 * Created by Carsten Pogede on 24.07.2017.
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
let AppError  = require('../server/inventoryUtils/ApplicationError');
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
        //let ret = { "response": "Inventory created! (function addInventory)" };
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
        let ret = { "response": "Inventory updated!" + req.swagger.params.id.value + " (function addInventory)" };
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
    console.log(' (DELETE) id: ' +  req.swagger.params.inventoryId.value);

    try {
        let objInventory = await Inventories.getByUnid( req.swagger.params.inventoryId.value );

        if (objInventory.hasWriteAccess( req.objUser.getRoles() )) {
            let userName = req.objUser.username();

            await objInventory.update(objInventory.document, userName, true);

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
 * GET /inventories
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getInventories = async function getInventories(req, res) {
    console.log('(GET) ');

    try {
        // ids parameter available?
        let ret;
        if (req.swagger.params.ids && req.swagger.params.ids.value) {
            // select only requested inventories
            ret = await Inventories.getByUnids( req.swagger.params.ids.value );
        } else {
            // get all inventories
            ret = await Inventories.getAll(false, true);
        }

        if (ret.inventories) {
            let fields;
            if (req.swagger.params.fields && req.swagger.params.fields.value) {
                fields = req.swagger.params.fields.value;
                fields.push('_id');
                fields = lodash.uniq(fields);
            }

            ret.inventories = ret.inventories.map( function( inventory ) {
                // if fields available shrink content
                if (fields) {
                    return lodash.pick(inventory, fields);
                } else {
                    return inventory;
                }
            });

            if (req.swagger.params.sortby && req.swagger.params.sortby.value) {
                let sortby = req.swagger.params.sortby.value;
                let desc   = (req.swagger.params.desc.value && req.swagger.params.desc.value !== 'false') ? 'desc' : 'asc';
                ret.inventories = lodash.orderBy( ret.inventories, [sortby], [desc]);
            }
        }

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
 * GET /inventories/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getInventoryById = async function getInventoryById (req, res) {
    // console.log(' (GET) path: ' + req.swagger.params.inventoryId.value);

    try {
        let ret = await Inventories.getByUnid(req.swagger.params.inventoryId.value);
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