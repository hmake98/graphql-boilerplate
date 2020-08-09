authQuery = {};

authQuery.me = async (parent, args, context) => {
    try {
        // const id = getUserId();
        console.log(id);
        console.log(context.prisma.user);
        let data = await context.prisma.user({
            id
        })
        return data;
    } catch (err) {
        throw new Error('Unauthorized user')
    }
}

module.exports = authQuery;