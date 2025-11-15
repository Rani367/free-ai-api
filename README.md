# Free AI API

A simple, free AI chat API powered by Groq's LLaMA 3.3 70B model.

## Live API

**Endpoint:** `https://free-ai-api-three.vercel.app/api/chat`

## Usage

Send a POST request with a JSON body containing your message:

```bash
curl -X POST https://free-ai-api-three.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Your question here"}'
```

### Response

```json
{
  "response": "AI response text",
  "model": "llama-3.3-70b-versatile",
  "usage": {
    "total_tokens": 52,
    "total_time": 0.014
  }
}
```

## Examples

**JavaScript/TypeScript:**
```javascript
const response = await fetch('https://free-ai-api-three.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Hello!' })
});
const data = await response.json();
console.log(data.response);
```

**Python:**
```python
import requests

response = requests.post(
    'https://free-ai-api-three.vercel.app/api/chat',
    json={'message': 'Hello!'}
)
print(response.json()['response'])
```

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your Groq API key:
   ```
   GROQ_API_KEY=your_api_key_here
   ```
4. Run: `npm run dev`
5. API available at: `http://localhost:3000/api/chat`

Get your free Groq API key at: https://console.groq.com/keys
