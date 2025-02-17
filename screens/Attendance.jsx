import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Attendance = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select your Company:</Text>
      <TouchableOpacity style={styles.button1} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbyaNiZ4KhVm3l9EEFjxMs0751rdTLsuk9OJHT68M3AePSYf46PIOSne-4tV45eCVZ_cWQ/exec')}>
        <Text style={styles.buttonText}>Everbolt Engineering</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbx8VG_ddhemhMgGwB6l4gTbzuzL3FPn8l7YllSYJrXZjUE2gcpsyJ-DuJnkSj1feyIsKg/exec')}>
        <Text style={styles.buttonText}>Everbolt Services</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button3} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbzNrG4sI4xZRT0LXBwBQdBw2We6ZgI_DBpBi1SoGhXSQYvKigmZtFUesoJNkutXhwU/exec')}>
        <Text style={styles.buttonText}>Everbolt Foods</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button4} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbxIxVOMeRGf5m8BT7ADgqErlbnHZgM18lnXDh_6OS_t1-AjEDsQJyHSnmOyxODSKNk/exec')}>
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
