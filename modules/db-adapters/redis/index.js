const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

client.on('connect', () => {
    console.info('------------------ RUN REDIS ------------------');
    console.info(`PORT: ${client.connection_options.port}`);
    console.info(`HOST: ${client.connection_options.host}`);
});

client.on('error', (error) => {
    console.info('------------------ ERROR REDIS ------------------');
    console.info(`ERROR: ${error}`);
});


module.exports = client;
