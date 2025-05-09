const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token exists and starts with 'Bearer '
  if (token && token.startsWith('Bearer ')) {
    try {
      // Verify token
      const decoded = jwt.verify(token.split(' ')[1], 'secretkey');

      // Find user by ID and attach to request object
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = protect;
