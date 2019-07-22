import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import uuidv4 from 'uuid/v4'
import models from './models'
import routes from './routes'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next()
})

app.use('./session', routes.session)
app.use('./user', routes.user)
app.use('./messages', routes.messages)



app.get('/session', (req, res) => {
  res.send(req.context.models.users[req.context.me.id])
})

app.get('/users', (req, res) => {
  res.send(Object.values(req.context.models.users))
})

app.get('/users/:userId', (req, res) => {
  res.send(req.context.models.users[req.params.userId])
})

app.get('/messages', (req, res) => {
  res.send(Object.values(req.context.models.messages))
})

app.get('/messages/:messageId', (req, res) => {
  res.send(req.context.models.messages[req.params.messageId])
})

app.post('/messages', (req, res) => {
  const id = uuidv4()
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id
  }
  req.context.modules.messages[id] = message 
  return res.send(message)
})

app.delete('messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...othermessages
  } = req.context.model.messages
  req.context.models.messages = othermessages
  return res.send(message)
})

app.listen(process.env.PORT, () => 
  console.log(`Examle app listening on port ${process.env.PORT}!`),
);

