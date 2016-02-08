const expect = require('expect');
const sessions = require('../../src/router/reducers/sessions');
const ActionTypes = require('../../src/router/constants/ActionTypes');

describe('sessions reducer', () => {
    it('should handle initial state', () => {
        expect(sessions(undefined, {}))
            .toEqual([]);
    });
});
