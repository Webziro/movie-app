# Backend Setup Instructions

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# JWT Secret for token generation
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# MongoDB Connection (if different from default)
MONGODB_URI=mongodb://localhost:27017/movie_db
```

## Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in EMAIL_PASS (not your regular Gmail password)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

## Password Reset Flow

1. User requests password reset via `/forgot-password`
2. System generates secure token and stores in database
3. Email sent with reset link containing token
4. User clicks link and submits new password via `/reset-password`
5. System validates token and updates password

## Database Schema

The system now includes a `ResetToken` collection to store password reset tokens with expiration and usage tracking.
