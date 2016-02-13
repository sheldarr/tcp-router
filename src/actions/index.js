const ActionTypes = require('../constants/ActionTypes');
const ProtocolActions = require('../constants/Protocol').Actions;

module.exports = {
    addClient (client) {
        return {
            client,
            type: ActionTypes.ADD_CLIENT
        };
    },

    broadcastRequest (broadcaster, message) {
        return {
            broadcaster,
            message,
            type: ProtocolActions.BROADCAST_REQUEST
        };
    },

    broadcastResponse (message) {
        return {
            message,
            type: ProtocolActions.BROADCAST_RESPONSE
        };
    },

    clientConnected (client) {
        return {
            client,
            type: ProtocolActions.CLIENT_CONNECTED
        };
    },

    clientDisconnected (client) {
        return {
            client,
            type: ProtocolActions.CLIENT_DISCONNECTED
        };
    },

    createSession (credentials) {
        return {
            credentials,
            type: ActionTypes.CREATE_SESSION
        };
    },

    credentialsAssigned (credentials) {
        return {
            credentials,
            type: ProtocolActions.CREDENTIALS_ASSIGNED
        };
    },

    deleteClient (client) {
        return {
            client,
            type: ActionTypes.DELETE_CLIENT
        };
    }
};
