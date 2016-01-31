const Commands = require('./commands');

const reducer = (state, command) => {
    switch (command.type) {

    case Commands.CLIENT_DISCONNECTED:
        return Object.assign({}, state, {
            clients: state.clients.splice(state.clients.indexOf(command.client), 1)
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
