const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'pt'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'pt',
    register: global,
});

module.exports = i18n;
