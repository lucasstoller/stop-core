const _ = require('lodash');

class BaseService {
    static formatOptionsRequest({ token, url, data }) {
        return {
            url,
            headers: {
                'x-access-token': token,
            },
            json: data,
        };
    }

    static hasError(error, response) {
        return error ||
        response.statusCode === 502 ||
        response.statusCode === 500 ||
        response.statusCode > 400;
    }

    static isValid(response) {
        return response.statusCode === 200 ||
        response.statusCode === 201;
    }

    static formatError(response) {
        const error = new Error();
        error.status = response.statusCode || 400;
        error.message = _.get(response, 'error.message') || 'Bad request';

        return error;
    }

    static formatResponse(response) {
        let responseBody = response;

        if (!_.isObject(response)) {
            responseBody = JSON.parse(response);
        }

        return responseBody;
    }
}

module.exports = BaseService;
