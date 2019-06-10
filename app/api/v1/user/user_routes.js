module.exports = (router, userController) => {
    router.get('/health-check', (req, res) => {
        res.status(200).json({});
    });

    router.post('/status-partida', (req, res, next) => userController.statusPartida(req, res, next));
    router.get('/pontos', (req, res, next) => userController.getPontos(req, res, next));
    router.get('/temas', (req, res, next) => userController.getTemas(req, res, next));
    router.get('/stop', (req, res, next) => userController.stop(req, res, next));
    router.get('/', (req, res, next) => userController.getUsers(req, res, next));

    return router;
};
