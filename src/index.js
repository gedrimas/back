import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'

import models from './models'
import routes from './routes'

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next()
})


app.use('/session', routes.session)
app.use('/user', routes.user)
app.use('/messages', routes.message)

app.listen(process.env.PORT, () => 
  console.log(`Examle app listening on port ${process.env.PORT}!`),
);

