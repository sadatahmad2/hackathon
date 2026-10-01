import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY environment variable. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history, sessionId = 'anonymous' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Use gemini-1.5-flash as the default model for chat with Inflow context
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: "You are the AI Assistant for Inflow, an AI-powered supply chain financing platform. You help Suppliers get paid early by turning invoices into working capital, and you help Investors find high-yield short-term invoice financing opportunities. You are helpful, professional, and knowledgeable about invoice discounting, KYC, risk assessment, and supply chain finance. Keep your answers concise and directly related to the platform. Do not answer questions completely unrelated to finance or the Inflow platform."
    });

    // Format the history for the Gemini API
    const formattedHistory = history
      // Skip the initial greeting if it's the first message and not from user
      .filter((msg: any, index: number) => !(index === 0 && msg.role === 'model'))
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    // Start a chat session with the history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Send the user's message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Fire and forget saving to Supabase (so we don't delay the response)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      supabase.from('chats').insert([
        { session_id: sessionId, role: 'user', content: message },
        { session_id: sessionId, role: 'model', content: text }
      ]).then(({ error }) => {
        if (error) console.error('Supabase save error:', error);
      });
    }

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while communicating with the AI' },
      { status: 500 }
    );
  }
}
