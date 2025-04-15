// import React from 'react';
import React from 'react';
// import { View, StyleSheet } from 'react-native';
import { View, StyleSheet, ImageBackground } from 'react-native';
// import { Text, Avatar, Button } from 'react-native-elements';
import { Text, Avatar, Button } from '@rneui/themed';
// import { Divider } from 'react-native-elements';
import { Divider } from '@rneui/base';

// Profile Component
// shopping list button added
// navigation to shopping list added
export default function Profile({navigation}) {

  const background = require('../assets/background-4.jpg');

  return (
    <ImageBackground source={background} style={styles.background} resizeMode='cover'>
    <View style={styles.container}>
      <View style={styles.images}>

      
      {/* Profile Icon */}
      <Avatar
        size={150}
        rounded
        source={{ uri: 'https://via.placeholder.com/150' }} 
        containerStyle={styles.avatar}
      />
      {/* User Name */}
      <Text h3 style={styles.name}>
        Your Name
      </Text>
    </View> 

    <View style={styles.detail}>
    <Divider
            orientation="horizontal"
            style={{ marginTop: 20 }}>
              <Text style={styles.detailName}>Email </Text>
        </Divider> 
    <Divider
        orientation="horizontal"
        style={{ marginTop: 20 }}>
          <Text style={styles.detailName}>Password </Text>
    </Divider> 
    <Divider
        orientation="horizontal"
        style={{ marginTop: 20 }}>
          <Text style={styles.detailName}>Phone Number </Text>
    </Divider> 
    </View>
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
   
    padding: 20,
    marginTop: 0,
},

images: {
  alignItems: 'center',
},
 
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22577a',
    marginBottom: 20,
  },
  detail: {
    textAlign: 'left',
    color: '#22577a',
    fontWeight: 'bold',

  },
  detailName: {
   
    color: '#22577a',

  },

  
});