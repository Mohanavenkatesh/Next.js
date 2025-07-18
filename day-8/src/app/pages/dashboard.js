// pages/dashboard.js
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return <div>Loading user...</div>;
  }

  if (!isSignedIn) {
    // Redirect unauthenticated users
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>You need to be signed in to view this page.</p>
        <Link href="/sign-in" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', textDecoration: 'none' }}>
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dashboard Page</h1>
      <p>Hello, {user.firstName || 'User'}! You are authenticated.</p>
      <Link href="/" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid gray', borderRadius: '5px', textDecoration: 'none', color: 'gray' }}>
        Go Back Home
      </Link>
    </div>
  );
}