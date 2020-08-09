const { shield } = require('graphql-shield');
const { isAdmin, isUser, pagination } = require("./rules");
const permissions = shield(
    {
        Query: {
            
        },
        Mutation: {
            
        },
    },
    {
        allowExternalErrors: true,
        debug: true,
    }
)

module.exports = {
    permissions,
}