const net = require('net');
const winston = require('winston');

const port = 8080;

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: 'client.log'})
    ]
});

var client = new net.Socket();

client.connect(port, '127.0.0.1', () => {
    logger.info('Connected');

    client.write('Hello server');
});

client.on('data', function(data) {

    winston.info('Received: ' + data);

    client.destroy();
});

client.on('close', function() {
    logger.info('Connection closed');
});
