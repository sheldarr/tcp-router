const ActionTypes = require('./actionTypes');
const GuidGenerator = require('./guidGenerator');

const routerReducer = (state, action) => {
    switch (action.type) {

    case ActionTypes.CREATE_ACTION:
        return [
            {
                guid: GuidGenerator.next()
            },
            ...state
        ];

    case ActionTypes.HANDSHAKE:
        return Object.assign({}, state, {
            command: function () {
                action.client.write(JSON.stringify({
                    type: ActionTypes.HANDSHAKE
                }));
            }
        });

    default:
        return state;
    }
};

module.exports = routerReducer;
