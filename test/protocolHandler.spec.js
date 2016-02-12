const ActionTypes = require('../src/constants/ActionTypes');
const expect = require('expect');
const net = require('net');
const Protocol = require('../src/constants/Protocol');
const ProtocolActions = Protocol.Actions;
const proxyquire = require('proxyquire');

const credentials = {
    id: '1455303267020',
    key: '93271708-2c79-4c68-b59a-d24385921fc3'
};

const protocolHandler = proxyquire('../src/protocolHandler', { './etc/credentialsGenerator': {
    next: function () {
        return {
            id: '1455303267020',
            key: '93271708-2c79-4c68-b59a-d24385921fc3'
        };
    }
}});

describe('protocolHandler', () => {
    it('should handle BROADCAST_REQUEST action', () => {
        var broadcaster = new net.Socket();
        var receiver = new net.Socket();

        var broadcasterSpy = expect.spyOn(broadcaster, 'write');
        var receiverSpy = expect.spyOn(receiver, 'write');

        var store = {
            dispatch: expect.createSpy(),
            getState: expect.createSpy().andReturn({
                clients: [broadcaster, receiver]
            })
        };

        var action = {
            broadcaster,
            message: 'message',
            type: ProtocolActions.BROADCAST_REQUEST
        };

        protocolHandler(store, action);

        expect(broadcasterSpy).toNotHaveBeenCalled();
        expect(receiverSpy).toHaveBeenCalled();
        expect(receiverSpy.calls[0].arguments[0]).toEqual(JSON.stringify({
            message: action.message,
            type: ProtocolActions.BROADCAST_RESPONSE
        }));
    });

    it('should handle CLIENT_CONNECTED action', () => {
        var connectedClient = new net.Socket();
        var connectedClientSpy = expect.spyOn(connectedClient, 'write');

        var store = {
            dispatch: expect.createSpy(),
            getState: expect.createSpy().andReturn({
                clients: []
            })
        };

        var action = {
            client: connectedClient,
            type: ProtocolActions.CLIENT_CONNECTED
        };

        protocolHandler(store, action);

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch.calls[0].arguments[0]).toEqual({
            client: connectedClient,
            type: ActionTypes.ADD_CLIENT
        });
        expect(store.dispatch.calls[0].arguments[0].client.credentials).toEqual(credentials);

        expect(connectedClientSpy).toHaveBeenCalled();
        expect(connectedClientSpy.calls[0].arguments[0]).toEqual(JSON.stringify({
            credentials: credentials,
            type: ProtocolActions.CREDENTIALS_ASSIGNED
        }));
    });

    it('should handle CLIENT_DISCONNECTED action', () => {
        var disconnectedClient = new net.Socket();

        var store = {
            dispatch: expect.createSpy(),
            getState: expect.createSpy().andReturn({
                clients: [disconnectedClient]
            })
        };

        var action = {
            client: disconnectedClient,
            type: ProtocolActions.CLIENT_DISCONNECTED
        };

        protocolHandler(store, action);

        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch.calls[0].arguments[0]).toEqual({
            client: disconnectedClient,
            type: ActionTypes.DELETE_CLIENT
        });
    });
});
