const expect = require('expect');
const sessions = require('../../src/router/reducers/sessions');
const ActionTypes = require('../../src/router/constants/ActionTypes');

describe('sessions reducer', () => {
    it('should handle initial state', () => {
        expect(sessions(undefined, {}))
            .toEqual([]);
    });

    it('should handle CREATE_SESSION', () => {
        var credentials = {
            id: 'guid'
        };
        var sessionsBefore = [];
        var sessionsAfter = sessions(sessionsBefore, {
            credentials,
            type: ActionTypes.CREATE_SESSION
        });

        expect(sessionsAfter.length).toEqual(1);
        expect(sessionsAfter[0].owner).toEqual(credentials.id);
        expect(sessionsAfter[0].members).toInclude(credentials.id);
    });
});
