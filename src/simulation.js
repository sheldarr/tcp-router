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
    clients[0].broadcast(data.toString());
});
