
const HandleResponse = require('../../../utils/handle_response');
const BaseBusiness = require('../../../base/business');
const userDao = require('./dao');
const I18n = require('../../../i18n');
const _ = require('lodash');

class UserBusiness extends BaseBusiness {
    constructor() {
        super();
        this.userDao = userDao;
        this.handleResponse = new HandleResponse();
        this.i18n = I18n;
    }

    getStatusPartida(requestParams) {
        let partidaData;
        let usuarioPartidaData;
        return new Promise((resolve, reject) => {
            return this.userDao.mysql.getPartidaById(requestParams.partidaId)
                .then((partidaBancoData) => {
                    partidaData = partidaBancoData;
                    if (_.isEmpty(requestParams.partidaId) ||
                        _.isEmpty(requestParams.usuarioId)
                    ) {
                        resolve(partidaData);
                        throw new Error('Nelson');
                    }
                    return this.userDao.mysql.getUsuarioXPartida(requestParams.usuarioId, requestParams.partidaId);
                })
                .then(async (usuarioPartidaBancoData) => {
                    if (usuarioPartidaBancoData) {
                        return usuarioPartidaBancoData;
                    }
                    return this.userDao.mysql.createUsuarioXPartida(requestParams.usuarioId, requestParams.partidaId);
                }).then((usuarioPartidaBancoData) => {
                    usuarioPartidaData = usuarioPartidaBancoData;
                    // Enviar palavras da partida
                    if (requestParams.rodada === '1') {
                        return this.userDao.mysql.adicionaPalavrasRodada1(requestParams);
                    } else if (requestParams.rodada === '2') {
                        return this.userDao.mysql.adicionaPalavrasRodada2(requestParams);
                    } else if (requestParams.rodada === '3') {
                        return this.userDao.mysql.adicionaPalavrasRodada3(requestParams);
                    } else if (requestParams.rodada === '4') {
                        return this.userDao.mysql.adicionaPalavrasRodada4(requestParams);
                    }
                    return reject(new Error('Potz bro, que rodada é essa que voce ta'));
                })
                .then(() => {
                    resolve(partidaData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getTemas(partidaId) {
        return new Promise((resolve, reject) => {
            this.userDao.mysql.getPartidaById(partidaId)
                .then(async (data) => {
                    if (data) {
                        const tema1 = await this.userDao.mysql.getTemaById(data.temaId1);
                        const tema2 = await this.userDao.mysql.getTemaById(data.temaId2);
                        const tema3 = await this.userDao.mysql.getTemaById(data.temaId3);
                        const tema4 = await this.userDao.mysql.getTemaById(data.temaId4);
                        resolve({
                            tema1: tema1.name,
                            tema2: tema2.name,
                            tema3: tema3.name,
                            tema4: tema4.name,
                        });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    stop(partidaId) {
        return this.userDao.mysql.stop(partidaId);
    }

    getPontos(partidaId) {
        let usuariosPartida;
        let partidaData;
        const usuarios_pontos = {};
        return new Promise((resolve, reject) => {
            this.userDao.mysql.getUsuariosXPartida(partidaId)
                .then((usuariosPartidaBanco) => {
                    // Verificar se é uma palavra valida
                    usuariosPartida = usuariosPartidaBanco;
                    return this.userDao.mysql.getPartidaById(partidaId);
                }).then(async (partidaBancoData) => {
                    partidaData = partidaBancoData;
                    // Agora que temos o id do tema, podemos ver
                    // se essa palavra existe no tema
                    // eslint-disable-next-line no-plusplus
                    for (let j = 0; j < usuariosPartida.length; j++) {
                        if (!usuarios_pontos[usuariosPartida[j].usuario_id]) {
                            usuarios_pontos[usuariosPartida[j].usuario_id] = 0;
                        }
                        // eslint-disable-next-line no-plusplus
                        for (let i = 1; i <= 16; i++) {
                            const teste = {};
                            if (usuariosPartida[j][`palavra${i}`] && (partidaData[`letra${(Math.ceil(i / 4))}`] === usuariosPartida[j][`palavra${i}`][0])) {
                            // if (usuariosPartida[j][`palavra${i}`] && (partidaData[`letra${((i % 4) === 0 ? 1 : (i % 4))}`] === usuariosPartida[j][`palavra${i}`][0])) {
                                teste[`palavra${i}`] = usuariosPartida[j][`palavra${i}`];
                                // Verificar se essa palavra existe no banco
                                // eslint-disable-next-line no-await-in-loop
                                const palavraExiste = await this.userDao.mysql.getPalavraByPalavra(usuariosPartida[j][`palavra${i}`]);
                                if (palavraExiste) {
                                    // resolve('Palavra existe');
                                    // Vamos ver se ela existe nesse tema
                                    // eslint-disable-next-line no-await-in-loop
                                    const palavraExisteNoTema = await this.userDao.mysql.getPalavraIdPorTemaId(palavraExiste.id, partidaData[`temaId${((i % 4) === 0 ? 1 : (i % 4))}`]);
                                    // const palavraExisteNoTema = await this.userDao.mysql.getPalavraIdPorTemaId(palavraExiste.id, partidaData[`temaId${(Math.ceil(i / 4))}`]);
                                    if (palavraExisteNoTema) {
                                        // resolve(teste);
                                        // Beleza, ele ganhou 10 pontos/
                                        // ver se outra pessoa usou a mesma palavra naquela rodada
                                        // eslint-disable-next-line no-await-in-loop
                                        const mesmaPalavraNaRodada = await this.userDao.mysql.getPalavraRepetidaNaRodada(teste, usuariosPartida[j].usuario_id, partidaId);
                                        if (mesmaPalavraNaRodada) {
                                            // resolve(mesmaPalavraNaRodada);
                                            console.log('MAIS CINCO PONTOS');
                                            usuarios_pontos[usuariosPartida[j].usuario_id] += 5;
                                            // GANHOU 5 PONTOS
                                        } else {
                                            // GANHOU 10 PONTOS
                                            console.log('MAIS 10 PONTOS');
                                            usuarios_pontos[usuariosPartida[j].usuario_id] += 10;
                                        }
                                    }
                                }
                                // resolve(teste);
                            }
                        }
                        // resolve(partidaBancoData);
                    }
                    resolve(usuarios_pontos);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getUsers() {
        return new Promise((resolve) => {
            this.userDao.mysql.getUsers()
                .then((dataUser) => {
                    if (!dataUser) this.handleResponse.notFound(this.i18n.__('Could not find user'));

                    resolve(dataUser);
                });
        });
    }
}

module.exports = UserBusiness;
