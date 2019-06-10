const _ = require('lodash');

class UserValidator {
    static isValidGetStatusPartida(params) {
        if(!_.isEmpty(params.partidaId) && 
        !_.isEmpty(params.usuarioId) &&
        !_.isEmpty(params.palavra1) &&
        !_.isEmpty(params.palavra2) &&
        !_.isEmpty(params.palavra3) &&
        !_.isEmpty(params.palavra4) &&
        !_.isEmpty(params.rodada)
        ) {
            return true;
        }

        return false;
    }

    static isValidGetPontosId(params) {
        if(!_.isEmpty(params.partidaId)
        ) {
            return true;
        }

        return false;
    }
}

module.exports = UserValidator;
