// backend/index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

// --- NEW IMPORTS ---
import blogRoutes from './routes/blogRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- API Routes ---
// --- THIS LINE IS NEW ---
app.use('/api/blogs', blogRoutes);

// --- Global Error Handling ---
// --- THIS LINE IS NEW ---
// It MUST be the last middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});