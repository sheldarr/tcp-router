const ActionTypes = require('../actionTypes');

const routerReducer = (state, action) => {
    switch (action.type) {
    case ActionTypes.BROADCAST:
        return Object.assing({}, state, {
            command: () => {
                state.clients.forEach(function (client) {
                    if (client === action.client) {
                        return;
                    }

                    client.write(action.message);
                });
            }
        });

    case ActionTypes.CLIENT_DISCONNECTED:
        return Object.assign({}, state, {
            clients: state.clients.splice(state.clients.indexOf(action.client), 1),
            command: () => {}
        });

    case ActionTypes.HANDSHAKE_REQUEST:
        return Object.assign({}, state, {
            clients: [
                state.client,
                ...state.clients
            ],
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE_CONFIRM
                }));
            }
        });

    case ActionTypes.HEARTBEAT_REQUEST:
        return Object.assign({}, state, {
            command: () => {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HEARTBEAT_CONFIRM
                }));
            }
        });

    default:
        return state;
    }
};

module.exports = routerReducer;
