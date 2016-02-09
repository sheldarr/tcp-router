const ActionTypes = require('../constants/ActionTypes');

const initialState = [];

module.exports = function clients (state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ADD_CLIENT:
        return [action.client, ...state];
    default:
        return state;
    }
};
