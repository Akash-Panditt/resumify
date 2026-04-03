const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../supabase');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const { data: userExists } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
      
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();
      
    if (error) throw error;

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role || 'user',
        download_count: user.download_count || 0,
        requested_plan: user.requested_plan || null,
        token: generateToken(user.id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
      
    if (error) throw error;
    
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        role: user.role || 'user',
        download_count: user.download_count || 0,
        token: generateToken(user.id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, plan, role, download_count, requested_plan, created_at, updated_at')
        .eq('id', decoded.id)
        .maybeSingle();
        
      if (error || !user) throw new Error('User not found');
        
      res.json(user);
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ name, email, password: hashedPassword }])
        .select()
        .single();
        
      if (createError) throw createError;
      user = newUser;
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      role: user.role || 'user',
      download_count: user.download_count || 0,
      requested_plan: user.requested_plan || null,
      token: generateToken(user.id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Google Authentication failed', error: error.message });
  }
});

// POST /api/auth/request-upgrade — Request a higher tier
router.post('/request-upgrade', async (req, res) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const { plan } = req.body;

      if (!['premium', 'enterprise'].includes(plan)) {
        return res.status(400).json({ message: 'Invalid plan requested' });
      }

      const { data, error } = await supabase
        .from('users')
        .update({ requested_plan: plan, updated_at: new Date().toISOString() })
        .eq('id', decoded.id)
        .select('id, name, requested_plan')
        .single();
        
      if (error) throw error;
      res.json({ message: 'Upgrade requested. Waiting for admin approval.', requested_plan: data.requested_plan });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
