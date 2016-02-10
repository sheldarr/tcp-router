const ActionTypes = require('../constants/ActionTypes');

module.exports = {
    addClient (client) {
        return {
            client: client,
            type: ActionTypes.ADD_CLIENT
        };
    },

    deleteClient (client) {
        return {
            client: client,
            type: ActionTypes.DELETE_CLIENT
        };
    },

    createSession (credentials) {
        return {
            credentials: credentials,
            type: ActionTypes.CREATE_SESSION
        };
    }
};
