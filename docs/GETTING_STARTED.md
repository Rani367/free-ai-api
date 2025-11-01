# Getting Started

## Quick Start Guide

Follow these steps to get the API up and running.

## Prerequisites

- Node.js 18+ installed
- A Groq API key (free at https://console.groq.com)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key:**

   Open `.env.local` and add your Groq API key:
   ```
   GROQ_API_KEY=gsk_your_actual_api_key_here
   ```

   Get your API key from: https://console.groq.com/keys

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Verify it's working:**

   The server should start at http://localhost:3000

   Test with curl:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, how are you?"}'
   ```

## Project Structure

```
free-ai-api/
├── src/
│   └── app/
│       └── api/
│           └── chat/
│               └── route.ts          # Main API endpoint
├── docs/
│   ├── API_DOCUMENTATION.md          # Complete API reference
│   └── GETTING_STARTED.md            # This file
├── .env.local                         # Your API key (add to .gitignore!)
├── package.json
└── README.md
```

## Using the API

### Basic Example

**Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the meaning of life?"}'
```

**Response:**
```json
{
  "response": "The meaning of life is a philosophical question...",
  "model": "llama-3.3-70b-versatile",
  "usage": {
    "total_tokens": 125
  }
}
```

### In Your Code

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Your question here' })
});

const data = await response.json();
console.log(data.response);
```

## Next Steps

- Read the full [API Documentation](./API_DOCUMENTATION.md)
- Customize the model parameters in `src/app/api/chat/route.ts`
- Build a frontend interface for your API
- Deploy to Vercel, Netlify, or your preferred platform

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and import your repository
3. Add your `GROQ_API_KEY` in the Environment Variables section
4. Deploy!

### Deploy to Other Platforms

Make sure to:
- Set the `GROQ_API_KEY` environment variable
- Use Node.js 18+
- Run `npm install` and `npm run build`

## Customization

### Change the Model

Edit `src/app/api/chat/route.ts`:

```typescript
model: 'llama-3.3-70b-versatile',  // Change to another Groq model
```

Available models:
- `llama-3.3-70b-versatile` (recommended)
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`
- And more at https://console.groq.com/docs/models

### Adjust Response Length

```typescript
max_tokens: 1024,  // Increase for longer responses
```

### Modify Creativity

```typescript
temperature: 0.7,  // 0 = focused, 2 = creative
```

## Troubleshooting

### Server won't start
- Check that you ran `npm install`
- Make sure port 3000 is not in use

### API returns 500 error
- Verify your `.env.local` file exists
- Check that `GROQ_API_KEY` is set correctly
- Restart the dev server

### "Module not found" error
- Run `npm install` again
- Delete `node_modules` and `.next`, then reinstall

## Getting Help

- Check the [API Documentation](./API_DOCUMENTATION.md)
- Visit Groq's documentation: https://console.groq.com/docs
- Next.js documentation: https://nextjs.org/docs

## Security Notes

- Never commit `.env.local` to version control
- Add `.env.local` to `.gitignore` (already done)
- Keep your API key secret
- Consider adding rate limiting for production use

## What's Next?

Now that your API is running, you can:

1. **Build a frontend** - Create a chat interface using React
2. **Add features** - Implement conversation history, streaming responses, etc.
3. **Integrate** - Connect the API to your existing applications
4. **Deploy** - Make it available to the world

Happy coding!
