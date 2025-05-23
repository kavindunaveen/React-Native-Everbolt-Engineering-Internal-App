import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, TouchableOpacity, Image, Linking, 
  Animated, Easing, Dimensions, SafeAreaView, StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@clerk/clerk-expo'; // Import Clerk user authentication

const { width } = Dimensions.get('window');

function HomeScreen() {
  const { user } = useUser(); // Get user details from Clerk
  const navigation = useNavigation();
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const fetchAvatarUri = async () => {
      if (user?.imageUrl) {
        setAvatarUri(user.imageUrl); // Set the profile image from Clerk
      } else {
        const storedAvatarUri = await AsyncStorage.getItem('avatar_uri');
        if (storedAvatarUri) {
          setAvatarUri(storedAvatarUri);
        }
      }
    };

    fetchAvatarUri();
  }, [user]); // Re-run when the user changes

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const navigateToNotificationScreen = () => {
    navigation.navigate('NotificationScreen');
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1A3819' }}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />

      <View style={styles.container}>

        {/* Profile Button (Top Right) */}
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfile}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.profileImage} />
          ) : (
            <FontAwesome5 name="user-circle" size={40} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        {/* Notification Button (Top Left) */}
        <TouchableOpacity style={styles.notificationButton} onPress={navigateToNotificationScreen}>
          <FontAwesome5 name="bell" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        {/* Buttons Grid */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Attendance')} onPressIn={animateButton}>
            <FontAwesome5 name="clipboard-list" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quotation')} onPressIn={animateButton}>
            <FontAwesome5 name="file-invoice-dollar" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Quotation</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Customerdetails')} onPressIn={animateButton}>
            <FontAwesome5 name="user-friends" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Customer Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Complain')} onPressIn={animateButton}>
            <FontAwesome5 name="exclamation-triangle" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Complain</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://outlook.office365.com/owa/calendar/MeetingRoom@everbolt.lk/bookings/')} onPressIn={animateButton}>
            <FontAwesome5 name="calendar-alt" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Meeting Room</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VisitSelection')} onPressIn={animateButton}>
            <FontAwesome5 name="clipboard-list" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Mark Visit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {/* Locked Gate Pass Button */}
          <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled={true}>
            <FontAwesome5 name="id-badge" size={24} color="#B0B0B0" />
            <Text style={styles.disabledButtonText}>Gate Pass</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  notificationButton: {
    position: 'absolute',
    top: 70,
    left: 10,
    padding: 10,
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
  disabledButton: {
    backgroundColor: '#555555', 
    opacity: 0.6, 
  },
  disabledButtonText: {
    color: '#B0B0B0', 
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
