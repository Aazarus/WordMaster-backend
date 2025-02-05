import 'tsconfig-paths/register';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateWordList } from './generateWordList';
import { allowedOrigins } from './allowedOrigins';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Configure CORS to allow requests only from trusted origins
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy') as unknown as null);
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
app.post('/generate-word-list', async (req: Request, res: Response): Promise<any> => {
  const { topic, difficulty, llmProvider } = req.body;

  if (!topic && !difficulty) {
    return res.status(400).json({ error: 'Invalid request. Please provide a topic or difficulty.' });
  }

  try {
    console.log('Generating word list with topic: ', topic, ' and difficulty: ', difficulty, " from IP address: ", req.ip);
    const words = await generateWordList(topic, difficulty, llmProvider);
    console.log('Generated word list: ', words);
    res.status(200).json({
      topic: topic || 'random',
      words,
    });
  } catch (error) {
    console.error('Error generating word list:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

export default app; // Export only the app, not the listening server

if (process.env.NODE_ENV !== 'test') {
  // Only start the server if not running tests
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}