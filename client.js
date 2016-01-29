const net = require('net');
const winston = require('winston');

const ActionTypes = require('./actionTypes');

const serverAddress = '127.0.0.1';
const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'client.log'})
    ]
});

var client = new net.Socket();

client.connect(port, serverAddress, () => {
    logger.info(`Connected to ${serverAddress}:${port}`);

    var handshake = {
        type: ActionTypes.HANDSHAKE
    };

    client.write(JSON.stringify(handshake));
});

client.on('data', (data) => {
    winston.info('Received: ' + data);

    client.destroy();
});

client.on('close', () => {
    logger.info('Connection closed');
});
