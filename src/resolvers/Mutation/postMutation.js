const {
  getUserId
} = require('../../utils')

const post = {};

post.createDraft = async (parent, {
  title,
  content
}, context) => {
  // const userId = getUserId(context)
  return context.prisma.createPost({
    title,
    content,
    author: {
      connect: {
        id: userId
      }
    },
  })
}

post.publish = async (parent, {
  id
}, context) => {
  // const userId = getUserId(context)
  const postExists = await context.prisma.$exists.post({
    id,
    author: {
      id: userId
    },
  })
  if (!postExists) {
    throw new Error(`Post not found or you're not the author`)
  }

  return context.prisma.updatePost({
    where: {
      id
    },
    data: {
      published: true
    },
  }, )
}

post.deletePost = async (parent, {
  id
}, context) => {
  // const userId = getUserId(context)
  const postExists = await context.prisma.$exists.post({
    id,
    author: {
      id: userId
    },
  })
  if (!postExists) {
    throw new Error(`Post not found or you're not the author`)
  }

  return context.prisma.deletePost({
    id
  })
}

post.updateDraft = async (parent, args, context) => {
  let postId = args.input.params.id
  const updateUser = await context.prisma.updatePost({
    data: {
      ...args.input.data
    },
    where: {
      id: postId
    },
  })
  return updateUser
}

module.exports = post;