import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  useEffect(() => {
    const initializeFirebaseAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Authentication Persistence Enabled");
      } catch (error) {
        console.log("Error setting persistence: ", error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          // User is logged in, navigate to homepage
          navigation.navigate('Homescreen');
        }
      } catch (error) {
        console.log('Error retrieving login status:', error);
      }
    };

    checkLoginStatus(); // Call the check function here
    initializeFirebaseAuth();
  }, []); // This effect runs only once after component mounts

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Navigate to the homepage after successful sign-in
      navigation.navigate('Homescreen');

      // Store login status in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.log(error);
      alert('Sign In failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your email');
    } catch (error) {
      console.log(error);
      alert('Sign Up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize='none' onChangeText={(text) => setPassword(text)} />

        {loading ? <ActivityIndicator size="large" color="#0000ff" />
          : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createAccountButton} onPress={signUp}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 0,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#F4BC1C',
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 10,
    },
    createAccountButton: {
        backgroundColor: '#1A3819',
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
