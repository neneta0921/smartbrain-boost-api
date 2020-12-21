const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');
const DATABASE_URL = config.restfulApiConfig.databaseURL;

const { handleRegister } = require('./controllers/register');
const { signinAuthentication } = require('./controllers/signin');
const { handleProfileGet, handleProfileUpdate} = require('./controllers/profile');
const { handleImage, handleApiCall } = require('./controllers/image');
const { requireAuth } = require('./middleware/authorization');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(express.json());

app.get('/', (req, res) => { res.send('OK, it is working!') })
app.post('/signin', signinAuthentication(db, bcrypt))
app.post('/register', handleRegister(db, bcrypt))
app.get('/profile/:id', requireAuth, handleProfileGet(db))
app.post('/profile/:id', requireAuth, handleProfileUpdate(db))
app.put('/image', requireAuth, handleImage(db))
app.post('/imageurl', requireAuth, handleApiCall)

// app.post('/profile/:id', function (req, res, next) {
//   console.log('ID:', req.params.id)
//   next()
// }, handleProfileUpdate(db))

app.listen((process.env.PORT || DATABASE_URL), () => {
  console.log(`app is running on port ${DATABASE_URL}`)
})
