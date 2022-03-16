'use strict';

/**
 * create and configure express module (middleware)
 */
let express = require('express');        // express web module
const nocache = require('nocache'); // for requests not to cache them aside
const path  = require('path');
let favicon = require('serve-favicon');
let logger  = require('morgan');           // logger middleware
const cors  = require('cors'); // enable CORS with various options
// var logger = require('winston');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');  // body-parsing will create a 'req.body' object
let lodash       = require('lodash');

// -------------- swagger ------------------
let swaggerTools  = require('swagger-tools');
let jsyaml        = require('js-yaml');
let fs            = require('fs');// for local festplatte

let curDir   = path.dirname(__filename);
let filename = path.resolve( curDir, './router_controllers');

// swaggerRouter configuration
let swaggerRouterOptions = {
    swaggerUi: '/public/swagger.json',
    controllers: filename, // __dirname + '/../router_controllers',
    useStubs: false
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)

filename = path.resolve( curDir, './public/swagger/docs/swagger.yaml');
let spec       = fs.readFileSync( filename, 'utf8');
let swaggerDoc = jsyaml.safeLoad(spec); // to google later!
// save global - schema validation was used in every class
global.swaggerDoc = swaggerDoc;
global.projectName = require('./package.json').name;
global.projectVersion = require('./package.json').version;
global.projectReleaseDate = require('./package.json').releaseDate;
global.projectAuthor = require('./package.json').author;
global.projectLicense = require('./package.json').license;

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Security Swagger requests
    // app.use(middleware.swaggerSecurity({
    // }));

    // Validate Swagger requests - wird nicht verwendet
    // app.use(middleware.swaggerValidator());
    // Swagger Validation Error?
    // app.use(errorHandler);
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(swaggerRouterOptions));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

})

let AppError = require('./server/inventarUtils/ApplicationError');

//--- express ---------------------------------------------------------------------
let app = express();                         // using express

//--- cors ------------------------------------------------------------------------
let corsOptions = {
    // credentials: true,
    origin: function(origin, callback) {
        if (origin === undefined) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    },
};

app.use(cors(corsOptions));

// view engine setup *** not used frontend is angular driven ***
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//--- log ------------------------------------------------------------------------
// extend console object to prepend the file and line number
require('debug-trace')({
    always: true,
});

console.format = function(c) {
    return `${c.getDate()}:[${c.filename}:${c.getLineNumber()}:${c.getFunctionName()}]`;
};

app.use(logger('dev'));

//--- helmet ---------------------------------------------------------------------
const helmet = require('helmet'); // secure express app by setting various HTTP headers
app.use(helmet());

//--- bodyParser -----------------------------------------------------------------
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({extended: false}));

//--- cookieParser----------------------------------------------------------------
app.use(cookieParser());

//--- express.static -------------------------------------------------------------
// static files
app.use(nocache());
app.use(express.static(path.join(__dirname, 'public', 'dist'),
    {'maxAge': 30 * 86400000})); //set 30 days

//--- favicon --------------------------------------------------------------------
// app.use(favicon('./public/img/favicon.ico'));

app.use( function( req, res, next) {
    // prevent caching: https://stackoverflow.com/questions/49547/how-do-we-control-web-page-caching-across-all-browsers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', '0'); // Proxies.
    return next();
});

module.exports = app;