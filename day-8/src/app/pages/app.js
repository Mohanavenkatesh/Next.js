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