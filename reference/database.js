//datenbank aufbau
/*
{"counter": zahl,
"body":[{...},
        {...},
        {...},
            ]

}
 */

class Database {
    #_db = '';

    constructor(dbname) {
        this.#_db = dbname;
        //  stored-obj found?
        let item = localStorage.getItem(this.#_db);
        if (!item || item.length == 0) {
            //  wenn nicht dann neu erstellen
            //      obj = {"counter": 0,
            //             "body": []
            //             }
            let item = {
                "counter": 0,
                "body": []
            };
            //      localstorage initialization und obj speichern
            localStorage.setItem(this.#_db, JSON.stringify(item));
        } else {
            //  wenn ja dann ok
        }
    }

    getAll() {
        let items = JSON.parse(localStorage.getItem(this.#_db));
        return items.body;
    }

    get(id) {
        // todo: item mit id(in body ist) von localstorage
    }

    #getNewId() {
        let item = JSON.parse(localStorage.getItem(this.#_db));
        let id = item.counter;
        (item.counter)++;
        localStorage.setItem(this.#_db, JSON.stringify(item));
        return id;
    }

    save(id, body) {
        //wenn id leer dann 4
        let isNew = false;
        if (!id) {
            //id ist gleich getNewId aufrufen
            id = this.#getNewId();
            isNew = true;
        } else {

            //sonst wenn id nicht existiert return false
        }
        //datenBank auslesen
        let item = JSON.parse(localStorage.getItem(this.#_db));
        //body_id ist gleich id
        body._id = id;
        if (isNew) {
            item.body.push(body);
        } else {
            //wenn existiert. item mit dem id ermittelen dann überschreiben
            // todo: id ermittelen und überschreiben
        }
        localStorage.setItem(this.#_db, JSON.stringify(item));
        //das ganze speichern in localstorage

        //

        /*      let items = localStorage.getItem(this.#_db);
              let found_obj = items.find(element => element.id == id);
              let found_obj_index = items.indexOf(found_obj);
              if (id == '' || !found_obj){
                  //counter for itemID
                  let personItemID = localStorage.getItem('personCounter');
                  if (personItemID === null) {
                      personItemID = 0;
                  } else {
                      personItemID++;
                  }
                  localStorage.setItem("personCounter", personItemID);
                  personItem.personItemID = personItemID;
                  // wenn:  Personenliste == leer
                  // note(text):flag.. or tooltip wird and hidden div mit hinweiß
                  //error handling
                  if (!personList || personList.length == 0) {
                      personList = []; // [personItem];
                      personList.push(personItem);
                  }
                  // sonst: neue Reihe zufügen für jeden Eintrag
                  else {
                      console.log('building a new row');
                      //insertNewRecord(personList);
                      personList.push(personItem);
                  }
              } else {
                  if(found_obj){
                      personItem.personItemID = personID;
                      personList[found_obj_index] = personItem;
                  }
              }



              localStorage.setItem("personList", JSON.stringify(personList));
              //eingabe validierung
              //Localstorage auslesen
              //push auf die Liste und nicht neu erstellen
              //die Liste ist am besten sortiert (array) nach name
              // in localstorage speichern
              //Tsbelle aktualiesieren
              initPerson();
              hidePerson();
          }else {
          console.log('saveperson in not starting because valid is not valid');
      }*/
    }

    delete(id) {
        //todo: element mit id löchen
    }
}
let d = new Database("montag");
d.save(null,{ "name": "tim", "time": Date.now()});
let arr = d.getAll();
console.log(arr);