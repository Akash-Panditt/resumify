const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

// Protect routes — verifies JWT and attaches user to request
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      req.user = decoded; // { id: '...' }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Require admin role — must be used AFTER protect
const requireAdmin = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error || !user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    req.userRole = 'admin';
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = { protect, requireAdmin };
