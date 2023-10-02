const asyncHandler = require('../middlewares/asyncHandler')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

exports.sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body

  try {
    const username = 'smiledev10162@gmail.com'
    const password = 'hlsn akrd khtf nril'
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: username,
        pass: password
      }
    })

    await transporter.sendMail({
      from: 'SuperAdmin@menux.com',
      to: email,
      subject: 'MenuX invitation',
      html: `<h3>Welcome!<a href='menu-x-353fd.firebaseapp.com'>Menux</a> invited ${email} as staff role</h3>`
    })
    res.json({ email: email, success: true })
  } catch (error) {
    res.json({ success: false })
  }
})
