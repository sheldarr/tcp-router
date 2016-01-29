import ActionTypes from './actionTypes';
import GuidGenerator from './guidGenerator';

export default function routerReduver (state, action) {
    switch (action.type) {

    case ActionTypes.CREATE_ACTION:
        return [
            {
                guid: GuidGenerator.next()
            },
            ...state
        ];

    default:
        return state;
    }
}
