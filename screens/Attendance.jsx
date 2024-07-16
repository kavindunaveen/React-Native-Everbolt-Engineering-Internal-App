import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Attendance = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select your Company:</Text>
      <TouchableOpacity style={styles.button1} onPress={() => handlePress('https://script.google.com/macros/s/AKfycby70b4ATK9pkoZ_GG2PVkBxkmxtoelWB5qXr16R1GWhzw9n-BSjS3jrwF3QoSbsu-Yv/exec')}>
        <Text style={styles.buttonText}>Everbolt Engineering</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbydfXPy2l9KJLkNyuwz-I1i39Nm7Gn00cBhRwuRtnfiHHjDLPaIoSJOW7rNDrYYN-32ew/exec')}>
        <Text style={styles.buttonText}>Everbolt Services</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button3} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbxFYlTaWGHUWSaD-2RB22SXKEJqFbISLNu6L5VjYilqp2WlaoREcavLXYOZZRdZlHTf/exec')}>
        <Text style={styles.buttonText}>Everbolt Foods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button4} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbz__iDxsNvQ2Yo0481rCRzp6yyizw0KEfRegFVx9i53PbvjLdUrBQZoOvB7rNFrzRWN/exec')}>
        <Text style={styles.buttonText}>CDI Electricals</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button1: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },

  button2: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  button3: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  button4: {
    backgroundColor: '#089fb1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Attendance;
