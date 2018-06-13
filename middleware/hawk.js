const Hawk = require('hawk');
const credentials = require('../lib/lenddoCredentials');
const isProductionEnv = require('lib/isProductionEnv');

const hawkMiddleware = (req, res, next) => {

    if(!isSecurityEnabled()) {
        next();
    }
    else {
        let request = getRequestForHawk(req);

        Hawk.server
            .authenticate(request, credentials)
            .then((auth) => {

                const payload = 'accepted';
                const headers = {'Content-Type': 'text/plain'};

                // Generate Server-Authorization response header
                const header = Hawk.server.header(
                    auth.credentials,
                    auth.artifacts, {
                        payload,
                        contentType: headers['Content-Type']
                    });
                headers['Server-Authorization'] = header;

                res.set(headers);//set the response headers for the future response.

                next();
            })
            .catch((err) => {
                res.status(401).send(isProductionEnv ? undefined : err);
            });
    }
};

const getRequestForHawk = (nodeRequest) => {
    let hawkRequest = {
        method: nodeRequest.method,
        url: nodeRequest.originalUrl,
        headers: nodeRequest.headers,
        port: nodeRequest.port,
        host: nodeRequest.hostname
    };

    return hawkRequest;
};

const isSecurityEnabled = () => {
    return process.env.HAWK_ENABLED || true;
};

module.exports = hawkMiddleware;