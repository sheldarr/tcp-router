const guidGenerator = require('../guidGenerator');
const Protocol = require('./constants/Protocol');
const ProtocolActions = Protocol.Actions;

module.exports = (state, action) => {
    switch (action.type) {
    case ProtocolActions.BROADCAST_REQUEST:
        state.clients.forEach(function (client) {
            if (client === action.broadcaster) {
                return;
            }

            client.write(JSON.stringify({
                message: action.message,
                type: ProtocolActions.BROADCAST_RESPONSE
            }));
        });
        break;

    case ProtocolActions.CLIENT_DISCONNECTED:
        state = Object.assign({}, state, {
            clients: state.clients.splice(state.clients.indexOf(action.client), 1)
        });
        break;

    case ProtocolActions.CREATE_SESSION_REQUEST:
        if (state.sessions.some((session) => { return session.owner === action.credentials.id; })) {
            action.client.write(JSON.stringify({
                error: ProtocolActions.Errors.ALREADY_SESSION_OWNER,
                type: ProtocolActions.CREATE_SESSION_RESPONSE
            }));

            return;
        };

        if (state.sessions.some((session) => { return session.members.some((member) => { return member === action.credentials.id; }); })) {
            action.client.write(JSON.stringify({
                error: ProtocolActions.Errors.ALREADY_SESSION_MEMBER,
                type: ProtocolActions.CREATE_SESSION_RESPONSE
            }));

            return;
        };

        var session = {
            id: new Date().getTime(),
            key: guidGenerator.next(),
            owner: action.credentials.id,
            members: [ action.credentials.id ]
        };

        state = Object.assign({}, state, {
            sessions: [
                session,
                ...state.sessions
            ]
        });

        action.client.write(JSON.stringify({
            type: ProtocolActions.CREATE_SESSION_RESPONSE,
            session
        }));

        break;

    case ProtocolActions.CREDENTIALS_REQUEST:
        var credentials = {
            id: new Date().getTime(),
            key: guidGenerator.next()
        };

        state = Object.assign({}, state, {
            clients: [
                action.client,
                ...state.clients
            ]
        });

        action.client.write(JSON.stringify({
            type: ProtocolActions.CREDENTIALS_RESPONSE,
            credentials
        }));

        break;

    default:
        break;
    }
};
