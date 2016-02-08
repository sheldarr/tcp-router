const ActionTypes = require('../constants/ActionTypes');

const initialState = [];

module.exports = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.CREATE_SESSION:
        return state;
    default:
        return state;
    }
};
