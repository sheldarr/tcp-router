const redux = require('redux');
const reducer = require('./reducer');

const initialState = {
    credentials: {
        id: 0,
        key: ''
    }
};

const store = redux.createStore(reducer, initialState);

module.exports = store;
