const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { getUser } = require('./utils');
const { permissions } = require('./permissions');
const resolvers = require('./resolvers');

const prisma = new PrismaClient();

const options = {
  port: process.env.PORT || 4000
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [ permissions ],
  context: (request) => {
    return {
      ...request,
      prisma,
      userId: getUser(request)
    }
  },
  options, 
})

server.start(() => console.log('Server is running on http://localhost:4000'));
