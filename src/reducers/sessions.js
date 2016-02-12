const ActionTypes = require('../constants/ActionTypes');
const guidGenerator = require('../etc/guidGenerator');

const initialState = [];

module.exports = (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.CREATE_SESSION:
        var session = {
            id: new Date().getTime(),
            key: guidGenerator.next(),
            owner: action.credentials.id,
            members: [ action.credentials.id ]
        };
        return [ session, ...state ];
    default:
        return state;
    }
};
