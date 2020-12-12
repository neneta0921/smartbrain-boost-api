const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

// const test = db.select('*').from('users');
// console.log(test);

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      console.log(data[0]);
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
  })
  .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  console.log(email, name);
  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          console.log(user[0])
          res.json(user[0])
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
    .catch(err => {
      res.status(400).json('unable to register')
    })
//  try {
//    const user = db('users')
//      .returning('*')
//      .insert({
//        email: email,
//        name: name,
//        joined: new Date()
//      })
//    console.log(user[0])
//    res.json(user[0])
//    // let data = db('users').returning('*')
//    // data = data._single.insert;
//    // console.log(data, typeof(data))
//    // if(data) {
//    //   console.log('こっちに分岐')
//    //   const response = db('users').insert(data._single.insert);
//    //   res.json(response);
//    // }
//  } catch(err) {
//    res.status(400).json('unable to register')
//  }
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select('*').from('users').where({id})
    .then(user => {
      console.log(user)
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    // .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      console.log(entries)
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})
