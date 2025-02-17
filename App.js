import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from './cache';
import * as Linking from 'expo-linking';

// Screens
import EverboltEngineering from './screens/visit_screens/EverboltEngineering';
import EverboltServices from './screens/visit_screens/EverboltServices';   
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

const Stack = createNativeStackNavigator();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error('pk_test_Y2VudHJhbC1sb25naG9ybi0zLmNsZXJrLmFjY291bnRzLmRldiQ');
}

// Deep linking configuration
const linking = {
  prefixes: ['everboltapp://'],
  config: {
    screens: {
      Homescreen: 'home',
      Signup: 'signup',
    },
  },
};

function App() {
  return (
    <ClerkLoaded>
      <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
          <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
          <Stack.Screen name="Attendance" component={Attendance} options={{ title: '' }} />
          <Stack.Screen name="Quotation" component={Quotation} options={{ title: '' }} />
          <Stack.Screen name="Customerdetails" component={Customerdetails} options={{ title: '' }} />
          <Stack.Screen name="Complain" component={Complain} options={{ title: '' }} />
          <Stack.Screen name="MarkVisit" component={MarkVisit} options={{ title: '' }} />
          <Stack.Screen name="GatePass" component={GatePassScreen} options={{ title: '' }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: '' }} />
          <Stack.Screen name="UserAuth" component={UserAuthentication} options={{ title: '' }} />
          <Stack.Screen name="EverboltEngineering" component={EverboltEngineering} options={{ title: '' }} />
          <Stack.Screen name="EverboltServices" component={EverboltServices} options={{ title: '' }} />
          <Stack.Screen name="Leaveform" component={OTform} options={{ title: 'OT Request' }} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ title: 'Notifications' }} />
        </Stack.Navigator>
      </NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
