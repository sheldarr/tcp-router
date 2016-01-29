const net = require('net');
const winston = require('winston');

const ActionTypes = require('../actionTypes');
const clientStore = require('./clientStore');

const serverAddress = '127.0.0.1';
const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'client.log'})
    ]
});

clientStore.subscribe(() => {
    var state = clientStore.getState();

    state.command();
});

var client = new net.Socket();

client.connect(port, serverAddress, () => {
    logger.info(`Connected to ${serverAddress}:${port}`);

    clientStore.dispatch({
        type: ActionTypes.CONNECTED_TO_SERVER,
        client: client
    });
});

client.on('data', (data) => {
    winston.info(`${serverAddress}:${port} > ${data}`);
});

client.on('close', () => {
    logger.info(`Connection with ${serverAddress}:${port} closed`);
});
