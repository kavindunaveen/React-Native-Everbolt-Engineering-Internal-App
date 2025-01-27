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
            Alert.alert('Error', 'Please fill in all required fields');
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
                Alert.alert('Success', 'Complaint sent successfully');
                setCustomerName('');
                setPartNo('');
                setComplaint('');
            } else {
                throw new Error(result);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            Alert.alert('Error', `An error occurred: ${error.toString()}`);
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
            <Text style={styles.title}>File a Complaint</Text>
            <TextInput
                style={styles.input}
                placeholder="Customer/Company Name"
                value={customerName}
                onChangeText={setCustomerName}
            />
            <TextInput
                style={styles.input}
                placeholder="Part No (Optional)"
                value={partNo}
                onChangeText={setPartNo}
            />
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder="Your Complaint"
                value={complaint}
                onChangeText={setComplaint}
                multiline
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={sendComplaint}>
                    <Text style={styles.buttonText}>Submit Complaint</Text>
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
