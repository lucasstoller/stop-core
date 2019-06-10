require('dotenv').config();

const app = require('../app');
const models = require('./../modules/db-adapters');
const config = require('./../config/application.json');

app.set('port', process.env.PORT || config.application.port);

models.mysql.sequelize.sync()
    .then(() => {
        const server = app.listen(app.get('port'), () => {
            console.log('------------------ RUN APPLICATION ------------------');
            console.log('PORT: ', server.address().port);
        });

    // require('./../modules/realtime');
    });
