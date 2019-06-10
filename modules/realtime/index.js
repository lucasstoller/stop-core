const serveMqtt = require('./mqtt');

serveMqtt.on('ready', () => {
    console.info('------------------ MQTT BROKER ONLINE ------------------');
});
