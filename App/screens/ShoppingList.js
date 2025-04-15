import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, Button, Icon } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCartCount(); // reload cart count when screen is focused
    });
  
    fetch('http://10.0.2.2:3000/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  
    loadCartCount(); // initial load
  
    return unsubscribe; // clean up the listener
  }, [navigation]);

  const loadCartCount = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cart');
      const parsedCart = cartItems ? JSON.parse(cartItems) : [];
      setCartCount(parsedCart.length);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };
  

  const addToCart = async (item) => {
    try {
      const cartItems = await AsyncStorage.getItem('cart');
      const parsedCart = cartItems ? JSON.parse(cartItems) : [];
      const updatedCart = [...parsedCart, item];
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartCount(updatedCart.length); // ✅ update count
      console.log(`Added to cart: ${item.name}`);
      
      Alert.alert(
        "Item Added",
        `${item.name} has been added to your cart.`,
        [{ text: "OK" }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>

          <View>
            <TouchableOpacity  onPress={() => navigation.navigate('Home', { screen: 'ShoppingSaved' })}>
              <Ionicons name="cart" size={26} color="#22577a" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
      </View>


      {/* Shopping List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
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
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Icon
                name="plus"
                type="font-awesome"
                color="#4CAF50"
                size={24}
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F0F8FF',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent:"flex-end",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,

  },
  navTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cartButtonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#38A3A5',
    paddingVertical: 12,
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
  icon: {
    marginHorizontal: 10,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});