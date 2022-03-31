/**
 * Funktion durchläuft alle Designelemente (json) im aktuellen Ordner
 * und prüft ob diese auch in der Datenbank vorhanden und aktuell sind.
 *
 * Fehlt ein Designelement in der Datenbank dann wird dieses angelegt
 *
 * Ist das Attribut "views" unterschiedlich dann wird je nach Umgebungsvariable
 * verfahren:
 *   - production: Das Designelement in der Datenbank wird aktualisiert
 *   - sonstige:   Der Server wird nicht gestartet, es wird ein entsprechender
 *                 Fehler ausgegeben
 *
 * @type {Database}
 */
let Database = require('../server/superclass/Database');
let fs       = require('fs');
let ld       = require('lodash');

let arDesign = [];

// --------------------------------------------------------------------------------
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}


// --------------------------------------------------------------------------------
class DesignDb extends Database {
    // --------------------------------------------------------------------------------
    constructor(strDbName) {
        super();

        this._dbName = strDbName;
        this._db     = this.couchDb.use(this._dbName);

        this.promisify();
    }

    // --------------------------------------------------------------------------------
    getDocumentByKey(key) {
        return super.getDocumentById(key);
    }

    // --------------------------------------------------------------------------------
    updateDocument(jsonDesign) {
        return super.update(jsonDesign, jsonDesign._id);
    }

    // --------------------------------------------------------------------------------
    createDocument(jsonDesign) {
        let id = jsonDesign._id;
        return super.save(jsonDesign, id);
    }
}

// --------------------------------------------------------------------------------
class CouchValidator {
    //--------------------------------------------------------------------------------
    constructor() {
        throw new Error('can not instantiate an abstract class');
    }

    //--------------------------------------------------------------------------------
    static async validateDesign(strDatabase) {
        try {
            let directory = __dirname + '/' + strDatabase;
            fs.readdirSync(directory).forEach(function(strFile) {
                if (strFile.substr(strFile.length - 4) === 'json') {
                    let tmp = fs.readFileSync(directory + '/' + strFile, 'utf8');
                    arDesign.push(JSON.parse(tmp));
                }
            });

            let designDb = new DesignDb(strDatabase);

            await asyncForEach(arDesign, async function(design) {

                try {
                    let doc = await designDb.getDocumentByKey(design._id);
                    if (doc.statusCode === 404) {
                        // Design Doc missing - create new
                        console.log('create: ' + design._id);
                        await designDb.createDocument(design);
                    } else {
                        // Design Doc exists - check view design
                        let obj1 = design.views;
                        let obj2 = doc.views;
                        if (ld.isEqual(obj1, obj2)) {
                            // perfect nothing to do
                            console.log('ok: ' + design._id);
                        } else {
                            if (process.env.NODE_ENV === 'playerProjekt') {
                                // update databasedesign
                                doc.views = design.views;
                                console.log('update: ' + design._id);
                                await designDb.updateDocument(doc);
                            } else {
                                // update databasedesign
                                doc.views = design.views;
                                // throw 'DIFFERENT VIEW DESIGN ! ' + design._id;
                                console.error('DIFFERENT VIEW DESIGN ! ' + design._id +
                                    '\n--> CouchDb: ' + JSON.stringify( obj1 ) +
                                    '\n--> Project: ' + JSON.stringify( obj2 ));
                                // await designDb.updateDocument(doc);
                            }
                        }
                    }
                } catch (err) {
                    console.error(' error:' + JSON.stringify(err));
                    throw 'Error validate couch db design ' + JSON.stringify(err);
                }
            });
        } catch (err) {
            console.error(' error:' + JSON.stringify(err));
            throw 'Error validate couch db design ' + JSON.stringify(err);
        }
    }
}

module.exports = CouchValidator;