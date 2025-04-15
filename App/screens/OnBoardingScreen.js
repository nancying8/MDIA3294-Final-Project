// Import react from react
import React from 'react';
// Importing essential React Native components for View, StyleSheet, ImageBackground
import { View, StyleSheet, ImageBackground } from 'react-native';
// Importing themed UI components from React Native Elements
import { Button, Text } from '@rneui/themed';
//  Importing images to the background of the screem
const background = require('../assets/background.jpg');

// Onboarding screen component for the Adoptly app
// Background image that fills the whole screen
// Add the button to navigate to the next screen >Log in

export default OnboardingScreen = ({ navigation }) => {
    return (
        <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <View style={styles.overlay}>
        <View style={styles.container}>
            <Text h3 style={styles.title}> Welcome to Adoptly 🐾</Text>
            <Text style={styles.description}>
                Adopt your next best friend 
            </Text>
            <Text style={styles.description2}>
                 with just a few clicks!
            </Text>
            <Button
                title="Get Started"
                onPress={() => navigation.replace('LogIn')}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
        </View>
      </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },

    description: {
        fontWeight:'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,

    },
    description2: {
        fontWeight:'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 32,

    },

    button: {
        backgroundColor: '#e76f51',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
    },

    buttonText: {
        fontWeight:'bold',
        color: 'white',
        fontSize: 16,
    },
});

