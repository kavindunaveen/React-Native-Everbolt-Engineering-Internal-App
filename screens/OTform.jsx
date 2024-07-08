import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const OTForm = () => {
  const [employee, setEmployee] = useState('');
  const [department, setDepartment] = useState('');
  const [otPeriod, setOtPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');

  const employees = ['Kavinudu', 'Johne', 'Jenny'];
  const departments = ['Sales', 'Marketing', 'Stores'];
  const otPeriods = ['1h', '2h', '3h', '4h'];
  const managers = ['Mr. Kevin', 'Mr. Bobby', 'Mr. Naveen'];

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted!');
    console.log('Employee:', employee);
    console.log('Department:', department);
    console.log('OT Period:', otPeriod);
    console.log('Location:', location);
    console.log('Manager:', manager);
    // Reset form fields if needed
    setEmployee('');
    setDepartment('');
    setOtPeriod('');
    setLocation('');
    setManager('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Employee Name</Text>
      <Picker
        style={styles.input}
        selectedValue={employee}
        onValueChange={(itemValue) => setEmployee(itemValue)}
      >
        <Picker.Item label="Select Employee" value="" />
        {employees.map((emp, index) => (
          <Picker.Item key={index} label={emp} value={emp} />
        ))}
      </Picker>

      <Text style={styles.label}>Department</Text>
      <Picker
        style={styles.input}
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
      >
        <Picker.Item label="Select Department" value="" />
        {departments.map((dept, index) => (
          <Picker.Item key={index} label={dept} value={dept} />
        ))}
      </Picker>

      <Text style={styles.label}>OT Time Period</Text>
      <Picker
        style={styles.input}
        selectedValue={otPeriod}
        onValueChange={(itemValue) => setOtPeriod(itemValue)}
      >
        <Picker.Item label="Select OT Period" value="" />
        {otPeriods.map((period, index) => (
          <Picker.Item key={index} label={period} value={period} />
        ))}
      </Picker>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <Text style={styles.label}>Manager Approval</Text>
      <Picker
        style={styles.input}
        selectedValue={manager}
        onValueChange={(itemValue) => setManager(itemValue)}
      >
        <Picker.Item label="Select Manager" value="" />
        {managers.map((mgr, index) => (
          <Picker.Item key={index} label={mgr} value={mgr} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#F4BC1C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
