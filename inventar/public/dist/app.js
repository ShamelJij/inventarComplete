class Req{
    constructor(method, url) {
        this.method = method;
        this.url = url;
    }

    //################################################################################
    /**
     * @param {string} method
     * @param {string} url
     */
    sendReq(method, url) {
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
            xhr.           send();
        });
        return promise;
    }


}



