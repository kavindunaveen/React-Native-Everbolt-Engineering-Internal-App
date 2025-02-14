import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} retrieved from SecureStore 🔐`);
        } else {
          console.log('No values stored under key:', key);
        }
        return item;
      } catch (error) {
        console.error('SecureStore get item error:', error);
        return null;
      }
    },
    saveToken: async (key: string, token: string) => {
      try {
        await SecureStore.setItemAsync(key, token);
        console.log(`${key} stored successfully 🔐`);
      } catch (error) {
        console.error('SecureStore save item error:', error);
      }
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;
