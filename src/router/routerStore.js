const redux = require('redux');
const routerReducer = require('./routerReducer');

const initialState = {
    clients: [],
    command: () => {}
};

const routerStore = redux.createStore(routerReducer, initialState);

module.exports = routerStore;
