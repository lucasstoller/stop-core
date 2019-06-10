const _ = require('lodash');
const caseConverter = require('case-converter');
const I18n = require('../../app/i18n');

class HandleResponse {
    static forbidden(message) {
        const errorMessage = message || 'Forbidden';
        return HandleResponse._errorReponse(403, errorMessage);
    }

    static notFound(message) {
        const errorMessage = message || 'Resource not found';
        return HandleResponse._errorReponse(404, errorMessage);
    }

    static unauthorized(message) {
        const errorMessage = message || 'Missing token or invalid token';
        return HandleResponse._errorReponse(401, errorMessage);
    }

    static unprocessableEntity(message) {
        const errorMessage = message || 'Invalid credentials or missing parameters';
        return HandleResponse._errorReponse(422, errorMessage);
    }

    static handleError(error) {
        let message = error.message || 'Undefined error';

        const errorList = _.get(error, 'errors');

        if (_.isEmpty(errorList) === false) {
            const errorMessageList = _.map(errorList, errorItem => errorItem.message || 'Undefined error');

            message = errorMessageList.toString();
        }

        const nameStatusMap = {
            SequelizeUniqueConstraintError: 409,
        };

        const status = nameStatusMap[error.name];

        return HandleResponse._errorReponse(status, message);
    }

    static _errorReponse(status, message) {
        const error = new Error();
        error.status = status || 400;
        error.message = message || 'Bad request';
        return error;
    }

    static success(data, message = 'Successful', additionalData = {}) {
        const defaultDataResponse = {
            data: caseConverter.toCamelCase(data),
            message: I18n.__(message),
        };

        const dataResponse = _.merge({}, defaultDataResponse, additionalData);

        return dataResponse;
    }
}

module.exports = HandleResponse;
