import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(true);
  const [avatarUri, setAvatarUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            uid: firebaseUser.uid,
          });

          const storedEmployeeId = await AsyncStorage.getItem('employee_id');
          if (storedEmployeeId) {
            setEmployeeId(storedEmployeeId);
          }

          const storedAvatarUri = await AsyncStorage.getItem('avatar_uri');
          if (storedAvatarUri) {
            setAvatarUri(storedAvatarUri);
          }
        } else {
          navigation.navigate('Login');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAvatarPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      await AsyncStorage.setItem('avatar_uri', uri);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarUri(null);
    await AsyncStorage.removeItem('avatar_uri');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user found</Text>
      </View>
    );
  }

  const isEmployeeIdString = typeof employeeId === 'string';
  const [userId, username] = isEmployeeIdString ? employeeId.split('_') : ['Unknown', 'Unknown'];

  return (
    <View style={styles.container}>
      <Text style={styles.frontText}>User Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleAvatarPress}>
            {avatarUri || user.photoURL ? (
              <Image source={{ uri: avatarUri || user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>Add your profile photo</Text>
              </View>
            )}
          </TouchableOpacity>
          {avatarUri && (
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAvatar}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>Employee ID: {employeeId.charAt(0).toUpperCase() + employeeId.slice(1)}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Text style={styles.codeContent}>User ID: {user.uid}</Text>
          <Text style={styles.username}>Everbolt Engineering (Pvt) Ltd</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 20,
    justifyContent: 'space-between',
  },
  frontText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 55,
    marginLeft: 10,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: 'green',
  },
  avatarPlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 25,
  },
  email: {
    fontSize: 18,
    color: '#000',
    marginBottom: 25,
  },
  userId: {
    fontSize: 20,
    color: '#006400',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  codeContent: {
    fontSize: 17,
    marginBottom: 25,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 100,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
