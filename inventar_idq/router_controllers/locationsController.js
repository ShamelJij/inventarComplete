/**
 * Created by Carsten Pogede on 24.07.2017.
 */
/**
 * route handler locations
 */
'use strict';

//################################################################################
/**
 * require section
 */
let Location   = require('../server/locations/Location');
let Locations  = require('../server/locations/Locations');
let AppError  = require('../server/inventarUtils/ApplicationError');
let lodash    = require('lodash');



//################################################################################
/**
 * routes section
 */

//--------------------------------------------------------------------------------
/**
 * POST /locations
 *
 * @param req
 * @param res
 */
module.exports.addLocation = async function addLocation (req, res) {
    console.log('(POST) body: ' + JSON.stringify(req.body));

    try {
        let location = new Location("");
        await location.createnew(req.body,"anonym");
        //let ret = { "response": "Location created! (function addLocation)" };
        let ret = { "url": location.getRessource(),
            "data": location.document};
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
 * PUT /locations/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.updateLocation = async function updateLocation (req, res) {
    console.log(' (PUT) id: ' +  req.swagger.params.id.value);

    try {
        let ret = { "response": "Location updated!" + req.swagger.params.id.value + " (function addLocation)" };
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
 * DELETE /locations/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.deleteLocation = async function deleteLocation(req, res) {
    console.log(' (DELETE) id: ' +  req.swagger.params.locationId.value);

    try {
        let objLocation = await Locations.getByUnid( req.swagger.params.locationId.value );

        if (objLocation.hasWriteAccess( req.objUser.getRoles() )) {
            let userName = req.objUser.username();

            await objLocation.update(objLocation.document, userName, true);

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
 * GET /locations
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getLocations = async function getLocations(req, res) {
    console.log('(GET) ');

    try {
        // ids parameter available?
        let ret;
        if (req.swagger.params.ids && req.swagger.params.ids.value) {
            // select only requested locations
            ret = await Locations.getByUnids( req.swagger.params.ids.value );
        } else {
            // get all locations
            ret = await Locations.getAll(false, true);
        }

        if (ret.locations) {
            let fields;
            if (req.swagger.params.fields && req.swagger.params.fields.value) {
                fields = req.swagger.params.fields.value;
                fields.push('_id');
                fields = lodash.uniq(fields);
            }

            ret.locations = ret.locations.map( function( location ) {
                // if fields available shrink content
                if (fields) {
                    return lodash.pick(location, fields);
                } else {
                    return location;
                }
            });

            if (req.swagger.params.sortby && req.swagger.params.sortby.value) {
                let sortby = req.swagger.params.sortby.value;
                let desc   = (req.swagger.params.desc.value && req.swagger.params.desc.value !== 'false') ? 'desc' : 'asc';
                ret.locations = lodash.orderBy( ret.locations, [sortby], [desc]);
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
 * GET /locations/{id}
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getLocationById = async function getLocationById (req, res) {
    // console.log(' (GET) path: ' + req.swagger.params.locationId.value);

    try {
        let ret = await Locations.getByUnid(req.swagger.params.locationId.value);
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
