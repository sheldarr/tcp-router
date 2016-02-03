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
            if (state.sessions.some((session) => { return session.owner === command.client; })) {
                command.client.write(JSON.stringify({
                    error: Protocol.Errors.ALREADY_SESSION_OWNER,
                    type: Protocol.CREATE_SESSION_RESPONSE
                }));

                return;
            };

            if (state.sessions.some((session) => { return session.members.some((member) => { return member === command.client; }); })) {
                command.client.write(JSON.stringify({
                    error: Protocol.Errors.ALREADY_SESSION_MEMBER,
                    type: Protocol.CREATE_SESSION_RESPONSE
                }));

                return;
            };

            var session = {
                id: new Date().getTime(),
                key: GuidGenerator.next(),
                owner: command.client,
                members: [ command.client ]
            };

            store.dispatch({
                type: Commands.CREATE_SESSION,
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
