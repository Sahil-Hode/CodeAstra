import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock user database (replace with real database in production)
const users = [
  {
    id: 1,
    username: 'demo@codeastra.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: "password"
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'fallback-secret-key', 
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token,
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
}