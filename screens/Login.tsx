import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validEmployeeIds = [
  '1_prabath',
  '1_nishantha',
  '2_keshan',
  '1_sammani',
  '2_kithsiri',
  '3_malsha',
  '4_nilusha',
  '3_sulochana',
  '4_rajitha',
  '10_shanaka',
  '11_asangi',
  '18_hashan',
  '20_ramith',
  '30_pavithra',
  '49_sanduni',
  '55_venusha',
  '57_dilrukshi',
  '60_roshan',
  '64_pasindu',
  '67_sasindu',
  '72_keith',
  '75_nawoda',
  '76_sayuri',
  '77_danushi',
  '78_hansini',
  '79_pradeesha',
  '80_sandya',
  '83_kalpa',
  '84_pesala',
  '86_nimesha',
  '87_madhushi',
  '88_sumith',
  '89_udara',
  '90_divyanjalee',
  '91_chaminda',
  '93_widura',
  '95_sandaru',
  '96_manjula',
  '97_madushani',
  '307_chaminda',
  '318_uditha',
  '319_welikala',
  '320_dilanga',
  '321_tharindu',
  '323_erandi',
  '324_chamara',
  '325_piyumal',
  '326_aruna',
  '329_chathurika',
  '330_pasindu',
  '331_renuka',
  '513_yunal',
  '1018_kusal'
];

const Login = ({ navigation }) => {
  const [employee_id, setEmployee_id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmployeeIdFormat = (id) => {
    const regex = /^[0-9]+_[a-zA-Z]+$/;
    return regex.test(id);
  };

  const validateEmployeeId = (id) => {
    return validEmployeeIds.includes(id);
  };

  const handleLogin = async () => {
    if (!validateEmployeeIdFormat(employee_id)) {
      Alert.alert('Invalid Employee ID', 'Employee ID must be in the format: employeeid_firstname');
      return;
    }
  
    if (!validateEmployeeId(employee_id)) {
      Alert.alert('Invalid Employee ID', 'Employee ID is not recognized.');
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user.email);
  
      // Save employee ID to AsyncStorage
      await AsyncStorage.setItem('employee_id', employee_id);
  
      // Log the employee ID to the console
      console.log('Employee ID:', employee_id);
  
      navigation.navigate('Homescreen');
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };  

  const handleSignup = () => {
    navigation.navigate('Signup'); // Navigate to the SignupScreen
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Employee ID"
          autoCapitalize="none"
          value={employee_id}
          onChangeText={setEmployee_id}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1A3819',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 50,
    marginBottom: 70,
    alignSelf: 'center',
  },
  input: {
    marginVertical: 10,
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
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
  signupText: {
    color: '#fff',
    marginTop: 20,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

