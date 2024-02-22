import { WebView } from 'react-native-webview';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function WebViewComponent() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://forms.gle/dcXK2H8QtKqobDpu8' }}
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
