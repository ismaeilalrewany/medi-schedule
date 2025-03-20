import express from 'express'
import connect from './database/connect.js'

const app = express()

connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app