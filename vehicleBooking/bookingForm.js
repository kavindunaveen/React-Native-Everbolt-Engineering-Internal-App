import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleSubmit = () => {
        if (!name || !dateTime) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        
        axios.post('http://localhost:5000/booking', {
            name,
            dateTime
        })
        .then(response => {
            Alert.alert('Success', 'Booking request sent successfully');
        })
        .catch(error => {
            Alert.alert('Error', 'Failed to send booking request');
        });
    };

    return (
        <View>
            <TextInput
                placeholder="Your Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Date and Time"
                value={dateTime}
                onChangeText={setDateTime}
                style={styles.input}
            />
            <Button title="Book Vehicle" onPress={handleSubmit} />
        </View>
    );
};

const styles = {
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
};

export default BookingForm;
