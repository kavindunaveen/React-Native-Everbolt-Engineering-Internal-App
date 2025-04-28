import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(); 
      await AsyncStorage.removeItem('UserAuthenticationPassed'); 
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserAuthentication' }], 
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
    height: hp('30%'),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoContainer: {
    position: 'absolute',
    top: hp('3%'),
    alignItems: 'center',
  },
  logo: {
    width: 500,
    height: 220,
    resizeMode: 'contain',
  },
  imageContainer: {
    position: 'absolute',
    top: hp('25%'),
    alignItems: 'center',
    paddingVertical: 15,
  },
  profileImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
    borderWidth: 4,
    borderColor: '#FFF',
  },
  username: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
  },
  userDetailsContainer: {
    width: wp('90%'),
    alignItems: 'center',
    marginTop: hp('55%'),
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: wp('4%'),
    borderRadius: 15,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  infoBoxTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#555',
  },
  infoBoxContent: {
    fontSize: hp('1.8%'),
    color: '#777',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 15,
  },
  logoutButtonText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default ProfileScreen;
