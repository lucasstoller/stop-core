module.exports = (sequelize, DataTypes) => {
    const partida = sequelize.define('partida', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rodada: {
            type: DataTypes.INTEGER,
        },
        temaId1: {
            type: DataTypes.INTEGER,
        },
        temaId2: {
            type: DataTypes.INTEGER,
        },
        temaId3: {
            type: DataTypes.INTEGER,
        },
        temaId4: {
            type: DataTypes.INTEGER,
        },
        letra1: {
            type: DataTypes.STRING,
        },
        letra2: {
            type: DataTypes.STRING,
        },
        letra3: {
            type: DataTypes.STRING,
        },
        letra4: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return partida;
};
