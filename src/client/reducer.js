const Commands = require('./commands');

const reducer = (state, command) => {
    switch (command.type) {

    case Commands.SET_CREDENTIALS:
        return Object.assign({}, state, {
            credentials: command.credentials
        });

    default:
        return state;
    }
};

module.exports = reducer;
