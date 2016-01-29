const redux = require('redux');
const routerReducer = require('./routerReducer');

const initialState = [
    {
        command: () => {},
        sessions: []
    }
];

const routerStore = redux.createStore(routerReducer, initialState);

module.exports = routerStore;
