import { createStore } from 'redux';
import routerReducer from 'routerReducer';

const initialState = [
    {
        sessions: []
    }
];

const routerStore = createStore(routerReducer, initialState);

export default routerStore;
