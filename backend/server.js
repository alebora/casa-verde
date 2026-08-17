import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit'; // ← ADD
import helmet from 'helmet'; // ← ADD
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// ← ADD: Security headers
app.use(helmet());

// ← MODIFY: Restrict CORS to your domain
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app', // ← Replace with your actual domain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ← ADD: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));

// ← ADD: API key validation
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};

app.post('/api/chat', validateApiKey, async (req, res) => { // ← ADD validateApiKey
  try {
    const { messages } = req.body;

    // ← ADD: Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    if (messages.length > 50) {
      return res.status(400).json({ error: 'Too many messages' });
    }

    const groqMessages = [
      {
        role: 'system',
        content: `You are a helpful plant care assistant. You provide expert advice on:
- Plant care (watering, light, soil, fertilizing)
- Common plant problems and solutions
- Plant identification
- Repotting and propagation tips
- Seasonal care adjustments

Be friendly, concise, and practical. If you're unsure about something specific, recommend consulting a local plant nursery or plant expert.`
      },
      ...messages
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Groq API error:', error);
      return res.status(response.status).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    res.json({
      content: [{ text: assistantMessage }]
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ← ADD: Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});