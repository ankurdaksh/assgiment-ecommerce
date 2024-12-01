import { NextResponse } from 'next/server';
import { verifyEmail } from '@/lib/services/auth.service';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const result = await verifyEmail(token);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Email verification failed' },
      { status: 400 }
    );
  }
}