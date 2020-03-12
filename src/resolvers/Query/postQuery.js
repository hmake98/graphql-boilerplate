const {
  getUserId
} = require('../../utils')

const postQuery = {};

postQuery.feed = async (parent, args, context) => {
  return context.prisma.posts({
    where: {
      published: true
    }
  })
}

postQuery.drafts = async (parent, args, context) => {
  const id = getUserId(context)
  const where = {
    published: false,
    author: {
      id,
    },
  }
  return context.prisma.posts({
    where
  })
}

postQuery.post = async (parent, {
  id
}, context) => {
  return context.prisma.post({
    id
  })
}

postQuery.me = async (parent, args, context) => {
  const id = getUserId(context)
  return context.prisma.user({
    id
  })
}


module.exports = postQuery;