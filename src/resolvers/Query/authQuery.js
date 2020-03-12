const {
    getUserId
} = require('../../utils');

authQuery = {};

authQuery.me = async (parent, args, context) => {
    try {
        const id = getUserId(context)
        let data = await context.prisma.user({
            id
        })
        return data;
    } catch (err) {
        throw new Error('Unauthorized user')
    }
}

module.exports = authQuery;