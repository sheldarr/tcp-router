const Commands = require('./commands');
const RouterCommands = require('../router/commands');

function Dispatcher (client) {
    this.dispatch = (command) => {
        switch (command.type) {

        case Commands.BROADCAST:
            client.write(JSON.stringify({
                message: command.message,
                type: RouterCommands.BROADCAST
            }));
            break;

        case Commands.SEND_HANDSHAKE_REQUEST:
            client.write(JSON.stringify({
                type: RouterCommands.HANDSHAKE_REQUEST
            }));
            break;

        case Commands.SEND_HEARTBEAT_REQUEST:
            client.write(JSON.stringify({
                type: RouterCommands.HEARTBEAT_REQUEST
            }));
            break;

        default:
            break;
        };
    };
};

module.exports = Dispatcher;
