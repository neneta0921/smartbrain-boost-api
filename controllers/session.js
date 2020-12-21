const jwt = require('jsonwebtoken');

// setup Redis
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = (email) => {
  const jwtPayload = { email }
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
}

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value))

const createSession = (user) => {
  // JWT token returns user data
  console.log('CreateSession', user)
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      console.log('SignToken: ', token)
      return { success: 'true', user, token }
    })
    .catch(console.log)
}

module.exports = { redisClient, createSession }