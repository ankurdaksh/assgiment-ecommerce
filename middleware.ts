import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/verify-email'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublicPath) {
    try {
      // Verify token and redirect to products if valid
      await verifyAuth(token);
      return NextResponse.redirect(new URL('/products', request.url));
    } catch (error) {
      // If token is invalid, remove it and continue to public path
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
    '/cart/:path*',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verify-email',
  ],
};