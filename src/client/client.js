const net = require('net');
const winston = require('winston');

const Commands = require('./commands');
const Dispatcher = require('./dispatcher');
const RouterCommands = require('../router/commands');

const serverAddress = '127.0.0.1';
const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'client.log'})
    ]
});

const client = new net.Socket();
const dispatcher = new Dispatcher(client);
const stdin = process.openStdin();

stdin.on('data', (data) => {
    logger.info(`${serverAddress}:${port} > ${data}`);

    dispatcher.dispatch({
        message: data.toString(),
        type: RouterCommands.BROADCAST
    });
});

client.connect(port, serverAddress, () => {
    logger.info(`Connected to ${serverAddress}:${port}`);

    client.write(JSON.stringify({
        type: RouterCommands.HANDSHAKE_REQUEST
    }));

    client.write(JSON.stringify({
        type: RouterCommands.HEARTBEAT_REQUEST
    }));
});

client.on('data', (data) => {
    winston.info(`${serverAddress}:${port} > ${data}`);

    var command = Object.assign(JSON.parse(data), {
        client
    });

    dispatcher.dispatch(command);
});

client.on('error', (error) => {
    logger.error(error);
});

client.on('close', () => {
    logger.info(`Connection with ${serverAddress}:${port} closed`);
});
