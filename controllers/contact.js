const contactRouter = require('express').Router()
const fetch = require('node-fetch')
const nodemailer = require('nodemailer')

//Nodemailer setup and connection
let contactEmail = nodemailer.createTransport({
  host: 'server14.nettihotelli.fi',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
})

//Nodemailer connection verification
contactEmail.verify((error, success) => {
  if (error) {
    console.log('ERROR: nodemailer - ', error)
  } else {
    console.log('nodemailer - ready to send', success)
  }
})

contactRouter.post('/', async (req, res) => {
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

module.exports = contactRouter
