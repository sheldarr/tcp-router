const expect = require('expect');
const Dispatcher = require('../src/router/dispatcher');

describe('router', () => {
    describe('dispatcher', () => {
        it('should return initial state', () => {
            var dispatcher = new Dispatcher();

            expect(dispatcher.state)
                .toEqual({
                    clients: [],
                    sessions: []
                });
        });
    });
});
