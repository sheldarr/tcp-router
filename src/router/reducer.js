const _ = require('lodash');
const Commands = require('./commands');

const reducer = (state, command) => {
    switch (command.type) {

    case Commands.CONNECTION_CLOSED:
        return Object.assign({}, state, {
            clients: _.remove(state.clients, (client) => { client === command.client; })
        });

    case Commands.HANDSHAKE_REQUEST:
        return Object.assign({}, state, {
            clients: [
                command.client,
                ...state.clients
            ]
        });

    default:
        return state;
    }
};

module.exports = reducer;
