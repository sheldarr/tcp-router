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

    it('broadcastRequest should create BROADCAST_REQUEST action', () => {
        var broadcaster = new net.Socket();
        var message = 'message';
        var action = actions.broadcastRequest(broadcaster, message);

        expect(action).toEqual({
            broadcaster,
            message,
            type: ProtocolActions.BROADCAST_REQUEST
        });
    });

    it('broadcastResponse should create BROADCAST_RESPONSE action', () => {
        var message = 'message';
        var action = actions.broadcastResponse(message);

        expect(action).toEqual({
            message,
            type: ProtocolActions.BROADCAST_RESPONSE
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
            id: '1455303267020',
            key: '93271708-2c79-4c68-b59a-d24385921fc3'
        };
        var action = actions.createSession(credentials);

        expect(action).toEqual({
            credentials: credentials,
            type: ActionTypes.CREATE_SESSION
        });
    });

    it('credentialsAssigned should create CREDENTIALS_ASSIGNED action', () => {
        var credentials = {
            id: '1455303267020',
            key: '93271708-2c79-4c68-b59a-d24385921fc3'
        };
        var action = actions.credentialsAssigned(credentials);

        expect(action).toEqual({
            credentials: credentials,
            type: ProtocolActions.CREDENTIALS_ASSIGNED
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
