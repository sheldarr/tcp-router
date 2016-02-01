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

        case Protocol.CREDENTIALS_REQUEST:
            var credentials = {
                id: new Date().getTime(),
                key: GuidGenerator.next()
            };

            console.log(credentials);

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
