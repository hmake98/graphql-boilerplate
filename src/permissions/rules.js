const { rule } = require('graphql-shield');
const { AuthenticationError } = require('apollo-server-errors');

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    try {
        return ctx.userId;
    } catch (error) {
        throw new AuthenticationError('Invalid Token try Again')
    }
})

module.exports = {
    isAuthenticated,
}
