import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthLoader = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigation = useNavigation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkState = async () => {
      if (!isLoaded) return;

      // Give Expo Go a moment to finish loading everything
      setTimeout(async () => {
        try {
          const passedAuth = await AsyncStorage.getItem('UserAuthenticationPassed');
          console.log('✅ Clerk Loaded:', isLoaded);
          console.log('✅ Signed In:', isSignedIn);
          console.log('✅ Auth Passed (from AsyncStorage):', passedAuth);

          if (isSignedIn) {
            navigation.reset({ index: 0, routes: [{ name: 'Homescreen' }] });
          } else if (!passedAuth) {
            navigation.reset({ index: 0, routes: [{ name: 'UserAuthentication' }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: 'Signup' }] });
          }
        } catch (error) {
          console.error('AuthLoader error:', error);
          navigation.reset({ index: 0, routes: [{ name: 'UserAuthentication' }] });
        } finally {
          setChecking(false);
        }
      }, 300); // short delay to stabilize Expo Go behavior
    };

    checkState();
  }, [isLoaded, isSignedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#006400' }}>
      {checking && <ActivityIndicator size="large" color="#F4BC1C" />}
    </View>
  );
};

export default AuthLoader;
