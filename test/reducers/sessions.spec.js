const expect = require('expect');
const sessions = require('../../src/router/reducers/sessions');
const ActionTypes = require('../../src/router/constants/ActionTypes');

describe('sessions reducer', () => {
    it('should handle initial state', () => {
        var sessionsBefore = undefined;
        var sessionsAfter = sessions(sessionsBefore, {});

        expect(sessionsAfter).toEqual([]);
    });

    it('should handle CREATE_SESSION', () => {
        var credentials = {
            id: '93271708-2c79-4c68-b59a-d24385921fc3'
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
