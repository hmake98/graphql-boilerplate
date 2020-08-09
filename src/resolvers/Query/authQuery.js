const {
    getUserId
} = require('../../utils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

authQuery = {};

authQuery.me = async (parent, args) => {
    try {
        const id = getUserId()
        let data = await context.prisma.user({
            id
        })
        return data;
    } catch (err) {
        throw new Error('Unauthorized user')
    }
}

module.exports = authQuery;