import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// 1. Security: CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'http://localhost:5173', // Allow our frontend to make requests
}));

// 2. Security: Set various HTTP headers
app.use(helmet());

// 3. Security: Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 min
});
app.use('/api', limiter);

// 4. JSON Body Parser (so we can read req.body)
app.use(express.json());

// 5. Simple request logger (Level 4 requirement)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- API Routes (Coming Next) ---
// app.use('/api/blogs', blogRoutes);

// --- Error Handling (Coming Next) ---
// app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});