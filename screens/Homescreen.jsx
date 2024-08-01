import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, Animated, Easing, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

function HomeScreen() {
  const [avatarUri, setAvatarUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAvatarUri = async () => {
      const storedAvatarUri = await AsyncStorage.getItem('avatar_uri');
      if (storedAvatarUri) {
        setAvatarUri(storedAvatarUri);
      }
    };
    fetchAvatarUri();
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
 
  const openMeetingRoom = () => {
    Linking.openURL('https://outlook.office365.com/owa/calendar/MeetingRoom@everbolt.lk/bookings/');
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen'); // Navigate to ProfileScreen
  };
  const navigateToNotificationScreen = () => {
    navigation.navigate('NotificationScreen'); // Navigate to NotificationScreen
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
      <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.profileImage} />
        ) : (
          <FontAwesome5 name="user-circle" size={24} color="#FFFFFF" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.notificatoinButton} onPress={navigateToNotificationScreen}>
        <FontAwesome5 name="bell" size={24} color="#FFFFFF" />
      </TouchableOpacity>

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
          onPress={() => navigateToScreen('MarkVisit')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="clipboard-list" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Mark Visit</Text>
        </TouchableOpacity>
     </View>
            <View style={styles.row}>
       {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen('Leaveform')}
          onPressIn={animateButton}
        >
          <FontAwesome5 name="clock" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>OT Request</Text>
        </TouchableOpacity>*/}
      </View> 
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
  profileButton: {
    position: 'absolute',
    top: 70,
    right: 10,
    padding: 10,
  },
  profileImage: {
    width: 40, // Reduced size
    height: 40, // Reduced size
    borderRadius: 20, // Adjusted for the reduced size
    borderWidth: 0, // Border width
    borderColor: '#000000', // Black border
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
  notificatoinButton: {
    position: 'absolute',
    top: 70,
    left: 10,
    padding: 10,
  },
});

export default HomeScreen;
