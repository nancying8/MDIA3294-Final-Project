 // Import react from react
 import React from 'react';
//  Import View, FlatList, Image, StyleSheet from react-native
import { View, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
// Import Text, Button from @rneui/themed
import { Text, Button } from '@rneui/themed';
// Import useAdoption from '../Components/AdoptionContext'
import { useAdoption } from '../components/AdoptionContext';
 
// Adoption
// This component displays a list of adopted dogs
// It allows users to remove dogs from the adoption list
// It uses the useAdoption hook to manage adoption state
// It uses the FlatList component to display a list of adopted dogs
// It uses the Image component to display dog images
// It uses the Button component to remove dogs from the adoption list
// It uses the Text component to display a message when there are no adopted dogs
// It uses the Button component to navigate back to the Search screen
export default function AdoptionScreen() {
  const { adoptions, removeAdoptions } = useAdoption();  

  const background = require('../assets/background-3.jpg');
    
    return (
      <ImageBackground source={background} style={styles.background} resizeMode='cover'> 
    <View style={styles.container}>

      {adoptions.length === 0 ? (  
        <Text style={styles.emptyText}>No dogs added for adoption yet!</Text>
      ) : (
        <FlatList
          data={adoptions}  
          keyExtractor={(item) => item.id?.toString() || `dog-${Math.random()}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                  source={{
                    uri:
                      item.image?.url ||
                      (item.type === 'dog'
                        ? `https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`
                        : `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`)
                  }}
                  style={styles.petImage}
                />

              <Text style={styles.petName}>{item.name}</Text>
              <Button
                title="Remove"
                onPress={() => removeAdoptions(item.id)}  
                buttonStyle={styles.removeButton}
              />
            </View>
          )}
        />
      )}
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

text: {
  color: '#22577a',
},

  emptyText: {
    fontWeight:'bold',
    fontSize: 20,
    color: '#e76f51',
    marginTop: 20,

  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#22577a',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8, 
  },
  petImage: {
    width: 280,
    height: 300,
    margin: 30,
    borderRadius: 8, 
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom:20,
  },
  removeButton: {
    backgroundColor: '#e76f51',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

});
