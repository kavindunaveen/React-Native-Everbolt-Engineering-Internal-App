import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function Customerdetails() {
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [everboltContactPerson, setEverboltContactPerson] = useState('');
  const [other, setOther] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  async function Submit() {
    // Validation check
    if (company.trim() === '' || contactPerson.trim() === '' || everboltContactPerson.trim() === '' || complaintType.trim() === '') {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Company', company);
    formData.append('Contact_person_customer_name', contactPerson);
    formData.append('Complaint_type', complaintType);
    formData.append('Everbolt_contact_person', everboltContactPerson);
    formData.append('Other', other);

    try {
      // Post data to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/AKfycbw594DUKzqI4UlKGczx3X7VmOIkAr9xXgoOCUMBSXnOUUoAS-m1jOHtoQHzCC0M0wG3/exec', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Data submitted successfully');

        // Clearing form fields
        setCompany('');
        setContactPerson('');
        setComplaintType('');
        setEverboltContactPerson('');
        setOther('');
        setShowSuccessModal(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : null} 
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300} 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Complain Form</Text>

        <View style={styles.form}>

          <TextInput 
            style={styles.input} 
            placeholder="Company" 
            value={company} 
            onChangeText={text => setCompany(text)} 
          />

          <TextInput 
            style={styles.input} 
            placeholder="Contact Person" 
            value={contactPerson} 
            onChangeText={text => setContactPerson(text)} 
          />

          {/* Complaint Type Dropdown */}
          <View style={styles.dropdown}>
            <Picker
              selectedValue={complaintType}
              onValueChange={(itemValue, itemIndex) =>
                setComplaintType(itemValue)
              }>
              <Picker.Item label="Complain Type" value="" />
              <Picker.Item label="Item Mismatch" value="Item Mismatch" /> 
              <Picker.Item label="PO Expire" value="PO Expire" />
              <Picker.Item label="Item Damage" value="Item Damage" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          {/* Everbolt Contact Person */}
          <TextInput 
            style={styles.input} 
            placeholder="Everbolt Contact Person" 
            value={everboltContactPerson} 
            onChangeText={text => setEverboltContactPerson(text)} 
          />

          {/* Other Details */}
          <TextInput 
            style={[styles.input, {height: 80}]} 
            placeholder="Other Details" 
            multiline
            value={other} 
            onChangeText={text => setOther(text)} 
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={Submit}>
            <Text style={styles.buttonText}>File a complaint</Text>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        {showSuccessModal && (
          <View style={[styles.successModal, {top: (screenHeight - 100) / 2, left: (screenWidth - 250) / 2}]}>
            <Text style={styles.successText}>Complaint Submitted Successfully.</Text>
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
    backgroundColor: 'red',
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
  dropdown: {
    borderColor: '#fff',
    borderWidth: 20,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  selectedItem: {
    backgroundColor: 'lightgray',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
