// app/dashboard/page.js
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dashboard Page</h1>
      {user ? (
        <p>Hello, {user.firstName || 'User'}! You are authenticated.</p>
      ) : (
        <p>You need to be signed in to view this page.</p>
      )}
      <Link href="/" style={{ marginTop: '1rem', display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid gray', borderRadius: '5px', textDecoration: 'none', color: 'gray' }}>
        Go Back Home
      </Link>
    </div>
  );
}