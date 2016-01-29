const redux = require('redux');
const clientReducer = require('./clientReducer');

const initialState = [
    {
        command: () => {}
    }
];

const clientStore = redux.createStore(clientReducer, initialState);

module.exports = clientStore;
