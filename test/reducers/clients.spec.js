const expect = require('expect');
const clients = require('../../src/router/reducers/clients');
const ActionTypes = require('../../src/router/constants/ActionTypes');

describe('clients reducer', () => {
    it('should handle initial state', () => {
        expect(clients(undefined, {}))
            .toEqual([]);
    });
});
