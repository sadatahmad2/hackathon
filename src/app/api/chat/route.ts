import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const XAI_API_KEY = process.env.XAI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    if (!XAI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing XAI_API_KEY environment variable. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history, sessionId = 'anonymous' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = "You are the AI Assistant for Inflow, an AI-powered supply chain financing platform. You help Suppliers get paid early by turning invoices into working capital, and you help Investors find high-yield short-term invoice financing opportunities. You are helpful, professional, and knowledgeable about invoice discounting, KYC, risk assessment, and supply chain finance. Keep your answers concise and directly related to the platform. Do not answer questions completely unrelated to finance or the Inflow platform.";

    // Format history for Grok (OpenAI compatible API structure)
    const formattedHistory = history
      // Skip the initial greeting if it's the first message and not from user
      .filter((msg: any, index: number) => !(index === 0 && msg.role === 'model'))
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

    const messages = [
      { role: 'system', content: systemPrompt },
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages,
        model: "grok-beta",
        stream: false,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
       const errBody = await response.text();
       throw new Error(`xAI API Error: ${response.status} ${errBody}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

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
    console.error('Grok API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while communicating with the AI' },
      { status: 500 }
    );
  }
}
