const redux = require('redux');
const reducer = require('./reducer');

const initialState = {
    clients: []
};

const store = redux.createStore(reducer, initialState);

module.exports = store;
