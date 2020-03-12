const auth = require('./authMutation');
const post = require('./postMutation');

const mutation = {
    ...auth,
    ...post
};


module.exports = mutation;