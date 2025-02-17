import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation(); 

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user found</Text>
      </View>
    )
  };
  
  const handleLogout = async () => {
    try {
      await signOut(); 
      await AsyncStorage.removeItem('userSession'); 
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Authentication' }]
      
      });
    } catch (error) {
    console.error('Logout error:', error);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#2BB7F1', '#4CAF50']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBackground}
      />
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-design.png')} style={styles.logo} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.username}>{user.fullName || 'Full Name'}</Text>
      </View>

      <View style={styles.userDetailsContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Email</Text>
          <Text style={styles.infoBoxContent}>{user.emailAddresses[0]?.emailAddress || 'No Email'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Joined Date</Text>
          <Text style={styles.infoBoxContent}>{user.createdAt ? new Date(user.createdAt).toDateString() : 'N/A'}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '40%',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    },
    logoContainer: {
      position: 'absolute',
      top: '3%',
      alignItems: 'center',
    },
    logo: {
      width: 500,
      height: 220,
      resizeMode: 'contain',
    },
    imageContainer: {
      position: 'absolute',
      top: '28%',
      alignItems: 'center',
      paddingVertical: 15,
    },
    profileImage: {
      width: 180,
      height: 180,
      borderRadius: 90,
      borderWidth: 4,
      borderColor: '#FFF',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
      textAlign: 'center',
      fontFamily: 'Times New Roman',
    },
    userDetailsContainer: {
      width: '85%',
      alignItems: 'center',
      marginTop: 475,
    },
    infoBox: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 15,
      marginVertical: 10,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: '95%', // Increased width of user detail boxes
    },
    infoBoxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#555',
    },
    infoBoxContent: {
      fontSize: 14,
      color: '#777',
      marginTop: 5,
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 40, // Reduced width of logout button
      borderRadius: 25,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginTop: 15,
    },
    logoutButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      textAlign: 'center',
    },
});

export default ProfileScreen;
