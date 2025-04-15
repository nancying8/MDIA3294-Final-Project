// Import react, useState, useEffect from react
import React, { useState, useEffect } from 'react';
// Importing essential React Native components for layout, lists, images, and user interaction
import { StyleSheet, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
// Importing themed UI components from React Native Elements
import { Text, Avatar, Divider, SearchBar } from '@rneui/themed';
// Import useNavigation from @react-navigation/native
import { useNavigation } from '@react-navigation/native';
// Import Collapsible from react-native-collapsible
import Collapsible from 'react-native-collapsible'; 
// Import Icon from @rneui/themed
import { Icon } from '@rneui/themed';
 

// catSearch
// This component fetches cat breed data from The cat API
// It displays search results based on the API response
// API is from thecatapi.com
// It also allows users to filter results by initial letter
// Users can click on a cat to view more details
// The component uses the useNavigation hook to navigate to the Detail screen
// The component uses the useState hook to manage state
// The component uses the useEffect hook to fetch data from the API
// The component uses the SearchBar component to allow users to search for cat breeds
// The component uses the Collapsible component to allow users to filter results by initial letter
export default function catSearchScreen( ) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [catResult, setcatResult] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [initialLetterFilter, setInitialLetterFilter] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true); // state to control collapsible filter
  const navigation = useNavigation();

  const handlecatPress = (cat) => {
    navigation.navigate('CatDetail', { cat });
  };

    // Fetch cat breed data from The cat API whenever the search input or filter changes
    useEffect(() => {
      setIsLoaded(false);
      const uri = `https://api.thecatapi.com/v1/breeds`;  

    fetch(uri)
      .then(res => res.json())
      .then(
        (result) => {
          // Filter results based on search input and selected initial letter
          let filteredcats = result.filter(cat =>
            cat.name.toLowerCase().includes(searchInputVal.toLowerCase())
          );

          if (initialLetterFilter) {
            filteredcats = filteredcats.filter(cat =>
              cat.name[0].toLowerCase() === initialLetterFilter.toLowerCase()
            );
          }

          setcatResult(filteredcats);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, [searchInputVal, initialLetterFilter]);

  // Handle filtering by initial letter
  const handleInitialLetterFilter = (letter) => {
    setInitialLetterFilter(letter);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{ 
          margin: 0,
          backgroundColor: 'transparent', 
          borderTopWidth: 0, 
          borderBottomWidth: 0, 
        }}
        inputContainerStyle={{
          backgroundColor: '#ED9121', 
        }}
        inputStyle={{
          color: '#ffffff', 
        }}
        placeholder="Search cat breeds..."
        placeholderTextColor="#ffffff" 
        onChangeText={(newText) => setSearchInputVal(newText)}
        value={searchInputVal}
      />
      {/* Filter by initial letter A to Z */}
      <TouchableOpacity 
      onPress={() => setIsCollapsed(!isCollapsed)} 
      style={styles.filterToggle}>
      <View style={styles.filterToggleContent}>
        <Text style={styles.toggleFilterText}>
          {isCollapsed ? 'Sort by' : 'Hide'}
        </Text>
        <Icon 
          name={isCollapsed ? 'plus' : 'minus'} 
          type="font-awesome" 
          color="#ED9121" 
          fontSize={10}
        />
      </View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        <View style={styles.filterContainer}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <TouchableOpacity 
              key={letter} 
              onPress={() => handleInitialLetterFilter(letter)} 
              style={[
                styles.filterButton,
                initialLetterFilter === letter ? styles.selectedFilterButton : null
              ]}
            >
              <Text style={[
                styles.filterButtonText,
                initialLetterFilter === letter ? styles.selectedFilterButtonText : null
              ]}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            onPress={() => setInitialLetterFilter('')} 
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
      <Divider style={{ marginVertical: 10 }} />

      {displaycatData(error, isLoaded, catResult, handlecatPress)}
    </View>
  );
}

// Function to handle displaying search results based on API response
function displaycatData(error, isLoaded, catResult, handlecatPress) {
  const renderItem = ({ item }) => (
    <View style={styles.catContainer}>
      <TouchableOpacity 
        style={styles.cat} 
        key={item.id}  
        onPress={() => handlecatPress(item)}
        activeOpacity={0.7}
      >      
        <Avatar 
          source={{ uri: item.reference_image_id 
            ? `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg` 
            : 'https://via.placeholder.com/100' }}
          style={styles.catImg} 
        />
        <Text style={styles.catName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return <Text>Error: {error.message}</Text>;
  } else if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  } else if (catResult.length === 0) {
    return <Text>No cats found</Text>;
  } else {
    return (
      <FlatList
        data={catResult}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row} 
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefae0',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space around',
    marginVertical: 5,
    alignItems: 'center',
    width: 'auto',
    borderRadius: 10,
    
  },
  filterButton: {
    padding: 8,
    margin: 4,
    backgroundColor: '#ED9121',
    width: 'auto',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedFilterButton: {
    backgroundColor: '#22577a',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  selectedFilterButtonText: {
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  catContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#ED9121',
    margin:10,
    borderRadius: 10,
  },
  cat: {
    width: '48%',
    alignItems: 'center',
    borderRadius: 5,
    borderRadius: 10,
    padding: 10,

  },  
  catImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain', 
    backgroundColor: '#f0f0f0',
    marginTop: 20,
    borderRadius: 10,
  },
  catName: {
    marginTop: 5,
    width: 150,
    fontSize: 16,
    color: 'white',
    padding:5,

  },
  filterToggle: {
    padding: 10,
  },
  filterToggleContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  toggleFilterText: {
    color: '##ED9121',
    fontWeight: 'bold',
    marginBottom: 2,
    flex: 1, 

  },
  });