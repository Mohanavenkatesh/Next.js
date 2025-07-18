// middleware.js
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, but allow /api/auth to be accessed without authentication.
    // For example:
    // /_next/image (asset)
    // /favicon.ico (asset)
    // /api/auth (route)
    '/((?!.*\\..*|_next).*)',
    '/(api|trpc)(.*)',
  ],
};