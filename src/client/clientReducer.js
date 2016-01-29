const ActionTypes = require('../actionTypes');

const clientReducer = (state, action) => {
    switch (action.type) {

    case ActionTypes.CONNECTED_TO_SERVER:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_REQUEST
                }));
            }
        });

    case ActionTypes.HANDSHAKE_REQUEST:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_CONFIRM
                }));
            }
        });

    default:
        return state;
    }
};

module.exports = clientReducer;
