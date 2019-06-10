const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: process.env.MYSQL_DIALECT,
    },
);
const db = {};

fs
    .readdirSync(path.join(__dirname, 'models'))
    .filter(file => (file.indexOf('.') !== 0))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, 'models', file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
