import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateWordList } from './generateWordList';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Configure CORS to allow requests only from trusted origins
const allowedOrigins = ['https://wordmaster.sevnasoftware.com/', 'http://localhost:8100']; // Replace with your domains
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
  })
);

// Rate limiting to prevent abuse (max 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});

app.use(limiter);
app.use(express.json());

// POST endpoint to generate a word list
app.post('/generate-word-list', (req: Request, res: Response) => {
  const { topic, difficulty } = req.body;

  // Call the mock word generator function (replace with LLM API if needed)
  const words = generateWordList(topic, difficulty);

  res.json({ words });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
