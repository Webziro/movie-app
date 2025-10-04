const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie_db';
const JWT_SECRET = process.env.JWT_SECRET;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('movie_db');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const decoded = verifyToken(event.headers.authorization);
    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ message: 'Invalid token' }),
      };
    }

    const { currentPassword, newPassword } = JSON.parse(event.body);
    const { client, db } = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ _id: decoded.userId });
    if (!user) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    // Verify current password
    const validCurrentPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validCurrentPassword) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Current password is incorrect' }),
      };
    }

    // Update password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await users.updateOne(
      { _id: decoded.userId },
      { $set: { password_hash: newPasswordHash } }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Password changed successfully' }),
    };
  } catch (error) {
    console.error('Change password error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Password change failed' }),
    };
  }
};
