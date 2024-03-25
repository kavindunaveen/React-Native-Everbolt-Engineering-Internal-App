import React from 'react';
import { SafeAreaView, StyleSheet, Button, Linking } from 'react-native';

export default function WebViewComponent() {
  const openAttendanceURL = () => {
    const attendanceURL = 'https://script.google.com/macros/s/AKfycbxwHmfDg1ruo3KPE6rtwdOdM7XARsMapFtmGVDcGtPdXmmhSoUO5snnnxTWtZ_CyXpwpQ/exec';
    Linking.openURL(attendanceURL);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Mark Attendance" onPress={openAttendanceURL} />
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
