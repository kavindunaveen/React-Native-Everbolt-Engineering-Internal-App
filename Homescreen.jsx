import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.marginRight]}
          onPress={() => navigateToScreen('Attendance')}
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
    marginTop: -250,
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
});

export default HomeScreen;
