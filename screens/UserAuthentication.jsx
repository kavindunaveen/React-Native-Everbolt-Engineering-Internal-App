import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// List of authorized phone numbers (converted to 10-digit format with '0' prefix)
const authorizedNumbers = [
  '0777425964', '0770744794', '0770744918', '0742877537', '0770744934',
  '0769062500', '0778871280', '0761457332', '0771677222', '0766630223',
  '0765400084', '0770402060', '0766481100', '0763873973', '0768851100',
  '0775453374', '0774142827', '0774139563', '0770335260', '0775759715',
  '0778827030', '0766014730', '0769049969', '0763177595', '0770312152',
  '0770745231', '0768841100', '0766431100', '0773393208', '0761409270',
  '0774436369', '0765399406', '0760335062', '0778855743', '0775226489',
  '0774955801', '0741684564', '0743921220', '0767208868', '0773103518',
  '0773081374', '0774143384', '0770792513', '0742865344',
  '0765563315', '0763527245', '0763874007', '0764816205', '0742866901',
  '0774137988', '0742865346', '0769156426', '0765273205', '0743048165',
  '0775027617', '0743921222', '0769640726', '0764377260', '0760266221',
  '0776572227', '0761023908', '0740628044'
];

const UserAuthentication = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const storedPhoneNumber = await AsyncStorage.getItem('userPhoneNumber');
      if (storedPhoneNumber && authorizedNumbers.includes(storedPhoneNumber)) {
        navigation.replace('Homescreen'); // Redirect to Home if logged in
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    const formattedPhone = phoneNumber.startsWith('0') ? phoneNumber : '0' + phoneNumber;
    if (authorizedNumbers.includes(formattedPhone.trim())) {
      // Store session and redirect
      await AsyncStorage.setItem('userPhoneNumber', formattedPhone);
      navigation.replace('Signup');
    } else {
      Alert.alert("Access Denied", "This number is not authorized.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default UserAuthentication;
