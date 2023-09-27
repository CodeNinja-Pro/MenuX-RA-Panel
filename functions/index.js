const express = require('express')
const cors = require('cors')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

//Import Routes
const payment = require('./routes/payment')

//Express app
const app = express()

// Body parser
app.use(express.json())

app.use(cors())

//Mount Routes
app.get('/', async (req, res) => {
  res.send('Welcome to Pinea!')
})

app.get('/test', async (req, res) => {
  res.send('Success!')
})

app.use('/payment', payment)

exports.app = functions.https.onRequest(app)
