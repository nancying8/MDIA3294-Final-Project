// Import react, useState, useEffect from react
import React, { useEffect, useState } from 'react';
// Importing essential React Native components for layout, lists, images, and user interaction
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
// Importing themed UI components from React Native Elements
import { Text, Icon, Button } from '@rneui/themed';
// Importing AsyncStorage for local data persistence
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importing navigation hook to enable screen navigation
import { useNavigation } from '@react-navigation/native';

// SjhoppingSaved
// ShoppingSaved component for displaying and managing saved shopping cart items
// State to store items in the shopping cart
// navigation - hook to enable navigation between screens
// Load cart items from AsyncStorage when the component mounts
// Function to load cart items from AsyncStorage
// ParseCart will update state with loaded items
// Function to delete an item from the cart based on its index
// Filter out the item to delete
// Save updated cart to AsyncStorage
export default function ShoppingSaved() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      setCartItems(parsedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const deleteItem = async (indexToDelete) => {
    try {
      const updatedCart = cartItems.filter((_, index) => index !== indexToDelete);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View style={styles.container}>
     
      {/* Saved Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: `http://10.0.2.2:3000/images/${item.image_name}` }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteItem(index)}>
                <Icon name="trash" type="font-awesome" color="#e63946" />
              </TouchableOpacity>
            </View>
          )}
      />

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <Button title="Checkout" onPress={() => {}} buttonStyle={styles.checkoutButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F0F8FF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemImage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22577a',
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    width: '60%',
  },
  checkoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  checkoutButton: {
    backgroundColor: '#22577a',
    paddingVertical: 12,
  },
});