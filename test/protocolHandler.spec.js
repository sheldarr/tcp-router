const expect = require('expect');
const net = require('net');
const Protocol = require('../src/router/constants/Protocol');
const ProtocolActions = Protocol.Actions;
const protocolHandler = require('../src/router/protocolHandler');

describe('protocolHandler', () => {
    it('should handle BROADCAST_REQUEST action', () => {
        var broadcaster = new net.Socket();
        var receiver = new net.Socket();

        var spy = expect.spyOn(receiver, 'write');

        var state = {
            clients: [broadcaster, receiver]
        };

        var action = {
            broadcaster,
            message: 'message',
            type: ProtocolActions.BROADCAST_REQUEST
        };

        protocolHandler(state, action);

        expect(spy).toHaveBeenCalled();
        expect(spy.calls[0].arguments).toEqual([`{"message":"${action.message}","type":"${ProtocolActions.BROADCAST_RESPONSE}"}`]);
    });
});
