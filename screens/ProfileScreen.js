import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(true);
  const [avatarUri, setAvatarUri] = useState(null); // State for avatar image URI
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

          // Retrieve employee ID and avatar URI from AsyncStorage
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
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Show options for picking an image from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      await AsyncStorage.setItem('avatar_uri', uri); // Store the picked image URI
    }
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

  // Verify employee_id is defined and is a string
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
                <Text style={styles.avatarText}>{user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}</Text>
              </View>
            )}
          </TouchableOpacity>
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
    justifyContent: 'space-between', // Ensure space is evenly distributed
  },
  frontText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Adjusted margin to bring text down
  },
  profileContainer: {
    alignItems: 'center', // Center profile container
    marginBottom: 20, // Adjusted margin for spacing
  },
  avatarContainer: {
    alignItems: 'center', // Center avatar
    marginBottom: 55, // Increased spacing between avatar and profile text
    marginLeft: 10,
  },
  avatar: {
    width: 180, // Increased size of avatar
    height: 180,
    borderRadius: 90, // Adjusted border radius to match increased size
    borderWidth: 3, // Thickness of the border
    borderColor: '#FF6347', // Border color
  },
  avatarPlaceholder: {
    width: 180, // Increased size of avatar placeholder
    height: 180,
    borderRadius: 90, // Adjusted border radius to match increased size
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 90, // Increased font size for placeholder text
    color: '#fff',
  },
  infoContainer: {
    alignSelf: 'flex-start', // Align text to the left
    marginTop: 20, // Move user details up
    marginLeft: 20, // Bring details slightly to the right
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 25, // Spacing between text lines
  },
  email: {
    fontSize: 18,
    color: '#000',
    marginBottom: 25, // Spacing between text lines
  },
  userId: {
    fontSize: 20,
    color: '#006400',
    marginBottom: 25, // Spacing between text lines
    fontWeight: 'bold',
  },
  codeContent: {
    fontSize: 17,
    marginBottom: 25, // Spacing between text lines
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    alignSelf: 'center', // Center logout button
    marginBottom: 100, // Adjusted margin to bring button closer to profile container
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ProfileScreen;
