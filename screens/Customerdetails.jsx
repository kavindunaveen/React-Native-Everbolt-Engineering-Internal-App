import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function Customerdetails() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [other, setOther] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Format phone number as "071 370 2074"
  const formatPhoneNumber = (input) => {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return input;
  };

  const handleChangeNumber = (input) => {
    const formattedNumber = formatPhoneNumber(input);
    setNumber(formattedNumber);
  };

  async function Submit() {
    // Validation check
    if (name.trim() === '' || number.trim() === '') {
      Alert.alert('Error', 'Name and Phone Number are required fields.');
      return;
    }

    if (!/^\d{10}$/.test(number.trim().replace(/\s/g, ''))) {
      Alert.alert('Error', 'Phone Number must be a 10-digit number.');
      return;
    }

    const contact = {
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.PhoneNumbers]: [{ number: number.replace(/\s/g, '') }],
      [Contacts.Fields.Emails]: [{ email: address }],
      [Contacts.Fields.Note]: other,
    };

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        await Contacts.addContactAsync(contact);
        console.log('Contact added successfully');

        // Clearing form fields
        setName('');
        setNumber('');
        setAddress('');
        setOther('');
        setShowSuccessModal(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);

        // Post data to Google Sheets
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Number', number.replace(/\s/g, ''));
        formData.append('Address', address);
        formData.append('Other', other);

        fetch('https://script.google.com/macros/s/AKfycbzOH8pM_lXzPKZHUvr11CAbGzTnqFHRBWw9xHlvNLbsiWY3SyiL1-h8Ahm8nhJVORSD-w/exec', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data)) // Log response from Google Sheets
        .catch(error => console.error('Error posting to Google Sheets:', error));
      } else {
        console.log('Permission to access contacts denied');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : null} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300} 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Enter Customer Details</Text>
        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Name" 
            value={name} 
            onChangeText={text => setName(text)} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Phone Number" 
            value={number} 
            onChangeText={handleChangeNumber} 
            keyboardType="phone-pad" // Set keyboardType to "phone-pad"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={address} 
            onChangeText={text => setAddress(text)} 
          />
          <TextInput 
            style={[styles.input, {height: 80}]} 
            placeholder="Other Details" 
            multiline
            value={other} 
            onChangeText={text => setOther(text)} 
          />
          <TouchableOpacity style={styles.button} onPress={Submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        {showSuccessModal && (
          <View style={[styles.successModal, {top: (screenHeight - 100) / 2, left: (screenWidth - 250) / 2}]}>
            <Text style={styles.successText}>Contact Saved to your Contact List and to Our Database Successfully.</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successModal: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    height: 100,
  },
  successText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});