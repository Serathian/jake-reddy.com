const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
