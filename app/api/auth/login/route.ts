import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/services/auth.service';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await loginUser(data);
    
    const cookieStore = cookies();
    cookieStore.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({ user: result });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 400 }
    );
  }
}