const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    // In production, check if user exists in database
    // For demo, we'll just create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword
    };

    const payload = {
      user: {
        id: newUser.id,
        username: newUser.username
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: { id: newUser.id, username: newUser.username }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}