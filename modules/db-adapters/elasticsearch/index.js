const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: process.env.ELASTIC_SEARCH_HOST,
});

client.ping({
    requestTimeout: 30000,
}, (error) => {
    if (error) console.error('------------------ ERROR RUN ELASTICSEARCH ------------------');

    console.info('------------------ RUN ELASTICSEARCH ------------------');
    console.info(`HOST: ${process.env.ELASTIC_SEARCH_HOST}`);
});

module.exports = client;
