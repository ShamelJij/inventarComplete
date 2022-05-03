/**
 * Created on 16.03.2022.
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
const Locaitons = require("../server/locations/Locations");
const Locations = require("../server/locations/Locations");
const Locations = require("../server/locations/Locations");



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

        let location = await Locations.getById( req.swagger.params.id.value );

        await location.update(req.body, "anonym");
        let ret = { "data": location.document }
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
    console.log(' (DELETE) id: ' +  req.swagger.params.id.value);

    let objLocation = await Locations.getById( req.swagger.params.id.value );

    if (objLocation.document.deleted){
        console.log('(---------------------DELETED --------------------');
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(404);
    } else {
        try {
            await objLocation.update(objLocation.document, "testNamez", true);
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
 * GET /locations
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
module.exports.getLocations = async function getLocations(req, res) {

    console.log('(GET) all Locations:  ');

    try {
        let limit = req.query.limit;
        let offset = req.query.offset;
        let desc = req.query.desc;
        // ids parameter available?
        let ret;
        // get all locations
        ret = await Locations.getAll(limit,offset,desc);


        res.statusCode    = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(ret);


        //console.log('§§§§§§§',ret.filter(a => a.value.lastname).map(a => a.value._id));
        console.log('§§§§§§§§', ret.map(a => a.locationlabel + ' ' + a.locationname));

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
        let ret = await Locations.getById(req.swagger.params.id.value);
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
