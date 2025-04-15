import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DogSearchScreen from '../screens/DogSearchScreen';
import DogDetailScreen from '../screens/DogDetailScreen';
import CatSearchScreen from '../screens/CatSearchScreen';
import CatDetailScreen from '../screens/CatDetailScreen';
import MapScreen from '../screens/MapScreen';
import AdoptionScreen from '../screens/AdoptionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShoppingList from '../screens/ShoppingList';
import ShoppingSaved from '../screens/ShoppingSaved';
import AboutUsScreen from '../screens/AboutUsScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      {/* Home Screen */}
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      {/* Dog Search */}
      <HomeStack.Screen
        name="DogSearch"
        component={DogSearchScreen}
        options={{
          title: 'Find Your Dog',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      {/* Dog Detail */}
      <HomeStack.Screen
        name="DogDetail"
        component={DogDetailScreen}
        options={{
          title: 'Dog Details',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      {/* Cat Search */}
      <HomeStack.Screen
        name="CatSearch"
        component={CatSearchScreen}
        options={{
          title: 'Find Your Cat',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      {/* Cat Detail */}
      <HomeStack.Screen
        name="CatDetail"
        component={CatDetailScreen}
        options={{
          title: 'Cat Details',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      {/* Map Screen */}
      <HomeStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Map',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      <HomeStack.Screen
        name="Shopping"
        component={ShoppingList}
        options={{
          title: 'Shopping List',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
      <HomeStack.Screen
  name="ShoppingSaved"
  component={ShoppingSaved}
  options={{
    title: 'Shopping Saved',
    headerBackVisible: false, // 👈 Hides the default back arrow
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#22577a',
    },
  }}
/>

      <HomeStack.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          title: 'About Us',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ffb703',
        tabBarInactiveTintColor: '#22577a',
      }}
    >
      {/* Home Tab with Nested Stack Navigator */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Use the Home stack navigator here
        options={{
          headerShown: false, // Hide the header for the tab navigator
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* Adoption Tab */}
      <Tab.Screen
        name="Adoption"
        component={AdoptionScreen}
        options={({ navigation }) => ({
          headerTitle: 'Adoption',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="paw" color={color} size={size} />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="information-outline"
              color="#003e6b"
              size={24}
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Home', { screen: 'AboutUs' })} 
            />
          ),
        })}
      />
      {/* Shopping Tab */}
      <Tab.Screen
        name="Shopping"
        component={ShoppingList}
        options={({ navigation }) => ({
          headerTitle: 'Shopping',
          headerTitleStyle: {
            fontSize:25,
            fontWeight: 'bold',
            color: '#22577a',
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="information-outline"
              color="#003e6b"
              size={24}
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Home', { screen: 'AboutUs' })} // Correct navigation
            />
          ),
        })}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
            color: '#22577a',
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="information-outline"
              color="#003e6b"
              size={24}
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate('Home', { screen: 'AboutUs' })} // Correct navigation
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}