# Clerk Google Authentication with Next.js: Step-by-Step Guide

It's great you want to use Clerk for Google authentication in your Next.js project! Clerk makes it super easy. Let's go through the steps in detail.

---

## Prerequisites

1. **Node.js and npm/yarn:** Make sure you have Node.js installed (which includes npm). You can also use yarn.
2. **Clerk Account:** Sign up for a free Clerk account at [https://clerk.com/](https://clerk.com/).

---

## Step 1: Create a New Next.js Project (or use an existing one)

If you already have a Next.js project, skip this. Otherwise, open your terminal and run:

```bash
npx create-next-app@latest my-clerk-app --js
cd my-clerk-app
```

This will create a new Next.js project named `my-clerk-app` using JavaScript.

---

## Step 2: Install Clerk SDK

Navigate into your project directory and install the Clerk Next.js SDK:

```bash
npm install @clerk/nextjs
# OR
yarn add @clerk/nextjs
```

---

## Step 3: Set Up Your Clerk Application

1. **Create a New Application in Clerk Dashboard:**
    - Go to your Clerk Dashboard.
    - Click "Add application".
    - Give your application a name (e.g., "My Next.js Auth App").
    - **Crucially, enable "Google" as an authentication method** under the "Social authentication" options. You can enable other methods too if you wish.
    - Click "Create application".
2. **Get Your API Keys and Frontend API URL:**
    - After creating the application, Clerk will display your **Publishable Key** (starts with `pk_live_...` or `pk_test_...`) and **Secret Key** (starts with `sk_live_...` or `sk_test_...`). It will also provide a **Frontend API URL**.
    - **Keep these values handy.**
3. **Configure Google OAuth in Clerk (Important for Production):**
    - While Clerk handles a lot for you, for production, you'll eventually need to configure Google OAuth credentials directly in your Google Cloud Console. For development, Clerk provides a quick setup.
    - In your Clerk dashboard, go to your application settings, then "Social Connections."
    - Click on "Google."
    - You'll see a section for "Custom credentials." If you want to use your own Google OAuth app (recommended for production), you'll need to go to Google Cloud Console, create an OAuth 2.0 Client ID, and then paste the Client ID and Client Secret here. Clerk will provide you with the "Authorized Redirect URI" that you'll need to add to your Google Cloud Console settings.

---

## Step 4: Add Environment Variables

In the root of your Next.js project, create a file named `.env.local` and add your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
```

**Important:** Replace `pk_test_your_publishable_key` and `sk_test_your_secret_key` with the actual keys from your Clerk dashboard. The `NEXT_PUBLIC_` prefix makes the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` available on the client-side. The `CLERK_SECRET_KEY` is a server-side only key.

---

## Step 5: Wrap Your Application with ClerkProvider

This component provides the Clerk authentication context to your entire application.

### If you're using the **App Router** (Next.js 13+ default):

Open `app/layout.js` (or `app/layout.jsx`) and modify it like this:

```javascript
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
```

### If you're using the **Pages Router**:

Open `pages/_app.js` (or `pages/_app.jsx`) and modify it:

```javascript
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
```

---

## Step 6: Create Sign-In and Sign-Up Pages

Clerk provides pre-built components for sign-in and sign-up.

### If you're using the **App Router**:

Create these directories and files:

- `app/sign-in/[[...sign-in]]/page.js`
- `app/sign-up/[[...sign-up]]/page.js`

**app/sign-in/[[...sign-in]]/page.js:**

```javascript
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn />;
}
```

**app/sign-up/[[...sign-up]]/page.js:**

```javascript
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp />;
}
```

### If you're using the **Pages Router**:

Create these files:

- `pages/sign-in.js`
- `pages/sign-up.js`

**pages/sign-in.js:**

```javascript
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
```

**pages/sign-up.js:**

```javascript
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
```

---

## Step 7: Implement Clerk Middleware for Route Protection

The `clerkMiddleware` (App Router) or `authMiddleware` (Pages Router) helps protect your routes.

Create a `middleware.js` file in the root of your project:

```javascript
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
```

This middleware protects all routes by default, except for the home page (`/`), `/sign-in`, and `/sign-up`. If an unauthenticated user tries to access a protected route, they will be redirected to the sign-in page.

---

## Step 8: Display User Information and Sign Out

You can use Clerk's `UserButton` to display user information and allow them to sign out. You can also use `SignedIn` and `SignedOut` components to conditionally render content.

Let's modify `app/page.js` (App Router) or `pages/index.js` (Pages Router) to show this.

### If you're using the **App Router**:

**app/page.js:**

```javascript
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
```

### If you're using the **Pages Router**:

**pages/index.js:**

```javascript
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
```

---

## Step 9: Create a Protected Page (Optional but Recommended)

Let's create a simple protected page that only signed-in users can access.

### If you're using the **App Router**:

Create `app/dashboard/page.js`:

```javascript
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
```

### If you're using the **Pages Router**:

Create `pages/dashboard.js`:

```javascript
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
```

---

## Step 10: Run Your Application

Start your Next.js development server:

```bash
npm run dev
# OR
yarn dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Testing the Google Authentication:

1. You should see your homepage. If you're signed out, you'll see a "Sign In" button.
2. Click "Sign In." This will open the Clerk authentication modal.
3. You should see the option to "Continue with Google." Click on it.
4. You'll be prompted to choose your Google account and grant permissions.
5. After successful authentication, you'll be redirected back to your app, and you should see "You are signed in!" and the UserButton.
6. Try navigating to `/dashboard`. If you're signed in, you'll see the dashboard content. If you sign out and try to access `/dashboard`, you'll be redirected to the sign-in page.

---

## Further Customization and Advanced Features

- **Customizing Clerk Components:** Clerk components like `SignIn`, `SignUp`, and `UserButton` are highly customizable. You can pass props for styling, or even create entirely custom UIs if needed. Refer to the Clerk documentation for detailed customization options.
- **Accessing User Data:** Use the `useUser()` hook (client-side) or `currentUser()` helper (server-side/App Router) to access the current user's data (email, name, ID, etc.).
- **Webhooks:** Set up webhooks in your Clerk dashboard to trigger actions in your backend when certain authentication events occur (e.g., a new user signs up).
- **OAuth Scopes:** For advanced Google integrations (e.g., accessing Google Calendar), you'll need to configure additional OAuth scopes in your Clerk dashboard and potentially handle them in your application logic.
- **Production Deployment:** Remember to set up your production environment variables in your hosting provider (Vercel, Netlify, etc.) and configure your custom Google OAuth credentials in Clerk and Google Cloud for a production environment.

---

This step-by-step guide should get you started with simple Next.js Google authentication using Clerk! 