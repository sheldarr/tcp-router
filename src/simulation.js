const Client = require('./client/client');

const numberOfClients = parseInt(process.argv[2], 10);

const serverAddress = '127.0.0.1';
const port = 8080;

var clients = [];

for (var i = 0; i < numberOfClients; i++) {
    clients.push(new Client(serverAddress, port, (message) => {
        console.log(message);
    }));
}

const stdin = process.openStdin();

stdin.on('data', (data) => {
    var command = data.toString().replace(/[\r\n]/g, '');

    switch (command) {
    case 'CREATE_SESSION':
        clients[0].createSession();
        break;
    default:
        clients[0].broadcast(command);
        break;
    };
});
