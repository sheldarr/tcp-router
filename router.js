const net = require('net');
const winston = require('winston');

const port = 8080;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'router.log'})
    ]
});

var clients = [];

const server = net.createServer((connection) => {
    logger.info('Client connected');

    var client = Object.assign(connection, {
        name: `${connection.remoteAddress}:${connection.remotePort}`
    });

    clients.push(client);

    client.write(`Welcome ${client.name}\n`);

    client.on('data', (data) => {
        logger.info(`${client.name} > ${data}`);
    });

    client.on('end', () => {
        logger.info(`Client ${client.name} disconnected`);
        clients.splice(clients.indexOf(client), 1);
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
