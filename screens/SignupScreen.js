import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator,
  Image, Alert, KeyboardAvoidingView, ScrollView, Platform, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import ReactNativeModal from 'react-native-modal';

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
  '1018_kusal',
  '4_nilusha',
  '501_nishara',
  '3_malsha',
  '1_kavindu',
  '3_sandani'
];

const SignupScreen = () => {
  const [employee_id, setEmployee_id] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatarPressDisabled, setAvatarPressDisabled] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const validateEmployeeIdFormat = (id) => {
    const regex = /^[0-9]+_[a-zA-Z]+$/;
    return regex.test(id);
  };

  const validateEmployeeId = (id) => {
    return validEmployeeIds.includes(id);
  };

  const handleSignUp = async () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user.email);
      alert('Sign Up successful!');

      // Navigate to the homepage after successful sign-up
      navigation.navigate('Homescreen');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Sign Up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarPress = () => {
    if (avatarPressDisabled) return;

    console.log('Avatar pressed!');
    setAvatarPressDisabled(true);
    setIsModalVisible(true);

    setTimeout(() => {
      setAvatarPressDisabled(false);
    }, 1000); // Disable for 1 second to debounce
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      // Here you can handle the selected image URI
    }
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -300}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </TouchableOpacity>
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
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>Already have an account? Log In</Text>
        </TouchableOpacity>
        <ReactNativeModal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => setIsModalVisible(false)}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={pickImageFromGallery}>
              <Text style={styles.modalOption}>Choose Photo from Gallery</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  signupButton: {
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
  loadingIndicator: {
    marginTop: 20,
  },
  switchText: {
    color: '#fff',
    marginTop: 20,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 10,
  },
});
