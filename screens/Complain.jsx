import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

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
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        height: 50,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
