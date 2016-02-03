const Commands = require('./commands');
const GuidGenerator = require('../guidGenerator');
const Protocol = require('../protocol');

const store = require('./store');

function Dispatcher () {
    this.dispatch = (command) => {
        var state = store.getState();

        switch (command.type) {
        case Protocol.BROADCAST_REQUEST:
            state.clients.forEach(function (client) {
                if (client === command.client) {
                    return;
                }

                client.write(JSON.stringify({
                    message: command.message,
                    type: Protocol.BROADCAST_RESPONSE
                }));
            });
            break;

        case Protocol.CREATE_SESSION_REQUEST:
            var session = {
                id: new Date().getTime(),
                key: GuidGenerator.next()
            };

            store.dispatch({
                type: Commands.CREATE_SESSION,
                client: command.client,
                session
            });

            command.client.write(JSON.stringify({
                type: Protocol.CREATE_SESSION_RESPONSE,
                session
            }));

            break;

        case Protocol.CREDENTIALS_REQUEST:
            var credentials = {
                id: new Date().getTime(),
                key: GuidGenerator.next()
            };

            store.dispatch({
                type: Commands.ADD_CLIENT,
                client: command.client,
                credentials
            });

            command.client.write(JSON.stringify({
                type: Protocol.CREDENTIALS_RESPONSE,
                credentials
            }));

            break;

        default:
            break;
        }
    };
};

module.exports = Dispatcher;
