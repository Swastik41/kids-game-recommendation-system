import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { isEmail, assert } from '../utils/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    assert(name?.trim().length >= 2, 'Name is required (min 2 chars)');
    assert(isEmail(email), 'Valid email is required');
    assert((password || '').length >= 6, 'Password must be at least 6 chars');

    const exists = await User.findOne({ email: email.toLowerCase() });
    assert(!exists, 'Email already in use', 409);

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash, role });

    const token = generateToken(user._id, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
    res.status(201).json({
      token,
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
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message || 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

export default router;
