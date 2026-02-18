import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { isEmail, assert } from '../utils/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    assert(name?.trim().length >= 2, 'Name is required (min 2 chars)');
    assert(isEmail(email), 'Valid email is required');
    
    // ✅ SECURITY FIX: Stronger password requirements
    assert((password || '').length >= 8, 'Password must be at least 8 characters');
    assert(/[A-Z]/.test(password), 'Password must contain at least one uppercase letter');
    assert(/[a-z]/.test(password), 'Password must contain at least one lowercase letter');
    assert(/[0-9]/.test(password), 'Password must contain at least one number');

    const exists = await User.findOne({ email: email.toLowerCase() });
    // ✅ SECURITY FIX: Generic error message to prevent user enumeration
    assert(!exists, 'Registration failed. Please check your information.', 400);

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash, role });

    const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES);

    // ⬇️ set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message || 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    assert(isEmail(email), 'Valid email is required');
    assert(password, 'Password is required');

    const user = await User.findOne({ email: email.toLowerCase() });
    assert(user, 'Invalid credentials', 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    assert(ok, 'Invalid credentials', 401);

    const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES);

    // ⬇️ set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message || 'Login failed' });
  }
});
// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Logged out' });
});


// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

export default router;