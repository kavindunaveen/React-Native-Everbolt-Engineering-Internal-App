import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MarkVisit = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('EverboltEngineering'); // Ensure this matches the screen name in the navigator
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mark Your Visit:</Text>

            {/* Button with Logo on the Left */}
            <TouchableOpacity style={styles.button1} onPress={handlePress}>
                <Text style={styles.buttonText}>Everbolt Engineering</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30, // Increased margin for better spacing
        textAlign: 'center',
        color: 'black'
    },
    button1: {
        backgroundColor: 'darkgreen',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MarkVisit;
