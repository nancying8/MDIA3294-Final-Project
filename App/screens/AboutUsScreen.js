// Import react from react
import React from 'react';
// Importing essential React Native components for StyleSheet, View, Image, ImageBackground 
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
// Importing themed UI components from React Native Elements
import { Text} from '@rneui/themed';

// About us
// a simple layout images and text for about information of Adoptly
export default function AboutUsScreen() {
  
  // importing the images
  const background = require('../assets/background-5.jpg');
      
      return (
        <ImageBackground source={background} style={styles.background} resizeMode='cover'> 
          <View style={styles.container}>
            <Text h3 style={styles.title}>Adoptly</Text>
            <Image
              style={styles.banner}
              source={require('../assets/dog-7.png')}/>
            <Text h4 style={styles.subtitle}>We Help You Find the Perfect </Text>  
            <Text h4 style={styles.subtitle}> Dog or Cat for You</Text> 
            <Text style={styles.paragraph}>
              Adoptly is your ultimate, all-in-one companion on the pet adoption journey. 
              Crafted with love and care, Adoptly is designed to simplify the entire process, 
              making it as seamless and enjoyable as possible. With Adoptly, you can easily 
              search for adoptable dogs and cats, ensuring that you find the perfect furry friend 
              to welcome into your home. In addition to helping you find your new companion, 
              Adoptly also makes it easy to purchase essential pet products, from food to toys, 
              all in one convenient platform.
            </Text>
            <Image
              style={styles.banner3}
              source={require('../assets/dog-4.png')}/>
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
    alignItems: 'center',
    padding: 20,
    
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22577a',
    textAlign: 'center',
  },

  subtitle:{
    textAlign: 'center',
    fontWeight:'bold',
    color:'#ED9121',
    

  },
  paragraph:{
    marginTop:20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22577a',
    padding:15,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
  },

  banner: {
    width: 380,
    height: 80,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginVertical: 10,
  },

  banner2: {
    backgroundColor: 'rgba(255, 255, 255,0.7)',

  },
  banner3: {
    marginRight:50,
    width: 380,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 30,

  },
});
