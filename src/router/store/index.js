const redux = require('redux');
const rootReducer = require('../reducers');

var initialState = {
    clients: [],
    sessions: []
};

module.exports = redux.createStore(rootReducer, initialState);
