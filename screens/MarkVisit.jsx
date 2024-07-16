import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const MarkVisit = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>

    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select your Company:</Text>
      <TouchableOpacity style={styles.button1} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbyx1k0hfihZhN1ev7ajYs3mVbuwQ1DJCMiBMOV_ClXbFowe2XkmNim5-fgzQwl3U8OM/exec')}>
        <Text style={styles.buttonText}>Everbolt Engineering Visit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbyoQpNNIvrut13r7INrQXuIi6V8rmbrjEhPRgDUCIxzCTJHMTqKT9nCg4o8nLkCcaKX/exec')}>
        <Text style={styles.buttonText}>Everbolt Services Visit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button3} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbwa9nAK6F7HD_cFRJwsOksDUMJ3NiBkqFp1GSktK8Tg_yccMmSL4AftDwYl5E6WP18fgw/exec')}>
        <Text style={styles.buttonText}>Everbolt Foods Visit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button4} onPress={() => handlePress('https://script.google.com/macros/s/AKfycbw0ElxFb01Gz_0-UtZu9A18jUVYWkD7x7oiTG6P5DyuaG5TACzHDBWgSrns4SqNm8tL/exec')}>
        <Text style={styles.buttonText}>CDI Electricals Visit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button1: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },

  button2: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  button3: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  button4: {
    backgroundColor: '#089fb1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MarkVisit;
