import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const openMeetingRoom = () => {
    Linking.openURL('https://outlook.office365.com/owa/calendar/MeetingRoom@everbolt.lk/bookings/');
  };

  const openMarkVisitURL = () => {
    Linking.openURL('https://script.google.com/macros/s/AKfycbybQPlGuIO13nISRQnTMmYtetFrAcEfHJ4TWkilVOuDxcqfbDREEJAp78GSHjxmNhHH/exec');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const buttonScale = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Attendance')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="clipboard-list" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Quotation')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="file-invoice-dollar" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Quotation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Customerdetails')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="user-friends" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Customer Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Complain')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="exclamation-triangle" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Complain</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={openMeetingRoom}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="calendar-alt" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Meeting Room</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={openMarkVisitURL}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="marker" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Visit Mark</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity> */}
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
    width: width * 0.6,
    height: width * 0.3,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    width: 120,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
