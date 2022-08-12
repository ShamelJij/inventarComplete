export class Req{
    constructor(method, url) {
        this.method = method;
        this.url = url;
    }

    //################################################################################
    /**
     * @param {string} method
     * @param {string} url
     */
    sendHTTPRequest (method, url) {
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method,url);
            xhr.responseType = 'json';
            xhr.onload = function() {
                if (xhr.status != 200) { // analyze HTTP status of the response
                    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                } else { // show the result
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
     * POST /persons
     *
     * @param {Object} postObj
     * @param {string} url
     */
    post(postObj,url) {
        let xhr = new XMLHttpRequest();
        let personData = JSON.stringify(postObj)
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.send(personData);

        xhr.onload = function () {
            if(xhr.status === 201) {
                console.log("Post successfully created!");
            } else if (xhr.status === 400){
                console.log('400 (Bad Request)');
            }
        }

    }

    //--------------------------------------------------------------------------------
    /**
     * PUT /persons
     *
     * @param {Object} postObj
     * @param {string} url
     */
    put(postObj,url) {
        let xhr = new XMLHttpRequest();
        let personData = JSON.stringify(postObj)
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.send(personData);

        xhr.onload = function () {
            if(xhr.status === 200) {
                console.log("Put successfully done!");
                initPerson();
            } else if (xhr.status === 400){
                console.log('invalid PUT REQUEST');
            } else if (xhr.status === 404){
                console.log('not found');
            }
        }

    }

    //--------------------------------------------------------------------------------
    /**
     * DELETE /persons/{id}
     *
     * @param url
     */
    del(url) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.send();

        xhr.onload = function () {
            if(xhr.status === 200) {
                console.log("Delete successful!");
                //todo: change it to initPage();
                initPerson();

            } else if (xhr.status === 404){
                alert('not found');
                //todo: change it to initPage();
                initPerson();
            }
        }

    }

    //--------------------------------------------------------------------------------
    /**
     * GET /persons
     * @param {string}
     * @return {Array.<Objects>}
     */
    async getAll(items) {
        return sendHTTPRequest('GET', 'http://localhost:8080/v1/' + items);
    }

    //--------------------------------------------------------------------------------
    /**
     * GET /persons/id
     * @param url
     * @param items
     * @return {<Objects>} personObject
     */
    async getById(items, url) {
        return sendHTTPRequest('GET', 'http://localhost:8080/v1/' + items + '/' + url);
    }

}