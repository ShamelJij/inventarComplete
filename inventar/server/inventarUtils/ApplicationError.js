/**
 * Created on 02.03.2022.
 */
let errorlist = require('../../config/errorlist.json');

class ApplicationError {
    /**
     * Example Error JSON Object:
     "10001": {
         "internalStatusCode": "10001",
         "httpStatusCode": 401,
         "error": "Unauthorized",
         "details": "Unauthorized, password can not be empty"
      },
     */

    //--------------------------------------------------------------------------------
    /**
     * @method constructo
     * @param {string} internalErrorCode errorcode of application errorlist
     * @param {Error} [err] Error object
     * @param {Object} [req] express request
     */
    constructor(internalErrorCode, err, req) {
        let consoleText;
        // convert to string
        internalErrorCode = internalErrorCode + '';
        if (errorlist[internalErrorCode]) {
            this._error = errorlist[internalErrorCode];
        } else {
            console.error('Error definition missing for internal errorcode ' +
                internalErrorCode);
            // create default error
            this._error.internalStatusCode = internalErrorCode;
            this._error.error              = 'Unknown Error';
            this._error.httpStatusCode     = 500;
            this._error.details            = 'no details available';
        }

        if (err && (err.details||err.message)) {
            this._error.details = `${this._error.details}; details: ${err.details||err.message}`;
        }

        consoleText = 'appError: ' + JSON.stringify(this._error, null, 2);

        if (err) {
            consoleText = consoleText + ' / Error: ' + JSON.stringify(err, null, 2);
        }

        if (req) {
            consoleText = consoleText + '\nREQUEST INFO:\n' +
                'Method: ' + req.method + '\n' +
                'Remote IP: ' + req.ip + '\n' +
                'URL: ' + req.originalUrl + '\n';

            if (req.method === 'POST' || req.method === 'PUT' || req.method === 'BATCH') {
                consoleText = consoleText + 'body: ' + JSON.stringify(req.body);
            }
            if (req.objUser) {
                // loginname
                consoleText = consoleText + '\nUser: ' + req.objUser.username();
            } else {
                consoleText = consoleText + '\nUser: unknown';
            }
        }

        if (err && err.appError) {
            // Application error
            console.warn(consoleText);
        } else {
            // unexpected error
            console.error(consoleText);
        }
    }

    //--------------------------------------------------------------------------------
    getHttpStatusCode() {
        return this._error.httpStatusCode;
    }

    //--------------------------------------------------------------------------------
    toJSON() {
        return this._error;
    }
}

module.exports = ApplicationError;