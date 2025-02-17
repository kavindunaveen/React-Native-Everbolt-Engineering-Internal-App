import React, { useState, useEffect } from 'react';
import { 
  View, Text, ActivityIndicator, 
  ScrollView, Platform, KeyboardAvoidingView, Alert, StyleSheet, TouchableOpacity, Image 
} from 'react-native';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { useClerk } from '@clerk/clerk-expo';
import { SafeAreaView, StatusBar } from 'react-native';

const SignupScreen = () => {
  const redirectUri = AuthSession.makeRedirectUri({
    native: 'everboltapp://oauthredirect',
    useProxy: false, 
  });  

  const { startOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
    redirectUrl: redirectUri,
  });

  const { isSignedIn } = useUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  
    const checkAuthStatus = async () => {
      const userSession = await AsyncStorage.getItem('userSession');
  
      if (isSignedIn && userSession) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Homescreen' }],
        });
      } else {
        await AsyncStorage.removeItem('userSession'); // Ensure session is cleared
      }
    };
  
    checkAuthStatus();
  }, [isSignedIn]);
  

  const onGoogleSignInPress = async () => {
    setLoading(true);
    try {
      const { createdSessionId } = await startOAuthFlow();
      if (createdSessionId) {
        await AsyncStorage.setItem('userSession', 'true'); // Persist session after login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Homescreen' }],
        });
      }
    } catch (err) {
      console.error('Error during Google Sign-In:', err);
      Alert.alert('Google Sign-In failed', err.errors ? err.errors[0].message : err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const { signOut } = useClerk();

const handleLogout = async () => {
  try {
    await signOut(); 
    await AsyncStorage.removeItem('userSession'); 

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signup' }],
      });
    }, 500);
  } catch (error) {
    console.error('Logout error:', error);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#006400' }}>
    <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../assets/logo-design-2.png')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onGoogleSignInPress}>
          <Text style={styles.buttonText}>Sign Up with Google</Text>
        </TouchableOpacity>
        <Image source={require('../assets/google.png')} style={styles.googleLogo} />
      </View>
    </ScrollView>
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F4BC1C',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 410,
    height: 255,
    marginBottom: 20,
    marginTop: -400,
  },
  googleLogo: {
    width: 220,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contain',
    overflow: 'visible',
  }
});

export default SignupScreen;