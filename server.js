const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');
const DATABASE_URL = config.restfulApiConfig.databaseURL;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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
app.post('/signin', signin.handleSingin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)

app.listen((process.env.PORT || DATABASE_URL), () => {
  console.log(`app is running on port ${DATABASE_URL}`)
})
