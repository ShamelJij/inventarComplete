export class Requests {
  db = '';
  constructor(db) {
    this.db = db;
  }

  //################################################################################
  /**
   * @param {string} method POST/PUT/DELETE/GET
   * @param {string} url
   */
  sendHTTPRequest(method, url) {
    let promise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (xhr.status != 200) {
          // analyze HTTP status of the response
          alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else {
          // show the result
          console.log(`Done, got ${xhr.response.length} bytes`); // response is the server response
          resolve(xhr.response);
        }
      };
      xhr.send();
    });
    return promise;
  }

  //################################################################################
  //routes section

  //--------------------------------------------------------------------------------
  /**
   * POST inventories/persons/locations
   *
   * @param {Object} postObj
   */
  post(postObj) {
    let xhr = new XMLHttpRequest();
    let jsonPostObj = JSON.stringify(postObj);
    xhr.open('POST', 'http://localhost:8080/v1/' + this.db + '/', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(jsonPostObj);

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log('Post successfully created!');
      } else if (xhr.status === 400) {
        console.log('400 (Bad Request)');
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * PUT /inventories or /persons or /locations
   *
   * @param {Object} postObj
   * @param {string} id
   */
  put(putObj, id) {
    let xhr = new XMLHttpRequest();
    let jsonPutObj = JSON.stringify(putObj);
    xhr.open('PUT', 'http://localhost:8080/v1/' + this.db + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(jsonPutObj);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Put successfully done!');
        if (this.data === 'inventory') {
          initPerson();
        }
      } else if (xhr.status === 400) {
        console.log('invalid PUT REQUEST');
      } else if (xhr.status === 404) {
        console.log('not found');
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * DELETE /inventories/{id} or /persons/{id} or /locations/{id}
   * db are inventories or persons or locations
   * @param db
   */
  del(id) {
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8080/v1/' + this.db + '/' + id, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Delete successful!');
        //todo: change it to initPage();
        initPerson();
      } else if (xhr.status === 404) {
        alert('not found');
        //todo: change it to initPage();
        initPerson();
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * GET /inventories or /persons or /locations
   * @return {Array.<Objects>}
   */
  async getAll() {
    return this.sendHTTPRequest('GET', 'http://localhost:8080/v1/' + this.db);
  }

  //--------------------------------------------------------------------------------
  /**
   * GET /inventories/id or /persons/id or /locations/id
   * @param {string} id
   * @return {string} JSON
   */
  async getById(id) {
    return this.sendHTTPRequest(
      'GET',
      'http://localhost:8080/v1/' + this.db + '/' + id
    );
  }
}
