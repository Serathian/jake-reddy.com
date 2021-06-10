require('dotenv').config()
const express = require('express')
const router = express.Router()
const cors = require('cors')
const app = express()
const contactRouter = require('./controllers/contact')

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use('/api/contact', contactRouter)
app.use(express.static('build'))

//Should probably move this to its own module

app.get('/api/test', (req, res) => {
  console.log('api/test called!')
  res.send('This is test endpoint!').status(201)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
