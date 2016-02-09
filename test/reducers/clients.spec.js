const ActionTypes = require('../../src/router/constants/ActionTypes');
const clients = require('../../src/router/reducers/clients');
const expect = require('expect');
const net = require('net');

describe('clients reducer', () => {
    it('should handle initial state', () => {
        expect(clients(undefined, {})).toEqual([]);
    });

    it('should handle ADD_CLIENT', () => {
        var client = new net.Socket();

        expect(clients([], {
            client: client,
            type: ActionTypes.ADD_CLIENT
        })).toEqual([client]);
    });
});
