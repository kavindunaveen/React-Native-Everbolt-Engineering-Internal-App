import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClerkProvider, ClerkLoaded, useUser } from '@clerk/clerk-expo';
import { tokenCache } from './cache';

// Import Screens
import Homescreen from './screens/Homescreen';
import Attendance from './screens/Attendance';
import Quotation from './screens/Quotation';
import Customerdetails from './screens/Customerdetails';
import Complain from './screens/Complain';
import MarkVisit from './screens/MarkVisit';
import SignupScreen from './screens/SignupScreen';
import UserAuthentication from './screens/UserAuthentication';
import ProfileScreen from './screens/ProfileScreen';
import GatePassScreen from './screens/GatePass';
import OTform from './screens/OTform';
import NotificationScreen from './screens/NotificationScreen';
import EverboltEngineering from './screens/visit_screens/EverboltEngineering';
import EverboltServices from './screens/visit_screens/EverboltServices';

const Stack = createNativeStackNavigator();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk publishable key');
}

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession && isSignedIn) {
          setInitialRoute('Homescreen');
        } else {
          setInitialRoute('Authentication');
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setInitialRoute('Authentication');
      }
    };

    checkUserSession();
  }, [isSignedIn]);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#006400" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Authentication" component={UserAuthentication} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Quotation" component={Quotation} />
        <Stack.Screen name="Customerdetails" component={Customerdetails} />
        <Stack.Screen name="Complain" component={Complain} />
        <Stack.Screen name="MarkVisit" component={MarkVisit} />
        <Stack.Screen name="GatePass" component={GatePassScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EverboltEngineering" component={EverboltEngineering} />
        <Stack.Screen name="EverboltServices" component={EverboltServices} />
        <Stack.Screen name="Leaveform" component={OTform} options={{ title: 'OT Request' }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ title: 'Notifications' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <ClerkLoaded>
      <AppNavigator />
    </ClerkLoaded>
  );
}

function AppWrapper() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  );
}

export default AppWrapper;
