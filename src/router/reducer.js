const _ = require('lodash');
const Commands = require('./commands');

const reducer = (state, command) => {
    switch (command.type) {

    case Commands.ADD_CLIENT:
        return Object.assign({}, state, {
            clients: [
                command.client,
                ...state.clients
            ]
        });

    case Commands.CREATE_SESSION:
        return Object.assign({}, state, {
            clients: [
                command.session,
                ...state.sessions
            ]
        });

    case Commands.REMOVE_CLIENT:
        return Object.assign({}, state, {
            clients: _.remove(state.clients, (client) => { client === command.client; })
        });

    default:
        return state;
    }
};

module.exports = reducer;
