const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const config = require('./config')
const DATABASE_URL = config.restfulApiConfig.databaseURL;
console.log(config.restfulApiConfig);
console.log(process.env.NODE_ENV);
console.log(process.env);

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSingin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)

app.listen(DATABASE_URL, () => {
  console.log(`app is running on port ${DATABASE_URL}`)
})
