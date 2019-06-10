const _ = require('lodash');
const TokenService = require('./../utils/token');
const RoutesFree = require('./../constants/free_routes');
const ConstantsStatus = require('./../constants/http-status');

const token = TokenService;

function isRoutesWithPermission(method, url) {
    let urlCustom = url;
    if (method === 'GET' && _.size(url.split('?')) > 0) {
        urlCustom = url.split('?')[0];
    }

    const searchRoute = _.filter(RoutesFree, route => route.url === urlCustom && route.method === method);

    return searchRoute.length > 0;
}

module.exports = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        let paramRequest;
        paramRequest = _.size(req.body) > 0 ? req.body : false;
        paramRequest = _.size(req.params) > 0 ? req.params : false;
        paramRequest = _.size(req.query) > 0 ? req.query : false;

        console.info('======================= PARAMS REQUEST =======================  \n', paramRequest);
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

    const tokenRequest = req.headers['x-access-token'];
    req.token = tokenRequest;

    if (isRoutesWithPermission(req.method, req.url)) return next();
    if (req.method === 'OPTIONS') res.json({});

    return token.validToken(tokenRequest)
        .then((dataDecode) => {
            req.user = dataDecode;
            return next();
        })
        .catch((error) => {
            res.status(ConstantsStatus.unauthorized).json(error);
        });
};
