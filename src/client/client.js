const net = require('net');
const winston = require('winston');

const Dispatcher = require('./dispatcher');
const RouterCommands = require('../router/commands');

function Client (serverAddress, port, onMessage) {
    const logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({filename: 'client.log'})
        ]
    });

    const client = new net.Socket();
    const dispatcher = new Dispatcher(client, onMessage);

    client.connect(port, serverAddress, () => {
        logger.info(`Connected to ${serverAddress}:${port}`);

        client.write(JSON.stringify({
            type: RouterCommands.HANDSHAKE_REQUEST
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

    this.broadcast = (message) => {
        logger.info(`${serverAddress}:${port} > ${message}`);

        dispatcher.dispatch({
            message: message,
            type: RouterCommands.BROADCAST
        });
    };
}

module.exports = Client;
