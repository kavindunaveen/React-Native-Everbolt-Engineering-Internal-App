import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth'; // Import the signOut method

const UserProfile = ({ userEmail }) => {

  unregisterIndieDevice('NOAVabBmdhUKHBVII4rotEpMLpv1', 22555, 'NDU2cMCcGz7KxxDdDGEG4R');

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH); // Call the signOut method
      // Optionally, you can redirect the user to the login screen here
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>   
      <Text style={styles.email}>Logged in as: {userEmail}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F4BC1C',
  },
  email: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#1A3819',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
