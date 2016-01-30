const ActionTypes = require('../actionTypes');

const reducer = (state, action) => {
    switch (action.type) {

    case ActionTypes.CONNECTED_TO_SERVER:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_REQUEST
                }));
            }
        });

    case ActionTypes.HANDSHAKE_CONFIRM:
        return Object.assign({}, state, {
            command: () => {}
        });

    case ActionTypes.HANDSHAKE_REQUEST:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_CONFIRM
                }));
            }
        });

    case ActionTypes.HEARTBEAT_CONFIRM:
        return Object.assign({}, state, {
            command: () => {}
        });

    case ActionTypes.HEARTBEAT_REQUEST:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HEARTBEAT_REQUEST
                }));
            }
        });

    default:
        return Object.assign({}, state, {
            command: () => {}
        });
    }
};

module.exports = reducer;
