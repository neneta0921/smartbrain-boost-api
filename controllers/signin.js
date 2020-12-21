const { redisClient, createSession } = require('./session');

const validateEmailAndPassword = (db, bcrypt, req, res) => {
  const { email,  password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
  })
  .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (db, res, authorization) => {
  console.log('getAuthTokenId called')
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Opps, Unauthorized')
    } else {
      return res.json({id: reply})
    }
  })
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const authorization= req.headers.authorization;
  console.log('signinAuthentication called')
  return authorization
    ? getAuthTokenId(db, res, authorization)
    : validateEmailAndPassword(db, bcrypt, req, res)
        .then(data => {
          return data.id && data.email ? createSession(data) : Promise.reject(data)
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err))
}

module.exports = { signinAuthentication }