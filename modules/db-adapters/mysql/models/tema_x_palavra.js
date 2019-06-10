module.exports = (sequelize, DataTypes) => {
    // eslint-disable-next-line camelcase
    const tema_x_palavra = sequelize.define('theme_word', {
        theme_id: {
            type: DataTypes.INTEGER,
        },
        word_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    tema_x_palavra.removeAttribute('id');

    // eslint-disable-next-line camelcase
    return tema_x_palavra;
};
