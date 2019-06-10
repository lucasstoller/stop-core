module.exports = (sequelize, DataTypes) => {
    const partida = sequelize.define('partida_x_usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario_id: {
            type: DataTypes.STRING,
        },
        partida_id: {
            type: DataTypes.INTEGER,
        },
        palavra1: {
            type: DataTypes.STRING,
        },
        palavra2: {
            type: DataTypes.STRING,
        },
        palavra3: {
            type: DataTypes.STRING,
        },
        palavra4: {
            type: DataTypes.STRING,
        },

        palavra5: {
            type: DataTypes.STRING,
        },
        palavra6: {
            type: DataTypes.STRING,
        },
        palavra7: {
            type: DataTypes.STRING,
        },
        palavra8: {
            type: DataTypes.STRING,
        },

        palavra9: {
            type: DataTypes.STRING,
        },
        palavra10: {
            type: DataTypes.STRING,
        },
        palavra11: {
            type: DataTypes.STRING,
        },
        palavra12: {
            type: DataTypes.STRING,
        },

        palavra13: {
            type: DataTypes.STRING,
        },
        palavra14: {
            type: DataTypes.STRING,
        },
        palavra15: {
            type: DataTypes.STRING,
        },
        palavra16: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return partida;
};
