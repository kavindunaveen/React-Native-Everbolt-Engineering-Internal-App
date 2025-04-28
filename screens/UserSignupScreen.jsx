import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ActivityIndicator,
  ScrollView, Alert, StyleSheet, TouchableOpacity, Image
} from 'react-native';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';

const UserLoginScreen = () => {
  const navigation = useNavigation();
  const { signIn, setActive } = useSignIn();
  const { isSignedIn, isLoaded } = useUser();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    if (isLoaded && isSignedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Homescreen' }],
      });
    }
  }, [isSignedIn, isLoaded]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Homescreen' }],
        });
      }
    } catch (err) {
      console.error('Login Error:', err);
      Alert.alert(
        'Login Failed',
        err.errors?.[0]?.message || err.message || 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#006400' }}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/logo-design-2.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> :
              <Text style={styles.buttonText}>Login</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.toggleText}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    bottom: -250,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    bottom: -250,
  },
  button: {
    backgroundColor: '#F4BC1C',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: 'white',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 410,
    height: 255,
    marginBottom: 20,
    marginTop: -400,
    bottom: -100,
  },
});

export default UserLoginScreen;
