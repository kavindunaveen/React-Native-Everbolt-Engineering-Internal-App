import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homescreen from './Homescreen'; 
import Attendace from './Attendance';
import Quotation from './Quotation';
import Customerdetails from './Customerdetails';
import Complain from './Complain';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} options={{ 
        title: 'Dashboard',
        headerStyle: {
          backgroundColor: '#F4BC1C',

        },
        headerTintColor: '#fff',
        headerShown: false,

        }}/>
        
        <Stack.Screen name="Attendance" component={Attendace}options={{
          title: ''
        }} />


        <Stack.Screen name="Quotation" component={Quotation} options={{
          title: ''
        }}/>


        <Stack.Screen name="Customerdetails" component={Customerdetails} options={{
          title: ''
        }}/>

        <Stack.Screen name="Complain" component={Complain} options={{
          title: ''
         }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 
