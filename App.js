import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

import Homescreen from './screens/Homescreen';
import Attendance from './screens/Attendance';
import Quotation from './screens/Quotation';
import Customerdetails from './screens/Customerdetails';
import Complain from './screens/Complain';
import Login from './screens/Login';
import MarkVisit from './screens/MarkVisit';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import OTform from './screens/OTform';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    });

    checkUserAuth();

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Homescreen' : 'Login'}>
        <Stack.Screen 
          name="Homescreen" 
          component={Homescreen} 
          options={{ 
            title: 'Dashboard',
            headerStyle: {
              backgroundColor: '#F4BC1C',
            },
            headerTintColor: '#fff',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Attendance" 
          component={Attendance} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="Quotation" 
          component={Quotation} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="Customerdetails" 
          component={Customerdetails} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="Complain" 
          component={Complain} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="MarkVisit" 
          component={MarkVisit} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Create Account' }} 
        />
        <Stack.Screen 
          name="Leaveform" 
          component={OTform} 
          options={{ title: 'OT Request' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
