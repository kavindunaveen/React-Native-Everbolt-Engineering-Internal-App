import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function GatePassScreen() {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');

  const submitGatePass = () => {
    if (name && reason && date) {
      Alert.alert('Gate Pass Submitted', `Name: ${name}\nReason: ${reason}\nDate: ${date}`);
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gate Pass Request</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter reason"
        value={reason}
        onChangeText={setReason}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter date"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={submitGatePass}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default GatePassScreen;
