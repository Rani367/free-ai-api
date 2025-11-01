# API Documentation

## Overview

This Next.js application provides a free AI chat API powered by Groq's llama-3.3-70b-versatile model.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com` (after deployment)

## Endpoints

### POST /api/chat

Send a message to the AI and receive a response.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "message": "Your message here"
}
```

**Parameters:**
- `message` (string, required): The message/question you want to send to the AI

#### Response

**Success Response (200 OK):**
```json
{
  "response": "AI's response text",
  "model": "llama-3.3-70b-versatile",
  "usage": {
    "queue_time": 0.198312732,
    "prompt_tokens": 41,
    "prompt_time": 0.002022129,
    "completion_tokens": 47,
    "completion_time": 0.078123537,
    "total_tokens": 88,
    "total_time": 0.080145666
  }
}
```

**Response Fields:**
- `response` (string): The AI-generated response
- `model` (string): The model used (llama-3.3-70b-versatile)
- `usage` (object): Token usage and timing statistics
  - `prompt_tokens`: Number of tokens in your message
  - `completion_tokens`: Number of tokens in the AI's response
  - `total_tokens`: Total tokens used
  - `queue_time`, `prompt_time`, `completion_time`, `total_time`: Timing metrics in seconds

**Error Responses:**

**400 Bad Request** - Invalid request:
```json
{
  "error": "Message field is required and must be a string"
}
```

**500 Internal Server Error** - API key not configured:
```json
{
  "error": "GROQ_API_KEY is not configured"
}
```

**500 Internal Server Error** - Other errors:
```json
{
  "error": "Error message details"
}
```

## Examples

### cURL

**Basic request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the capital of France?"}'
```

**Response:**
```json
{
  "response": "The capital of France is Paris.",
  "model": "llama-3.3-70b-versatile",
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 8,
    "total_tokens": 20,
    ...
  }
}
```

### JavaScript/TypeScript

**Using fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Explain quantum computing in simple terms'
  })
});

const data = await response.json();
console.log(data.response);
```

**With error handling:**
```javascript
async function chatWithAI(message) {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// Usage
const aiResponse = await chatWithAI('Hello, how are you?');
console.log(aiResponse);
```

### Python

**Using requests library:**
```python
import requests
import json

url = "http://localhost:3000/api/chat"
headers = {"Content-Type": "application/json"}
data = {"message": "What is machine learning?"}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    result = response.json()
    print(result['response'])
    print(f"Tokens used: {result['usage']['total_tokens']}")
else:
    print(f"Error: {response.json()['error']}")
```

### Node.js

**Using axios:**
```javascript
const axios = require('axios');

async function chat(message) {
  try {
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data?.error || error.message);
    throw error;
  }
}

// Usage
chat('Tell me a fun fact').then(data => {
  console.log('AI Response:', data.response);
  console.log('Tokens used:', data.usage.total_tokens);
});
```

### React Example

**Simple chat component:**
```tsx
import { useState } from 'react';

export default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponse('Failed to fetch response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && <p>AI: {response}</p>}
    </div>
  );
}
```

## Rate Limits

Rate limits are determined by your Groq API account. Check your [Groq dashboard](https://console.groq.com/) for current limits.

## Model Information

**Model**: llama-3.3-70b-versatile

**Capabilities:**
- General-purpose conversational AI
- Question answering
- Text generation
- Code assistance
- Creative writing
- And more

**Configuration:**
- Temperature: 0.7 (balanced creativity/consistency)
- Max tokens: 1024 (configurable in route.ts)

## Configuration

To modify the API behavior, edit `src/app/api/chat/route.ts`:

```typescript
const chatCompletion = await groq.chat.completions.create({
  messages: [{ role: 'user', content: message }],
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,        // 0-2: Lower = more focused, Higher = more creative
  max_tokens: 1024,        // Maximum response length
});
```

## Environment Variables

Required environment variables in `.env.local`:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from: https://console.groq.com/keys

## Troubleshooting

**Error: "GROQ_API_KEY is not configured"**
- Make sure `.env.local` exists in the project root
- Verify your API key is set correctly
- Restart the dev server after adding the key

**Error: "Message field is required and must be a string"**
- Ensure you're sending a JSON body with a `message` field
- Check that Content-Type header is `application/json`

**Error: "Unexpected end of JSON input"**
- Verify your request body is valid JSON
- Check that you're sending the complete request

**429 Rate Limit Error**
- You've exceeded your Groq API rate limits
- Wait a moment and try again
- Check your usage at https://console.groq.com/

## Support

For issues with:
- **This API**: Check your request format and API key configuration
- **Groq API**: Visit https://console.groq.com/docs
- **Next.js**: Visit https://nextjs.org/docs
