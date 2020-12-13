const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const config = require('./config');
const DATABASE_URL = config.restfulApiConfig.databaseURL;
const DATABASE_HOST = config.restfulApiConfig.databaseHost;
const DATABASE_USER = config.restfulApiConfig.databaseUser;
const DATABASE_PASSWORD = config.restfulApiConfig.databasePassword;
const DATABASE_NAME = config.restfulApiConfig.databaseName;


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : DATABASE_HOST,
    user : DATABASE_USER,
    password : DATABASE_PASSWORD,
    database : DATABASE_NAME
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', signin.handleSingin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)

app.listen(DATABASE_URL, () => {
  console.log(`app is running on port ${DATABASE_URL}`)
})
