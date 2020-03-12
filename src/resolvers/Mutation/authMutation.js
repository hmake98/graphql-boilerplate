const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {};

auth.signup = async (parent, args, context) => {
  try {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.createUser({
      ...args,
      password
    })

    return {
      token: jwt.sign({
        userId: user.id
      }, process.env.APP_SECRET),
      user,
    }
  } catch (err) {
    throw new Error('Invalid Signup details')
  }
}

auth.login = async (parent, {
  email,
  password
}, context) => {
  try {
    const user = await context.prisma.user({
      email
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({
        userId: user.id
      }, process.env.APP_SECRET),
      user,
    }
  } catch (err) {
    throw new Error('Invalid login Details')
  }
}

module.exports = auth