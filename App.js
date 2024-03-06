import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homescreen from './screens/Homescreen'; 
import Attendace from './screens/Attendance';
import Quotation from './screens/Quotation';
import Customerdetails from './screens/Customerdetails';
import Complain from './screens/Complain';
import Login from './screens/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Homescreen' : 'Login'}>
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ 
          title: 'Dashboard',
          headerStyle: {
            backgroundColor: '#F4BC1C',
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Attendance" component={Attendace} options={{ title: '' }} />
        <Stack.Screen name="Quotation" component={Quotation} options={{ title: '' }} />
        <Stack.Screen name="Customerdetails" component={Customerdetails} options={{ title: '' }} />
        <Stack.Screen name="Complain" component={Complain} options={{ title: '' }} />
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
