/* eslint-disable */
const _ = require('lodash');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const _config = require('./config/application.json');
const ConstantsStatus = require('./app/constants/http-status');
// const middlewareAuth = require('./app/middlewares/auth-routers');

const app = express();
const router = express.Router();
/*
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(logger('combined', { stream: accessLogStream }));
*/

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '100mb',
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => middlewareAuth(req, res, next));

function startRoutes(version) {
    const pathRoute = path.resolve(__dirname, 'app', 'api', version);
    const existDirectory = fs.existsSync(pathRoute);

    if (existDirectory) {
        fs.readdirSync(pathRoute)
            .filter(directory => directory)
            .forEach((directory) => {
                const nameBaseRoute = `${directory}s`;
                const nameController = `${directory}_controller`;
                const fileRoute = `${directory}_routes`;
                const pathController = path.resolve(pathRoute, directory, nameController);
                const LoadControlle = require(pathController);
                const instanceController = new LoadControlle();

                const pathFileRoute = path.resolve(pathRoute, directory, fileRoute);
                const rout = require(pathFileRoute)(router, instanceController);
                app.use(`/${version}/${nameBaseRoute}`, rout);
            });
    } else {
        console.log('----VERSION NOT EXIST----', version);
    }
}

// START ROUTES
const loadVersions = _config.application.load_versions;
_.forEach(loadVersions, (version) => {
    const nameVersion = `v${version}`;
    startRoutes(nameVersion);
});

app.use((req, res) => {
    res.status(ConstantsStatus.bad_request)
        .json({
            message: 'Not Found',
        });
});

app.use((error, req, res, next) => {
    console.error('======================= ERROR ======================= \n', error);
    res.status(error.status || ConstantsStatus.bad_request).json({
        message: error.message,
    });

    next();
});

module.exports = app;
