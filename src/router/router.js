const net = require('net');
const winston = require('winston');
const routerStore = require('./routerStore');

const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'router.log'})
    ]
});

routerStore.subscribe(() => {
    var state = routerStore.getState();

    state.command();
});

const server = net.createServer((connection) => {
    var client = Object.assign(connection, {
        name: `${connection.remoteAddress}:${connection.remotePort}`
    });

    logger.info(`${client.name} connected`);

    client.on('data', (data) => {
        logger.info(`${client.name} > ${data}`);

        var action = Object.assign(JSON.parse(data), {
            client
        });

        routerStore.dispatch(action);
    });

    client.on('end', () => {
        logger.info(`Client ${client.name} disconnected`);

        routerStore.dispatch({
            client,
            type: 'CLIENT_DISCONNECTED'
        });
    });
});

server.listen(port, () => {
    logger.info(`Server is listening on port: ${port}`);
});

// broadcast(socket.name + " joined the chat\n", socket);
// // Send a message to all clients
// function broadcast(message, sender) {
//   clients.forEach(function (client) {
//     // Don't want to send it to sender
//     if (client === sender) return;
//     client.write(message);
//   });
