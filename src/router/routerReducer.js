const ActionTypes = require('../actionTypes');

const routerReducer = (state, action) => {
    switch (action.type) {

    case ActionTypes.HANDSHAKE_REQUEST:
        return Object.assign({}, state, {
            command: function () {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_CONFIRM
                }));
            }
        });

    default:
        return state;
    }
};

module.exports = routerReducer;
