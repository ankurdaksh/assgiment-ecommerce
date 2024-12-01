import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/services/auth.service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await registerUser(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 }
    );
  }
}