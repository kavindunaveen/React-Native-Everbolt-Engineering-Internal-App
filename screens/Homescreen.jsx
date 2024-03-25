import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import statement

function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const openMeetingRoom = () => {
    Linking.openURL('https://outlook.office365.com/owa/calendar/MeetingRoom@everbolt.lk/bookings/');
  };

  const openAttendanceURL = () => {
    Linking.openURL('https://script.google.com/macros/s/AKfycbxwHmfDg1ruo3KPE6rtwdOdM7XARsMapFtmGVDcGtPdXmmhSoUO5snnnxTWtZ_CyXpwpQ/exec');
  };

  const handleLogout = async () => {
    try {
      // Clear login status from AsyncStorage
      await AsyncStorage.removeItem('isLoggedIn');
      // Navigate back to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during logout
      // You may want to display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={openAttendanceURL}
        >
          <Text style={styles.buttonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.marginLeft]}
          onPress={() => navigateToScreen('Quotation')}
        >
          <Text style={styles.buttonText}>Quotation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={() => navigateToScreen('Customerdetails')}
        >
          <Text style={styles.buttonText}>Customer </Text>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.marginLeft]}
          onPress={() => navigateToScreen('Complain')}
        >
          <Text style={styles.buttonText}>Complain</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={openMeetingRoom}
        >
          <Text style={styles.buttonText}>Meeting </Text>
          <Text style={styles.buttonText}>Room</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A3819',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: -50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    width: 130,
    height: 130,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  logoutButton: {
    marginBottom: -80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight:'normal',
    fontSize: 16,
  },
});

export default HomeScreen;
