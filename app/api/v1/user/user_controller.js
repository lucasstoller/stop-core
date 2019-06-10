const BaseController = require('../../../base/base_controller');
const HandleResponse = require('../../../utils/handle_response');
const UserValidator = require('./user_validator');
const UserBusiness = require('./user_business');
const I18n = require('../../../i18n');

class UserController extends BaseController {
    constructor() {
        super();
        this.userValidator = UserValidator;
        this.userBusiness = new UserBusiness();
        this.handleResponse = HandleResponse;
        this.i18n = I18n;
    }

    statusPartida(req, res, next) {
        console.log(req.body);
        // if (!this.userValidator.isValidGetStatusPartida(req.body)) { return next(this.handleResponse.unprocessableEntity(this.i18n.__('Required'))); }
    

        return this.userBusiness.getStatusPartida(req.body)
            .then((result) => {
                res.json({
                    data: result,
                });
            });
    }

    getPontos(req, res, next) {
        if (!this.userValidator.isValidGetPontosId(req.query)) { return next(this.handleResponse.unprocessableEntity(this.i18n.__('Required'))); }


        return this.userBusiness.getPontos(req.query.partidaId)
            .then((result) => {
                res.json({
                    data: result,
                });
            });
    }

    stop(req, res, next) {
        if (!this.userValidator.isValidGetPontosId(req.query)) { return next(this.handleResponse.unprocessableEntity(this.i18n.__('Required'))); }


        return this.userBusiness.stop(req.query.partidaId)
            .then((result) => {
                res.json({
                    data: result,
                });
            });
    }

    getTemas(req, res, next) {
        if (!this.userValidator.isValidGetPontosId(req.query)) { return next(this.handleResponse.unprocessableEntity(this.i18n.__('Required'))); }


        return this.userBusiness.getTemas(req.query.partidaId)
            .then((result) => {
                res.json({
                    data: result,
                });
            });
    }

    getUsers(req, res, next) {
        if (!this.userValidator.isValidParamsGetUser(req.body)) { return next(this.handleResponse.unprocessableEntity(this.i18n.__('Required'))); }

        return this.userBusiness.getUsers()
            .then((result) => {
                res.json({
                    data: result,
                });
            }).catch((error) => {
                next(error);
            });
    }
}

module.exports = UserController;
