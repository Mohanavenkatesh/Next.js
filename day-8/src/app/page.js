import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Next.js with Clerk Google Auth!</h1>

      <div style={{ marginTop: '2rem' }}>
        <SignedIn>
          <p>You are signed in!</p>
          <UserButton afterSignOutUrl="/" />
          <Link href="/dashboard" style={{ marginLeft: '1rem', padding: '0.5rem 1rem', border: '1px solid blue', borderRadius: '5px', textDecoration: 'none', color: 'blue' }}>
            Go to Dashboard (Protected)
          </Link>
        </SignedIn>
        <SignedOut>
          <p>You are signed out.</p>
          <SignInButton mode="modal">
            <button style={{ padding: '0.5rem 1rem', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  );
}