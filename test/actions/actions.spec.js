const actions = require('../../src/router/actions');
const ActionTypes = require('../../src/router/constants/ActionTypes');
const expect = require('expect');
const net = require('net');

describe('actions', () => {
    it('addClient should create ADD_CLIENT action', () => {
        var client = new net.Socket();
        var action = actions.addClient(client);

        expect(action).toEqual({
            client: client,
            type: ActionTypes.ADD_CLIENT
        });
    });

    it('deleteClient should create DELETE_CLIENT action', () => {
        var client = new net.Socket();
        var action = actions.deleteClient(client);

        expect(action).toEqual({
            client: client,
            type: ActionTypes.DELETE_CLIENT
        });
    });
});
