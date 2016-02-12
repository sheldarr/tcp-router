const guidGenerator = require('./guidGenerator');

const credentialsGenerator = {
    next () {
        return {
            id: new Date().getTime(),
            key: guidGenerator.next()
        };
    }
};

module.exports = credentialsGenerator;
