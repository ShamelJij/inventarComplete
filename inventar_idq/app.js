'use strict';

/**
 * create and configure express module (middleware)
 */
let express = require('express');        // express web module
const nocache = require('nocache');
const path  = require('path');
let favicon = require('serve-favicon');
let logger  = require('morgan');           // logger middleware
const cors  = require('cors'); // enable CORS with various options
// var logger = require('winston');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');  // body-parsing will create a 'req.body' object
let Users        = require('./server/users/Users');
let lodash       = require('lodash');

// -------------- swagger ------------------
let swaggerTools  = require('swagger-tools');
let jsyaml        = require('js-yaml');
let fs            = require('fs');

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
let swaggerDoc = jsyaml.safeLoad(spec);
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

// -------------- multer ------------------
let multer                = require('multer'); // this is body parser for form-data with files
let mkdirp                = require('mkdirp');
const forbiddenMimeTypes  = ['octet-stream', 'x-msdos-program', 'x-msdownload', 'x-httpd-php', 'x-macbinary', 'x-sh', 'mpeg', 'quicktime', 'x-msvideo'];
const forbiddenExtensions = ['exe', 'bat', 'sh', 'msi', 'com', 'app', 'cmd', 'cpl', 'inf', 'jse', 'osx', 'paf', 'reg', 'rgs', 'ws', 'wsf'];
const uploadsDir          = path.join(__dirname, 'public', 'dist', 'uploads');
const fileStorage         = multer.diskStorage({

    destination: function(req, file, cb) {
        let folder;
        if (req.body.id && req.body.type) {
            folder = uploadsDir + '/' + req.body.type + '/' + req.body.id + '/' + file.fieldname;
            try {
                mkdirp.sync(folder);
                cb(null, folder);
            } catch (err) {
                cb(new Error(`Cannot create folder: "${folder}"!`));
            }
        } else {
            cb(new Error('No document ID received - cannot save file!'));
        }

    },
    filename: function(req, file, cb) {
        if (req.body.id) {
            cb(null, file.originalname);
        } else {
            cb(new Error('No document ID!'));
        }
    },
});
let upload                = multer({
    storage: fileStorage,
    fileFilter: function(req, file, cb) {
        const type    = file.mimetype.split('/')[1];
        const lastDot = file.originalname.lastIndexOf('.') + 1;
        const ext     = (lastDot) ? file.originalname.slice(lastDot).toLowerCase() : '';
        if (forbiddenMimeTypes.indexOf(type) !== -1 || forbiddenExtensions.indexOf(ext) !== -1) {
            return cb('forbidden file type!', false);
        }
        cb(null, true);
    },
});
// -------------- end of multer ------------------

let Session  = require('./server/bhUtils/Session');
let AppError = require('./server/bhUtils/ApplicationError');

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

//--- jwt ------------------------------------------------------------------------
// authenticate
app.all('/v1/authenticate', function(req, res) {

    (async () => {
        try {
            if (lodash.isEmpty(req.body)) {
                let appErr = new AppError('10000', null, req);
                res.status(appErr.getHttpStatusCode()).
                json(appErr.toJSON()).
                end();
                return;
            }
            if (!req.body.hasOwnProperty('loginName')) {
                let appErr = new AppError('10000', null, req);
                res.status(appErr.getHttpStatusCode()).send(appErr.toJSON())
                return;
            }
            let loginname =  req.body.loginName.toLowerCase();

            console.log('login request for: ' + loginname);

            let token = await Session.authenticate(loginname, req.body.password, req.body.domain);

            res.status(200).json({
                success: true,
                message: 'serve new token',
                token: token,
            }).end();
        } catch (err) {
            console.log('error: ' + JSON.stringify(err));
            if (err instanceof AppError) {
                res.status(err.getHttpStatusCode()).json(err.toJSON()).end();
            } else {
                let appErr = new AppError('10015', null, req);
                res.status(appErr.getHttpStatusCode()).
                json(appErr.toJSON()).
                end();
            }
        }
    })();
});

//--- uploads---------------------------------------------------------------------
// product uploads
const uploadFields = [
    {name: 'img', maxCount: 5},
    {name: 'docs', maxCount: 5},
];

app.post('/idqfiles', upload.fields(uploadFields), function(req, res) {
    if (req.files) {
        lodash.each(req.files, (filesArray) => {
            lodash.each(filesArray, (file) => console.dir(`field: ${file.fieldname}, type: ${file.mimetype}, size: ${file.size}, name: ${file.originalname}`));
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(req.files).end();
    }
    res.end('no files uploaded.');
});

app.use( function( req, res, next) {
    // prevent caching: https://stackoverflow.com/questions/49547/how-do-we-control-web-page-caching-across-all-browsers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', '0'); // Proxies.
    return next();
});

//--- validate access ------------------------------------------------------------
// protected route - check token
app.all('/v1/*', async function(req, res, next) {
    try {
        let token = req.header('x-access-token') || req.body.x_access_token || req.query.x_access_token;

        if (token === '38D46BF5E8F08834852564B500129B2C2CFD21847D170948C125831D0043704A') {
            // API Key
            let user = await Users.getUserById( 'idqmailbox' );

            if (user) {
                req.objUser = user;
                next();
            } else {
                let appErr = new AppError('10002', null, req);
                res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
            }
        } else {
            if (token) {
                // verify token
                let decoded = Session.authorised(token);
                if (decoded instanceof AppError) {
                    res.status(decoded.getHttpStatusCode()).send(decoded.toJSON());
                } else {
                    if (!decoded.sAMAccountName) {
                        let appErr = new AppError('10002', null, req);
                        res.status(appErr.getHttpStatusCode()).send(appErr.toJSON());
                        return;
                    }
                    let user = await Users.getUserById(decoded.sAMAccountName);

                    if (user) {
                        req.objUser = user;
                        req.objUser.basic = decoded.basic;
                        next();
                    } else {
                        let appErr = new AppError('10002', null, req);
                        res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
                    }
                }
            } else if (req.url === '/v1/settings/options/DE-de' || req.url === '/v1/version') {
                // make options and version routes available for anonymous users
                next();
            } else {
                let appErr = new AppError('10002', null, req);
                res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
            }
        }
    } catch (err) {
        console.log('error: ' + JSON.stringify(err));
        if (err instanceof AppError) {
            res.status(err.getHttpStatusCode()).json(err.toJSON()).end();
        } else {
            let appErr;
            if (err.appError) {
                appErr = new AppError(err.appError, err, req);
            } else {
                appErr = new AppError('10002', err, req);
            }
            res.status(appErr.getHttpStatusCode()).json(appErr.toJSON()).end();
        }
    }
});

module.exports = app;