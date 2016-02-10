const ActionTypes = require('../constants/ActionTypes');

module.exports = {
    addClient (client) {
        return {
            type: ActionTypes.ADD_CLIENT,
            client: client
        };
    }
};
