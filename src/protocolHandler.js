const actions = require('./actions');
const credentialsGenerator = require('./etc/credentialsGenerator');
const guidGenerator = require('./etc/guidGenerator');
const Protocol = require('./constants/Protocol');
const ProtocolActions = Protocol.Actions;

module.exports = (store, action) => {
    var state = store.getState();

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

    case ProtocolActions.CLIENT_CONNECTED:
        action.client.credentials = credentialsGenerator.next();

        store.dispatch(actions.addClient(action.client));

        action.client.write(JSON.stringify({
            credentials: action.client.credentials,
            type: ProtocolActions.CREDENTIALS_ASSIGNED
        }));
        break;

    case ProtocolActions.CLIENT_DISCONNECTED:
        store.dispatch(actions.deleteClient(action.client));
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

    default:
        break;
    }
};
