const net = require('net');
const winston = require('winston');

const ActionTypes = require('../actionTypes');
const store = require('./store');

const serverAddress = '127.0.0.1';
const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'client.log'})
    ]
});

store.subscribe(() => {
    var state = store.getState();

    state.command();
});

var client = new net.Socket();
var stdin = process.openStdin();

stdin.on('data', () => {
    store.dispatch({
        type: ActionTypes.HEARTBEAT_REQUEST,
        client: client
    });
});

client.connect(port, serverAddress, () => {
    logger.info(`Connected to ${serverAddress}:${port}`);

    store.dispatch({
        type: ActionTypes.CONNECTED_TO_SERVER,
        client: client
    });
});

client.on('data', (data) => {
    winston.info(`${serverAddress}:${port} > ${data}`);

    var action = Object.assign(JSON.parse(data), {
        client
    });

    store.dispatch(action);
});

client.on('close', () => {
    logger.info(`Connection with ${serverAddress}:${port} closed`);
});
