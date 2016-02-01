const net = require('net');
const winston = require('winston');

const Commands = require('./Commands');
const Dispatcher = require('./Dispatcher');

const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'router.log'})
    ]
});

const dispatcher = new Dispatcher();

const server = net.createServer((connection) => {
    var client = Object.assign(connection, {
        name: `${connection.remoteAddress}:${connection.remotePort}`
    });

    logger.info(`${client.name} connected`);

    client.on('data', (data) => {
        logger.info(`${client.name} > ${data}`);

        var command = Object.assign(JSON.parse(data), {
            client
        });

        dispatcher.dispatch(command);
    });

    client.on('end', () => {
        logger.info(`Client ${client.name} disconnected`);
    });

    client.on('error', (error) => {
        logger.error(error);
    });

    client.on('close', (had_error) => {
        logger.info(`Connection with ${client.name} closed`);

        var command = {
            client,
            type: Commands.CONNECTION_CLOSED
        };

        dispatcher.dispatch(command);
    });
});

server.on('error', (error) => {
    logger.error(error);
});

server.on('close', () => {
    logger.info('Server closed');
});

server.listen(port, () => {
    logger.info(`Server is listening on port: ${port}`);
});
