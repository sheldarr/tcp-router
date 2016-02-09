const redux = require('redux');
const clients = require('./clients');
const sessions = require('./sessions');

module.exports = redux.combineReducers({
    clients, sessions
});
