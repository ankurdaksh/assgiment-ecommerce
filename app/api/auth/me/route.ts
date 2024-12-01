import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateToken } from '@/lib/auth';
import { getCurrentUser } from '@/lib/services/auth.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = await validateToken(token);
    const user = await getCurrentUser(decoded.userId as string);

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}