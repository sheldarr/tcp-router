const ActionTypes = require('../constants/ActionTypes');
const ProtocolActions = require('../constants/Protocol').Actions;

module.exports = {
    addClient (client) {
        return {
            client,
            type: ActionTypes.ADD_CLIENT
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

    deleteClient (client) {
        return {
            client,
            type: ActionTypes.DELETE_CLIENT
        };
    }
};
