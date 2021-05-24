const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))

app.get('/api/test', (req, res) => {
  console.log('api/test called!')
  res.send('This is test endpoint!').status(201)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
