import { ClerkProvider } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { tokenCache } from '../cache';

export default function Layout() {
  return (
    <ClerkProvider
      publishableKey="your-clerk-publishable-key"
      tokenCache={tokenCache} //  Attach tokenCache
    >
      <Stack />
    </ClerkProvider>
  );
}
