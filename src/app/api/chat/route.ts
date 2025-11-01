import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message } = body;

    // Validate the message field
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message field is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Send message to Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Extract the AI response
    const aiResponse = chatCompletion.choices[0]?.message?.content || '';

    // Return the response
    return NextResponse.json({
      response: aiResponse,
      model: 'llama-3.3-70b-versatile',
      usage: chatCompletion.usage,
    });
  } catch (error) {
    console.error('Error calling Groq API:', error);

    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
