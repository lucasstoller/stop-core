const clientMysql = require('./../../../../../../modules/db-adapters').mysql;
const sequelize = require('sequelize');
const Op = sequelize.Op;

const getPartida = () => clientMysql.partida.findAll();

const getPartidaById = (partidaId) => {
    return clientMysql.partida.findById(partidaId);
}

const getTemaById = (temaId) => {
    return clientMysql.themes.findById(temaId);
}

const getUsuariosXPartida = (partidaId) => {
    return clientMysql.partida_x_usuario.findAll({
        where: {
            partida_id: partidaId, 
        }
    });
}

const getPalavraByPalavra = (palavra) => {
    return clientMysql.words.findOne({
        where: {
            text: palavra, 
        }
    });
}

const getPalavraIdPorTemaId = (palavraId, temaId) => {
    return clientMysql.theme_word.findOne({
        where: {
            theme_id: temaId,
            word_id: palavraId, 
        }
    });
}

const getUsuarioXPartida = (usuarioId, partidaId) => {
    return clientMysql.partida_x_usuario.findOne({
        where: {
            usuario_id: usuarioId,
            partida_id: partidaId, 
        }
    });
}
const createUsuarioXPartida = (usuarioId, partidaId) => {
    return clientMysql.partida_x_usuario.create({
        usuario_id: usuarioId,
        partida_id: partidaId,
    });
}

const adicionaPalavrasRodada1 = (params) => {
    return clientMysql.partida_x_usuario.update({
            palavra1: params.palavra1,
            palavra2: params.palavra2,
            palavra3: params.palavra3,
            palavra4: params.palavra4,
    }, {
        where: {
            usuario_id: params.usuarioId,
            partida_id: params.partidaId,
        }
    });
}

const stop = (partidaId) => {
    return clientMysql.partida.update({
            rodada: sequelize.literal('rodada + 1'),
    }, {
        where: {
            id: partidaId,
        }
    });
}

const adicionaPalavrasRodada2 = (params) => {
    return clientMysql.partida_x_usuario.update({
            palavra5: params.palavra1,
            palavra6: params.palavra2,
            palavra7: params.palavra3,
            palavra8: params.palavra4,
    }, {
        where: {
            usuario_id: params.usuarioId,
            partida_id: params.partidaId,
        }
    });
}

const adicionaPalavrasRodada3 = (params) => {
    return clientMysql.partida_x_usuario.update({
            palavra9: params.palavra1,
            palavra10: params.palavra2,
            palavra11: params.palavra3,
            palavra12: params.palavra4,
    }, {
        where: {
            usuario_id: params.usuarioId,
            partida_id: params.partidaId,
        }
    });
}

const getPalavraRepetidaNaRodada = (obj, usuarioId, partidaId) => {
    console.log('OBSERVE', obj, partidaId, usuarioId);
    return clientMysql.partida_x_usuario.findOne({
        where: {
            ...obj,
            partida_id: partidaId,
            usuario_id: {
                $not: usuarioId
            }
        }
    });
}

const adicionaPalavrasRodada4 = (params) => {
    return clientMysql.partida_x_usuario.update({
            palavra13: params.palavra1,
            palavra14: params.palavra2,
            palavra15: params.palavra3,
            palavra16: params.palavra4,
    }, {
        where: {
            usuario_id: params.usuarioId,
            partida_id: params.partidaId,
        }
    });
}



module.exports = {
    getPartida,
    getPartidaById,
    getUsuarioXPartida,
    createUsuarioXPartida,
    adicionaPalavrasRodada1,
    adicionaPalavrasRodada2,
    stop,
    adicionaPalavrasRodada3,
    adicionaPalavrasRodada4,
    getUsuariosXPartida,
    getPalavraByPalavra,
    getPalavraIdPorTemaId,
    getPalavraRepetidaNaRodada,
    getTemaById,
};
