import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Complain() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitComplaint = async () => {
    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://220.247.236.169:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject,
          text: message,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        Alert.alert('Success', 'Email sent successfully');
        setSubject('');
        setMessage('');
        console.log(result);
      } else {
        const errorMessage = await response.text();
        Alert.alert('Error', `Failed to send email: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sending the email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File a Complaint</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={submitComplaint}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
