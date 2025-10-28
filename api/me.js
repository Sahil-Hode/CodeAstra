import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const token = req.headers['x-auth-token'];

    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    
    // In production, fetch user from database
    const user = {
      id: decoded.user.id,
      username: decoded.user.username
    };

    res.status(200).json(user);

  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
}