import { WebView } from 'react-native-webview';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function WebViewComponent() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLSf2fZwhYEvagVoSB9K_92J39dXsxNSw8EWEeICNcuHP21ZU-A/viewform' }}
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
