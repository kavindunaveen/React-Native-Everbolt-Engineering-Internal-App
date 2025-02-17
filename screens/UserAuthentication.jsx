import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, 
  StyleSheet, Image, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform 
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

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
  '0776572227', '0761023908', '0740628044', '0723881260'
];

const UserAuthentication = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const formattedPhone = phoneNumber.startsWith('0') ? phoneNumber : '0' + phoneNumber;

    if (authorizedNumbers.includes(formattedPhone.trim())) {
      navigation.replace('Signup');
    } else {
      Alert.alert("Access Denied", "This number is not authorized.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#006400' }}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        
        {/* Logo at the Top */}
        <Image source={require('../assets/logo-design-2.png')} style={styles.logo} />

        {/* Centered Input Field & Button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#ccc"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers everything vertically
    alignItems: 'center', // Centers horizontally
  },
  logo: {
    width: 410,
    height: 255,
    marginBottom: 250,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#F4BC1C',
    borderRadius: 25,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#F4BC1C',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '75%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserAuthentication;
