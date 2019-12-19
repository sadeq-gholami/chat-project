const express = require('express');
const Chatkit = require('@pusher/chatkit-server');
const bodyParser = require('body-parser')
const cors = require('cors')
const key = require('./Key')
const instanceLocator = require('./InstanceLocator')


const app = express();
app.use(bodyParser.json())
app.use(cors())
const chatkit = new Chatkit.default({
    key,
    instanceLocator
})
app.post('/users', (req, res) => {
      const { username } = req.body
      chatkit
        .createUser({
          id: username,
          name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
          if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
          } else {
            res.status(error.status).json(error)
          }
        })
    })
    
    app.post('/authenticate', (req, res) => {
      const authData = chatkit.authenticate({ userId: req.query.user_id })
      res.status(authData.status).send(authData.body)
    })

app.listen(3001)