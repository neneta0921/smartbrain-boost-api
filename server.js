const express = require('express');

const app = express();

// app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
  users: [
    {
      id: 123,
      name: 'Dan',
      email: 'dan@gmail.com',
      password: 'cooking',
      entries: 0,
      joined: new Date()
    },
    {
      id: 130,
      name: 'Jane',
      email: 'jane@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}
// console.log(database.users[0].email, database.users[0].password)

app.get('/', (req, res) => {
  res.send('this is working')
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/