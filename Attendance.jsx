import { WebView } from 'react-native-webview';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function WebViewComponent() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://script.google.com/macros/s/AKfycbwpPB88QFFlHOp5eVA1FygHnRIsZ2JmPmiBO4RD0MAAO23t8onBr_lItVjDBt-1mVoc/exec' }}
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
