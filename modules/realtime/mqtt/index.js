const mosca = require('mosca');
const redis = require('redis');

const ascoltatore = {
    type: 'redis',
    redis,
    db: 12,
    port: process.env.REDIS_PORT,
    return_buffers: true,
    host: process.env.REDIS_HOST,
};

const client = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Redis,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
};

const serveMqtt = new mosca.Server(client);

module.exports = serveMqtt;
