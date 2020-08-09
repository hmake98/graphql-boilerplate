const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client');
const { authUser } = require('./utils');
const { permissions } = require('./Shield/index');
const resolvers = require('./resolvers');

const prisma = new PrismaClient();

const options = {
  port: process.env.PORT || 4000
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [ permissions ],
  options,
  context: request => {
    return {
      ...request,
      prisma,
      user: authUser(request)
    }
  }
})

server.start(() => console.log('Server is running on http://localhost:4000'));
