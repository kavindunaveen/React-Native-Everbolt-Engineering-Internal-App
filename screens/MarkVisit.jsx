import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MarkVisit = () => {
    const navigation = useNavigation();

    const handlePress = (screenName) => {
        navigation.navigate(screenName); // Ensure the screen names match your navigator setup
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mark Your Visit:</Text>

            {/* Everbolt Engineering - Dark Green */}
            <TouchableOpacity style={styles.buttonEngineering} onPress={() => handlePress('EverboltEngineering')}>
                <Text style={styles.buttonText}>Everbolt Engineering</Text>
            </TouchableOpacity>

            {/* Everbolt Services - Light Green */}
            <TouchableOpacity style={styles.buttonServices} onPress={() => handlePress('EverboltServices')}>
                <Text style={styles.buttonText}>Everbolt Services</Text>
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
        marginBottom: 30,
        textAlign: 'center',
        color: 'black',
    },
    buttonEngineering: {
        backgroundColor: 'darkgreen',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonServices: {
        backgroundColor: 'green',
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
