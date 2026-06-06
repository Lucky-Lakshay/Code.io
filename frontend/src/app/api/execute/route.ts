import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language, code } = body;
    console.log(`Received ${language} code:\n`, code);
    return NextResponse.json({ 
      output: `Success! Backend received your ${language} code. Docker execution coming soon...` 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process the request" }, 
      { status: 500 }
    );
  }
}