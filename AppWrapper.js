import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from './cache';
import App from './App';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('pk_test_Y2VudHJhbC1sb25naG9ybi0zLmNsZXJrLmFjY291bnRzLmRldiQ');
}

export default function AppWrapper() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  );
}
