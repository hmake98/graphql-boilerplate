const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    }
  },
})

server.start(({ port }) => console.log('Server is running on http://localhost:4000'));
