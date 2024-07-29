import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
<<<<<<< HEAD
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
=======
import { MaterialIcons } from '@expo/vector-icons'; // Import icons
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [avatarUri, setAvatarUri] = useState(null);
=======
  const [avatarUri, setAvatarUri] = useState(null); // State for avatar image URI
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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

<<<<<<< HEAD
=======
          // Retrieve employee ID and avatar URI from AsyncStorage
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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
<<<<<<< HEAD
=======
    // Request permission to access media library
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

<<<<<<< HEAD
=======
    // Show options for picking an image from gallery
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
<<<<<<< HEAD
      await AsyncStorage.setItem('avatar_uri', uri);
    }
  };

  const handleRemoveAvatar = async () => {
    setAvatarUri(null);
    await AsyncStorage.removeItem('avatar_uri');
  };

=======
      await AsyncStorage.setItem('avatar_uri', uri); // Store the picked image URI
    }
  };

>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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

<<<<<<< HEAD
=======
  // Verify employee_id is defined and is a string
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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
<<<<<<< HEAD
                <Text style={styles.avatarPlaceholderText}>Add your profile photo</Text>
              </View>
            )}
          </TouchableOpacity>
          {avatarUri && (
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAvatar}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          )}
=======
                <Text style={styles.avatarText}>{user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}</Text>
              </View>
            )}
          </TouchableOpacity>
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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
<<<<<<< HEAD
    justifyContent: 'space-between',
=======
    justifyContent: 'space-between', // Ensure space is evenly distributed
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
  },
  frontText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
<<<<<<< HEAD
    marginVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
=======
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
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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
    borderColor: '#FF6347',
  },
  avatarPlaceholder: {
<<<<<<< HEAD
    width: 180,
    height: 180,
    borderRadius: 90,
=======
    width: 180, // Increased size of avatar placeholder
    height: 180,
    borderRadius: 90, // Adjusted border radius to match increased size
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
<<<<<<< HEAD
  avatarPlaceholderText: {
    fontSize: 20,
=======
  avatarText: {
    fontSize: 90, // Increased font size for placeholder text
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
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
  infoContainer: {
    alignSelf: 'flex-start', // Align text to the left
    marginTop: 20, // Move user details up
    marginLeft: 20, // Bring details slightly to the right
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
<<<<<<< HEAD
    marginBottom: 25,
=======
    marginBottom: 25, // Spacing between text lines
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
  },
  email: {
    fontSize: 18,
    color: '#000',
<<<<<<< HEAD
    marginBottom: 25,
=======
    marginBottom: 25, // Spacing between text lines
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
  },
  userId: {
    fontSize: 20,
    color: '#006400',
<<<<<<< HEAD
    marginBottom: 25,
=======
    marginBottom: 25, // Spacing between text lines
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
    fontWeight: 'bold',
  },
  codeContent: {
    fontSize: 17,
<<<<<<< HEAD
    marginBottom: 25,
=======
    marginBottom: 25, // Spacing between text lines
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
<<<<<<< HEAD
    alignSelf: 'center',
    marginBottom: 100,
=======
    alignSelf: 'center', // Center logout button
    marginBottom: 100, // Adjusted margin to bring button closer to profile container
>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

<<<<<<< HEAD
=======

>>>>>>> b9d02a4091a30ff17ca27af0878f91a2dc97d5cb
export default ProfileScreen;
