import React from 'react';
import { SafeAreaView, StyleSheet, Button, Linking } from 'react-native';

export default function WebViewComponent() {
  const openMarkVisitURL = () => {
    const attendanceURL = 'https://script.google.com/macros/s/AKfycbwYfuu3GVf9YfK2IQ2xlJhBiz-E2mYkXYxWKq_AKsnWYv1X3PNsWx-JIaR83Hh2HbIEwQ/exec';
    Linking.openURL(attendanceURL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Mark Attendance" onPress={openMarkVisitURL} />
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

});
