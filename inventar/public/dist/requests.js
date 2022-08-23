export class Requests {
  constructor() {
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
      xhr.responseType = "json";
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
   * @param {string} url
   */
  post(postObj, url) {
    let xhr = new XMLHttpRequest();
    let jsonPostObj = JSON.stringify(postObj);
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPostObj);

    xhr.onload = function () {
      if (xhr.status === 201) {
        console.log("Post successfully created!");
      } else if (xhr.status === 400) {
        console.log("400 (Bad Request)");
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * PUT /inventories or /persons or /locations
   *
   * @param {Object} postObj
   * @param {string} url
   */
  put(putObj, url) {
    let xhr = new XMLHttpRequest();
    let jsonPutObj = JSON.stringify(putObj);
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(jsonPutObj);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Put successfully done!");
        if (this.data === "inventory") {
          initPerson();
        }
      } else if (xhr.status === 400) {
        console.log("invalid PUT REQUEST");
      } else if (xhr.status === 404) {
        console.log("not found");
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * DELETE /inventories/{id} or /persons/{id} or /locations/{id}
   *
   * @param url
   */
  del(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Delete successful!");
        //todo: change it to initPage();
        initPerson();
      } else if (xhr.status === 404) {
        alert("not found");
        //todo: change it to initPage();
        initPerson();
      }
    };
  }

  //--------------------------------------------------------------------------------
  /**
   * GET /inventoreis or /persons or /locations
   * @param {string}
   * @return {Array.<Objects>}
   */
  async getAll(items) {
    return this.sendHTTPRequest("GET", "http://localhost:8080/v1/" + items);
  }

  //--------------------------------------------------------------------------------
  /**
   * GET /inventories/id or /persons/id or /locations/id
   * @param {string} url id
   * @param {string} items /inventories or /persons or /locations
   * @return {string} JSON
   */
  async getById(items, url) {
    return this.sendHTTPRequest(
      "GET",
      "http://localhost:8080/v1/" + items + "/" + url
    );
  }
}
