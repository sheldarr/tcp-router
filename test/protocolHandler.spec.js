const ActionTypes = require('../src/router/constants/ActionTypes');
const expect = require('expect');
const net = require('net');
const Protocol = require('../src/router/constants/Protocol');
const ProtocolActions = Protocol.Actions;
const protocolHandler = require('../src/router/protocolHandler');

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
