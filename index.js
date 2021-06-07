require('dotenv').config()
const express = require('express')
const router = express.Router()
const cors = require('cors')
const nodemailer = require('nodemailer')
const fetch = require('node-fetch')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(express.static('build'))

//Should probably move this to its own module
let contactEmail = nodemailer.createTransport({
  host: 'server14.nettihotelli.fi',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
})
contactEmail.verify((error, success) => {
  if (error) {
    console.log('ERROR: nodemailer - ', error)
  } else {
    console.log('nodemailer - ready to send', success)
  }
})

app.post('api/contact', async (req, res) => {
  console.log('/contact called!', req.body)
  //Verify Human
  const captchaKey = req.body.captchaKey
  const RECAPTCHA_SERVER_KEY = process.env.RECAPTCHA_SERVER_KEY

  const isHuman = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `secret=${RECAPTCHA_SERVER_KEY}&response=${captchaKey}`,
    }
  )
    .then((res) => res.json())
    .then((json) => json.success)
    .catch((err) => {
      throw new Error(`Error in Google Siteverify API. ${err.message}`)
    })

  if (captchaKey === null || !isHuman) {
    throw new Error(`YOU ARE NOT A HUMAN.`)
  }

  // The code below will run only after the reCAPTCHA is succesfully validated.
  console.log('SUCCESS!')

  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const mail = {
    from: process.env.EMAIL,
    to: 'jake.a.reddy@gmail.com',
    subject: 'Contact Form Submission',
    text: 'test',
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  }
  console.log('mail: ', mail)
  contactEmail.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error.message)
      res.json({ status: 'ERROR', sent: false })
    } else {
      console.log(info)
      res.json({ status: 'Message Sent', sent: true })
    }
  })
})

app.get('/api/test', (req, res) => {
  console.log('api/test called!')
  res.send('This is test endpoint!').status(201)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
