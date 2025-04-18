// Import react, useState,  from react
import React, { useState } from 'react';
// Importing essential React Native components for View, StyleSheet, Dimensions, TouchableOpacity, Text
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
// Interactive map using react-native-maps
import MapView, { Marker } from 'react-native-maps';

// each adress has the corresponde latitude and longtitude 
// the set of latitude with lngitude will givbe the exactitud of location on the map
const adoptionAgencies = [
  {
    name: 'Adoptly Vancouver',
    description: '1208 E 8th Ave, Vancouver, BC',
    latitude: 49.2639,
    longitude: -123.0788,
    phoneNumber: 604-123-4567,
  },
  {
    name: 'Adoptly Burnaby',
    description: '3208 Norland Ave, Burnaby, BC',
    latitude: 49.2613,
    longitude: -122.9934,
    phoneNumber: 778-123-4567,
  },
  {
    name: 'Adoptly Richmond',
    description: '12078 No. 8 Rd, Richmond, BC',
    latitude: 49.1178,
    longitude: -123.0435,
    phoneNumber: 647-123-4567,
  },
];

// when the map open is set up to the location of area within Vancouver, Burnaby and Richmond 
// adding zoom in by dividing the delta of latitude and longitude
export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 49.22,
    longitude: -123.05,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });

  const zoomIn = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

// MapScreen Component
//  Displays a map with markers for various Adoptly adoption agency locations.
//  Centers the map around the Greater Vancouver area.
// Users can zoom in and out using buttons.
// Each agency is marked with name and address as a marker.
// Zoom controls to adjust map view
// Static data for demonstration with agency details and coordinates
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {adoptionAgencies.map((agency, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: agency.latitude,
              longitude: agency.longitude,
            }}
            title={agency.name}
            description={agency.description}
          />
        ))}
      </MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.button} onPress={zoomIn}>
          <Text style={styles.buttonText}>+  Zoom In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={zoomOut}>
          <Text style={styles.buttonText}> -  Zoom Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    gap: 10,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#e76f51',
    padding: 12,
    borderRadius: 8,
    marginBottom:5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:'center'
  },
});
