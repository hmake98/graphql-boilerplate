const jwt = require('jsonwebtoken')
const { rule, and, or, not } = require('graphql-shield');

const isUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    if (!ctx.user.id) {
        return false
    } else {
        let data = await vv_users.query().findById(ctx.user.id)
        return data
    }
})

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    try {
        const token = ctx.request.headers.token;
        const userInfo = await getUserInfo(token)
        if (userInfo.data.isAdmin) {
            return true
        } else {
            throw new AuthenticationError('You do not have admin access')
        }
    } catch (error) {
        console.log('error: ', error);
        throw new AuthenticationError('Invalid Token Login Again')
    }
})

const pagination = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const { page, perPage } = args
    if (page <= 0) {
        throw new UserInputError('Failed due to validation errors', {
            page: `page value can not be ${page} must be more than 0`,
        })
    }
    if (perPage <= 0) {
        throw new UserInputError('Failed due to validation errors', {
            perPage: `page value can not be ${perPage} must be more than 0`,
        })
    }
    return true
})

module.exports = {
    isUser,
    isAdmin,
    pagination,
}
