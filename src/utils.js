const jwt = require('jsonwebtoken')

function authUser(resolve, root, args, context, info) {
  const Authorization = context.request.get('Authorization');
  console.log(Authorization);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    context.request.userId = userId;
    return {
      ...context
    };
  }
  throw new AuthError();
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  authUser,
  AuthError
}