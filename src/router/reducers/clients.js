const ActionTypes = require('../constants/ActionTypes');

const initialState = [];

module.exports = function clients (state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ADD_CLIENT:
        return [action.client, ...state];
    case ActionTypes.DELETE_CLIENT:
        var index = state.indexOf(action.client);
        return state.slice(0, index).concat(state.slice(index + 1));
    default:
        return state;
    }
};
