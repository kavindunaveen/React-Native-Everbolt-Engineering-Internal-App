import { WebView } from 'react-native-webview';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function WebViewComponent() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://script.google.com/macros/s/AKfycbxwHmfDg1ruo3KPE6rtwdOdM7XARsMapFtmGVDcGtPdXmmhSoUO5snnnxTWtZ_CyXpwpQ/exec' }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
