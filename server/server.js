require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const heroRoute = require('./routes/hero.route')

const port = 8000

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api', heroRoute)

app.listen(port, () => {
  console.log('Server started!')
})
