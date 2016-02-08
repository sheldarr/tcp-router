const GuidGenerator = require('../guidGenerator');
const Protocol = require('../protocol');

function Dispatcher () {
    var state = {
        clients: [],
        sessions: []
    };

    this.dispatch = (command) => {
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

        case Protocol.CLIENT_DISCONNECTED:
            state = Object.assign({}, state, {
                clients: state.clients.splice(state.clients.indexOf(command.client), 1)
            });
            break;

        case Protocol.CREATE_SESSION_REQUEST:
            if (state.sessions.some((session) => { return session.owner === command.credentials.id; })) {
                command.client.write(JSON.stringify({
                    error: Protocol.Errors.ALREADY_SESSION_OWNER,
                    type: Protocol.CREATE_SESSION_RESPONSE
                }));

                return;
            };

            if (state.sessions.some((session) => { return session.members.some((member) => { return member === command.credentials.id; }); })) {
                command.client.write(JSON.stringify({
                    error: Protocol.Errors.ALREADY_SESSION_MEMBER,
                    type: Protocol.CREATE_SESSION_RESPONSE
                }));

                return;
            };

            var session = {
                id: new Date().getTime(),
                key: GuidGenerator.next(),
                owner: command.credentials.id,
                members: [ command.credentials.id ]
            };

            state = Object.assign({}, state, {
                sessions: [
                    session,
                    ...state.sessions
                ]
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

            state = Object.assign({}, state, {
                clients: [
                    command.client,
                    ...state.clients
                ]
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
