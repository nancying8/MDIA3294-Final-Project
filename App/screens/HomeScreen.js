 // Import react from react
import React from 'react';
// Import components 
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
// global styles from themed
import { Text } from '@rneui/themed';
//  Import icon from MaterialCommunityIcons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const background = require('../assets/kitty.jpeg');

// Home screen
// This is the first screen that the user sees when they open the app
// It has a title and a button to navigate to the search screen
// The screen is divided into three sections with a banner image and text
// The banner images are imported from the assets folder
// The button is linked to the Search screen

export default function HomeScreen({navigation}) {

    return (
         <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <View style={styles.container}>
            <Text
             style= {styles.title}
             h1>Adoptly
            
             </Text>

            <TouchableOpacity
                style={styles.bannerTop}
                onPress={() => navigation.navigate('DogSearch')}
            >
                <Text 
                style={styles.text1}
                h2>Dogs</Text>
                <Image
                style={styles.banner}
                source={require('../assets/dog-5.png')}
                />

                <MaterialCommunityIcons name="arrow-right" size={40} color={'#22577a'} />
            </TouchableOpacity>

            {/* Updated Cats Section */}
            <TouchableOpacity
                style={styles.bannerMiddle}
                onPress={() => navigation.navigate('CatSearch')}
            >
                <Image
                style={styles.banner}
                source={require('../assets/kitty-2.png')}
                />
                <Text
                 style={styles.text2}
                 h2>Cats</Text>
                <MaterialCommunityIcons name="arrow-right" size={40} color={'#EB820A'} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.bannerBottom}
                onPress={() => navigation.navigate('Map')}
            >
                <Text
                style={styles.text3}
                 h2>Map</Text>
                <Image
                style={styles.banner}
                source={require('../assets/dog-6.png')}
                />
                <MaterialCommunityIcons name="arrow-right" size={40} color={'#A82624'} />
            </TouchableOpacity>

        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
    },

    title: {
        marginTop: 20,
        marginBottom: 0,
        textAlign: "center",
        color: '#22577a',
    },

    bannerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(150, 209, 210, 0.7)',
        padding: 15,
        gap: 20,
        marginTop: 60,
    },
    text1: {
        color: '#22577a'
    },
    
    banner: {
        margin: 0,
        width: 150, 
        height: 120,
        // resizeMode: 'contain', 
    },
    
    bannerMiddle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'hsla(34, 71.40%, 71.20%, 0.70)',
        padding: 15,
        gap: 20,
        marginTop: 20,
    },
    text2: {
        color: '#EB820A'
    },

    bannerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(240, 143, 128, 0.7)',
        padding: 15,
        gap: 20,
        marginTop: 20,
    },
    text3: {
        color: '#A82624'
    },

});