const {
  getUserId
} = require('../../utils')

const postQuery = {};

postQuery.feed = async (parent, args, context) => {
  try {
    return context.prisma.posts({
      where: {
        published: true
      }
    })
  } catch (err) {
    throw new Error('Error from feed')
  }
}

postQuery.drafts = async (parent, args, context) => {
  try {
    // const id = getUserId(context)
    const where = {
      published: false,
      author: {
        id,
      },
    }
    return context.prisma.posts({
      where
    })
  } catch (err) {
    throw new Error('Error from drafts')
  }
}

postQuery.post = async (parent, {
  id
}, context) => {
  try {
    return context.prisma.post({
      id
    })
  } catch (err) {
    throw new Error('Error from post');
  }
}


module.exports = postQuery;