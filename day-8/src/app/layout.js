import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // Your global styles

export const metadata = {
  title: 'Clerk Next.js Google Auth',
  description: 'Simple Google authentication with Clerk and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}