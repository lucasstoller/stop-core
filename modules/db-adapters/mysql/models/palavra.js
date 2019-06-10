module.exports = (sequelize, DataTypes) => {
    const tema = sequelize.define('words', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return tema;
};
