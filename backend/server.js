const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movie_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password_hash: String
})
const User = mongoose.model('User', UserSchema)

const SubscriptionSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  plan: String,
  status: String,
  start_date: Date,
  end_date: Date
})
const Subscription = mongoose.model('Subscription', SubscriptionSchema)

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now }
})
const Contact = mongoose.model('Contact', ContactSchema)

const ResetTokenSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  token: String,
  expires_at: Date,
  used: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
})
const ResetToken = mongoose.model('ResetToken', ResetTokenSchema)

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email already registered' })

    const password_hash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password_hash })
    await user.save()
    console.log('User saved to DB:', user._id)
    res.json({ message: 'User registered successfully', userId: user._id })
  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ message: 'Registration failed' })
  }
})

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('Login attempt for email:', email)
    
    const user = await User.findOne({ email })
    if (!user) {
      console.log('User not found for email:', email)
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      console.log('Invalid password for email:', email)
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      console.error('JWT_SECRET not found in environment variables')
      return res.status(500).json({ message: 'Server configuration error' })
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' })
    console.log('Login successful for user:', user._id)
    res.json({ token, message: 'Login successful' })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Login failed' })
  }
})

// Auth middleware 
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Missing token' })

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// Get user data
app.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password_hash')
    if (!user) return res.status(404).json({ message: 'User not found' })
    
    res.json({ 
      name: user.name, 
      email: user.email,
      id: user._id 
    })
  } catch (err) {
    console.error('Get user error:', err)
    res.status(500).json({ message: 'Failed to get user data' })
  }
})

// Subscribe
app.post('/subscribe', auth, async (req, res) => {
  try {
    const { plan } = req.body
    const start_date = new Date()
    const end_date = new Date()
    end_date.setFullYear(end_date.getFullYear() + 1)

    const subscription = new Subscription({
      user_id: req.userId,
      plan,
      status: 'active',
      start_date,
      end_date
    })
    await subscription.save()
    res.json({
      message: 'Subscription activated',
      status: subscription.status,
      start_date: start_date.toISOString().split('T'),
      end_date: end_date.toISOString().split('T')
    })
  } catch (err) {
    console.error('Subscribe error:', err)
    res.status(500).json({ message: 'Subscription failed' })
  }
})

// Contact
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body
  const contact = new Contact({ name, email, message })
  await contact.save()
  res.json({ message: 'Contact request received, we will get back to you soon.' })
})

app.listen(3000, () => console.log('Server running on port 3000'))

// Forgot Password
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    // Store the reset token in database
    const resetTokenDoc = new ResetToken({
      user_id: user._id,
      token: resetToken,
      expires_at: expiresAt
    })
    await resetTokenDoc.save()

    // Create reset URL
    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Request - Movie App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You have requested to reset your password for your Movie App account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 10px; 
                      display: inline-block; 
                      font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Movie App.</p>
        </div>
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)
    console.log(`Password reset email sent to: ${email}`)

    res.json({ message: 'Password reset link sent to your email address' })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Failed to send reset email' })
  }
})

// Reset Password
app.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body
    
    // Find the reset token in database
    const resetTokenDoc = await ResetToken.findOne({ 
      token: token, 
      used: false, 
      expires_at: { $gt: new Date() } 
    })
    
    if (!resetTokenDoc) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    // Find the user
    const user = await User.findById(resetTokenDoc.user_id)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    // Update password
    user.password_hash = await bcrypt.hash(password, 10)
    await user.save()

    // Mark token as used
    resetTokenDoc.used = true
    await resetTokenDoc.save()

    console.log(`Password reset successful for user: ${user._id}`)
    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ message: 'Password reset failed' })
  }
})
