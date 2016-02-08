const ActionTypes = require('../constants/ActionTypes');

module.exports = (state, action) => {
    switch (action.type) {
    case ActionTypes.CLIENT_DISCONNECTED:
        return state;
    default:
        return state;
    }
};
