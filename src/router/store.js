const redux = require('redux');
const reducer = require('./reducer');

const initialState = {
    clients: [],
    sessions: []
};

const store = redux.createStore(reducer, initialState);

module.exports = store;
