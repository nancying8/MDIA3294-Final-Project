// Import reacr, createContext, useContext, useState, useEffect and AsyncStorage
import React, { createContext, useContext, useState, useEffect } from 'react';
// Import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

// This file is used to create a context for the adoption list. It is used to store the list of dogs that the user has adopted. It also provides functions to add and remove dogs from the list. The list is stored in the AsyncStorage so that it is not lost when the app is closed.
// The AdoptionProvider component is used to wrap the app and provide the context to all the components. The useAdoption hook is used to access the context in other components.
// The addAdoption function is used to add a dog to the adoption list. It checks if the dog is already in the list before adding it.
const AdoptionContext = createContext();

export function useAdoption() {
  return useContext(AdoptionContext);
}

export function AdoptionProvider({ children }) {
  const [adoptions, setAdoptions] = useState([]);

  // Load adoptions from AsyncStorage when the app starts
  useEffect(() => {
    const loadAdoptions = async () => {
      try {
        const storedAdoptions = await AsyncStorage.getItem('adoptions');
        if (storedAdoptions) {
          const parsedAdoptions = JSON.parse(storedAdoptions);
          if (JSON.stringify(parsedAdoptions) !== JSON.stringify(adoptions)) {
            setAdoptions(parsedAdoptions);
          }
        }
      } catch (error) {
        console.error('Failed to load adoptions from storage:', error);
      }
    };

    loadAdoptions();
  }, []);

  // Save adoptions to AsyncStorage whenever they change
  useEffect(() => {
    console.log('Saving adoptions to AsyncStorage:', adoptions);
    const saveAdoptions = async () => {
      try {
        await AsyncStorage.setItem('adoptions', JSON.stringify(adoptions));
      } catch (error) {
        console.error('Failed to save adoptions to storage:', error);
      }
    };

    saveAdoptions();
  }, [adoptions]);

  // Add a dog to the adoption list if it doesn't exist already
  const addAdoption = (dog) => {
    setAdoptions((prev) => {
      if (prev.some((fav) => fav.id === dog.id)) return prev; // Prevent duplicates
      return [...prev, dog];
    });
  };

  // Remove a dog from the adoption list
  const removeAdoptions = (dogId) => {
    setAdoptions((prev) => prev.filter((fav) => fav.id !== dogId));
  };

  return (
    <AdoptionContext.Provider value={{ adoptions, addAdoption, removeAdoptions }}>
      {children}
    </AdoptionContext.Provider>
  );
}