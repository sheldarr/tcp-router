const actions = require('../../src/actions');
const ActionTypes = require('../../src/constants/ActionTypes');
const ProtocolActions = require('../../src/constants/Protocol').Actions;
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

    it('clientConnected should create CLIENT_CONNECTED action', () => {
        var client = new net.Socket();
        var action = actions.clientConnected(client);

        expect(action).toEqual({
            client: client,
            type: ProtocolActions.CLIENT_CONNECTED
        });
    });

    it('clientDisconnected should create CLIENT_DISCONNECTED action', () => {
        var client = new net.Socket();
        var action = actions.clientDisconnected(client);

        expect(action).toEqual({
            client: client,
            type: ProtocolActions.CLIENT_DISCONNECTED
        });
    });

    it('createSession should create CREATE_SESSION action', () => {
        var credentials = {
            id: '93271708-2c79-4c68-b59a-d24385921fc3'
        };
        var action = actions.createSession(credentials);

        expect(action).toEqual({
            credentials: credentials,
            type: ActionTypes.CREATE_SESSION
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
