const postQuery = require('./postQuery');
const authQuery = require('./authQuery');

const Query = {
    ...postQuery,
    ...authQuery
}

module.exports = Query;