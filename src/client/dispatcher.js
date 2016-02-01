const Commands = require('./commands');
const Protocol = require('../protocol');

const store = require('./store');

function Dispatcher (client, onMessage) {
    this.dispatch = (command) => {
        switch (command.type) {

        case Commands.SEND_BROADCAST_REQUEST:
            client.write(JSON.stringify({
                credentials: store.getState().credentials,
                message: command.message,
                type: Protocol.BROADCAST_REQUEST
            }));
            break;

        case Commands.SEND_CREDENTIALS_REQUEST:
            client.write(JSON.stringify({
                type: Protocol.CREDENTIALS_REQUEST
            }));
            break;

        case Protocol.BROADCAST_RESPONSE:
            onMessage(command.message);
            break;

        case Protocol.CREDENTIALS_RESPONSE:
            store.dispatch({
                type: Commands.SET_CREDENTIALS,
                credentials: command.credentials
            });
            break;

        default:
            break;
        };
    };
};

module.exports = Dispatcher;
