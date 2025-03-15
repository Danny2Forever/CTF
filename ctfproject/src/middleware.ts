// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasGlobalPermission, isAdmin } from './lib/authUtils';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/register' || path === '/' || path.startsWith('/api/auth');
  
  // Verify authentication
  const { isAuthenticated, user, error } = await verifyAuth(request);
  
  // Redirect logic for authentication
  if (!isPublicPath && !isAuthenticated) {
    // Store the URL they were attempting to visit
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
//   if (isPublicPath && isAuthenticated) {
//     // Redirect to dashboard if already logged in and trying to access public paths
//     return NextResponse.redirect(new URL('/mycourse', request.url));
//   }
  
  // Admin panel access checks
  if (path.startsWith('/admin-panel') && isAuthenticated && user) {
    // Check if the user is an admin
    if (!isAdmin(user)) {
      // Not an admin, redirect to dashboard
      return NextResponse.redirect(new URL('/mycourse', request.url));
    }
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // Paths that require authentication
    '/mycourse/:path*',
    '/course/:path*',
    '/quiz/:path*',
    '/admin-panel/:path*',
    
    // Public paths (for redirection when already logged in)
    '/login',
    '/register',
    '/'
  ]
};