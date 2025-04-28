// App.js (Final Updated)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from './cache';
import Constants from 'expo-constants';

// Screens
import Homescreen from './screens/Homescreen';
import Attendance from './screens/Attendance';
import Quotation from './screens/Quotation';
import Customerdetails from './screens/Customerdetails';
import Complain from './screens/Complain';
import MarkVisit from './screens/MarkVisit';
import VisitSelectionScreen from './screens/VisitSelectionScreen';
import SignupScreen from './screens/SignupScreen';
import UserSignupScreen from './screens/UserSignupScreen';
import UserAuthentication from './screens/UserAuthentication';
import AuthLoader from './screens/AuthLoader';
import ProfileScreen from './screens/ProfileScreen';
import GatePassScreen from './screens/GatePass';
import OTform from './screens/OTform';
import NotificationScreen from './screens/NotificationScreen';
import EverboltEngineering from './screens/visit_screens/EverboltEngineering';
import EverboltServices from './screens/visit_screens/EverboltServices';
import EverboltDelivery from './screens/visit_screens/EverboltDelivery';
import CDIElectricals from './screens/visit_screens/CDIElectricals';

const Stack = createNativeStackNavigator();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('Missing Clerk publishable key');
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoader">
        <Stack.Screen name="AuthLoader" component={AuthLoader} options={{ headerShown: false }} />
        <Stack.Screen name="UserAuthentication" component={UserAuthentication} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="UserSignup" component={UserSignupScreen} options={{ title: 'Create User Account' }} />
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Quotation" component={Quotation} />
        <Stack.Screen name="Customerdetails" component={Customerdetails} />
        <Stack.Screen name="Complain" component={Complain} />
        <Stack.Screen name="MarkVisit" component={MarkVisit} />
        <Stack.Screen name="VisitSelection" component={VisitSelectionScreen} />
        <Stack.Screen name="GatePass" component={GatePassScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EverboltEngineering" component={EverboltEngineering} />
        <Stack.Screen name="EverboltServices" component={EverboltServices} />
        <Stack.Screen name="CDIElectricals" component={CDIElectricals} />
        <Stack.Screen name="EverboltDelivery" component={EverboltDelivery} />
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

export default function AppWrapper() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  );
}