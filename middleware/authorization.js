const { redisClient } = require('../controllers/session');

const requireAuth = (req, res, next) => {
  const authorization= req.headers.authorization;
  if (!authorization) {
    return res.status(401).send('No token and Unauthorized')
  }
  redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send('Unexpected Error, failed authorization')
    }
    return next()
  })
}

module.exports = { requireAuth }