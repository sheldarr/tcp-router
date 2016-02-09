const ActionTypes = require('../contants/ActionTypes');

module.exports = {
    addClient (client) {
        return {
            type: ActionTypes.ADD_CLIENT,
            client: client
        };
    }
};
