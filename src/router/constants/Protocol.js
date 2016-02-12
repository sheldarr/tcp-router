const Protocol = {
    Actions: {
        BROADCAST_REQUEST: 'BROADCAST_REQUEST',
        BROADCAST_RESPONSE: 'BROADCAST_RESPONSE',
        CLIENT_CONNECTED: 'CLIENT_CONNECTED',
        CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
        CREATE_SESSION_REQUEST: 'CREATE_SESSION_REQUEST',
        CREATE_SESSION_RESPONSE: 'CREATE_SESSION_RESPONSE',
        CREDENTIALS_REQUEST: 'CREDENTIALS_REQUEST',
        CREDENTIALS_RESPONSE: 'CREDENTIALS_RESPONSE'
    },
    Errors: {
        ALREADY_SESSION_OWNER: 'ALREADY_SESSION_OWNER',
        ALREADY_SESSION_MEMBER: 'ALREADY_SESSION_MEMBER'
    }
};

module.exports = Protocol;
