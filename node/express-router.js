const url = require('url');
const Server = function () {

    const G = this;
    this._get = {};
    this._post = {};

    this.parseUrl = function (url) {
        if (!url.endsWith('/')) {
            url = url + '/';
        }
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return url;
    }


    const app = function (req, res) {

        let pathname = url.parse(req.url).pathname;

        pathname = parseUrl(pathname);

        let method = req.method.toLowerCase();
        console.log(method);
        
        if (G['_' + method][pathname]) {
            G['_' + method][pathname](req, res);
        }
        else {
            res.end('no rotuer');
        }
    }

    app.get = function (string, callback) {

        string = parseUrl(string);

        G._get[string] = callback;
    }

    app.post = function (string, callback) {

        string = parseUrl(string);

        G._post[string] = callback;
    }

    return app;
}

module.exports = Server();