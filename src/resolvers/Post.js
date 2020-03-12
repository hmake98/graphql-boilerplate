// Field level resolver for linking tables.
const Post = {
  author: ({ id }, args, context) => {
    return context.prisma.post({ id }).author()
  },

}

module.exports = {
  Post,
}
