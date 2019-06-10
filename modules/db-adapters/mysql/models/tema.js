module.exports = (sequelize, DataTypes) => {
    const tema = sequelize.define('themes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return tema;
};
