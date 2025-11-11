import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import gamesRoutes from "./routes/gameRoutes.js";

const app = express();

const PORT = Number(process.env.PORT || 5000);
const HOST = '0.0.0.0';

// CORS BEFORE routes
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// health/root
app.get('/', (_req, res) => res.send('Kids Game API is running. Try GET /api/health'));
app.get('/api/health', (_req, res) => res.json({ ok: true, at: new Date().toISOString() }));

// mount API routes
app.use('/api/auth', authRoutes);
app.use("/api/games", gamesRoutes);

// start after DB connect
(async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('Missing MONGO_URI/MONGODB_URI in .env');
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    app.listen(PORT, HOST, () => console.log(`🚀 API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();
