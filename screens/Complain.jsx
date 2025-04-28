import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function Complain() {
    const [customerName, setCustomerName] = useState('');
    const [partNo, setPartNo] = useState('');
    const [complaint, setComplaint] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to track loading

    const sendComplaint = async () => {
        if (!customerName || !complaint) {
            Alert.alert('දෝෂයක්', 'කරුණාකර අවශ්‍ය සියලු තොරතුරු පුරවන්න');
            return;
        }
    
        setIsLoading(true); // Start loading
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxzJfcVlaaJVWWAJU-706aCFzRA6LNT8pOeYcqDweB3ByuQbOtNopXqrmoGkzvhra9aMw/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `customerName=${encodeURIComponent(customerName)}&partNo=${encodeURIComponent(partNo)}&complaint=${encodeURIComponent(complaint)}`
            });
    
            const result = await response.text();
            if (response.ok) {
                Alert.alert('සාර්ථකයි', 'ඔබගේ පැමිණිල්ල සාර්ථකව යවා ඇත!');
                setCustomerName('');
                setPartNo('');
                setComplaint('');
            } else {
                throw new Error(result);
            }
        } catch (error) {
            console.error('Error sending complaint:', error);
            Alert.alert('දෝෂයක්', `දෝෂයක් ඇතිවිය: ${error.toString()}`);
        } finally {
            setIsLoading(false); // Stop loading regardless of the outcome
        }
    };    
    
    return (
        <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>පැමිණිලි පුරවන්න:</Text>
    
    <TextInput
      style={styles.input}
      placeholder="පාරිභෝගිකයා/සමාගමෙ නම"
      value={customerName}
      onChangeText={setCustomerName}
    />
    
    <TextInput
      style={styles.input}
      placeholder="ආංශ අංකය (අත්‍යාවශ්‍ය නොවේ)"
      value={partNo}
      onChangeText={setPartNo}
    />
    
    <TextInput
      style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
      placeholder="පැමිණිල්ලේ විස්තරය"
      value={complaint}
      onChangeText={setComplaint}
      multiline
    />
    
    {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      <TouchableOpacity style={styles.button} onPress={sendComplaint}>
        <Text style={styles.buttonText}>පැමිණිල්ල යවන්න</Text>
      </TouchableOpacity>
    )}
  </ScrollView>
  </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 16,
        backgroundColor: 'white',
        color: 'black',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
