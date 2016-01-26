const net = require('net');
const winston = require('winston');

const port = 8080;

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: 'router.log'})
    ]
});

const server = net.createServer((connection) => {
    winston.info('Client connected');

    connection.on('end', () => {
        logger.info('Client disconnected');
    });

    connection.write('hello\r\n');
});

server.listen(port, () => {
    logger.info(`Server is listening on port: ${port}`);
});
