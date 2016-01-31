const Commands = require('./commands');

const store = require('./store');

function Dispatcher () {
    this.dispatch = (command) => {
        var state = store.getState();

        switch (command.type) {
        case Commands.BROADCAST:
            state.clients.forEach(function (client) {
                if (client === command.client) {
                    return;
                }

                client.write(JSON.stringify({
                    message: command.message,
                    type: Commands.MESSAGE
                }));
            });

            break;

        case Commands.HANDSHAKE_REQUEST:
            store.dispatch(command);

            command.client.write(JSON.stringify({
                type: Commands.HANDSHAKE_CONFIRMATION
            }));

            break;

        case Commands.HEARTBEAT_REQUEST:
            command.client.write(JSON.stringify({
                type: Commands.HEARTBEAT_CONFIRMATION
            }));

            break;

        default:
            break;
        }
    };
};

module.exports = Dispatcher;
