const ActionTypes = require('../../src/constants/ActionTypes');
const clients = require('../../src/reducers/clients');
const expect = require('expect');
const net = require('net');

describe('clients reducer', () => {
    it('should handle initial state', () => {
        var clientsBefore = undefined;
        var clientsAfter = clients(clientsBefore, {});

        expect(clientsAfter).toEqual([]);
    });

    it('should handle ADD_CLIENT', () => {
        var client = new net.Socket();

        var clientsBefore = [];
        var clientsAfter = clients(clientsBefore, {
            client: client,
            type: ActionTypes.ADD_CLIENT
        });

        expect(clientsAfter).toInclude(client);
    });

    it('should handle DELETE_CLIENT', () => {
        var client = new net.Socket();

        var clientsBefore = [client];
        var clientsAfter = clients(clientsBefore, {
            client: client,
            type: ActionTypes.DELETE_CLIENT
        });

        expect(clientsAfter).toExclude(client);
    });
});
