const jwt = require('jsonwebtoken')

function getUser(context) {
  try {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      context.request.userId = userId;
      return { ...context };
    }
  } catch (err) {
    throw new AuthError();
  }
}

class AuthError extends Error {
  constructor() {
    super('Invalid request')
  }
}

module.exports = {
  getUser,
  AuthError
}