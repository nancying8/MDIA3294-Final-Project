import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native';
import { Divider, Icon } from '@rneui/themed';
import Collapsible from 'react-native-collapsible';
import { useAdoption } from '../components/AdoptionContext';

export default function DogDetailScreen({ route, navigation }) {
    const { dog } = route.params;
    const [isLoaded, setIsLoaded] = useState(true);
    const [loadingDelay, setLoadingDelay] = useState(false);

    const { adoptions = [], addAdoption, removeAdoptions } = useAdoption() || {};
    const isAdopted = adoptions.some((adoptedDog) => adoptedDog.id === dog?.id);

    const [sections, setSections] = useState({
        temperament: false,
        lifeSpan: false,
        weight: false,
        height: false,
        origin: false,
        bredFor: false,
        breedGroup: false,
    });

    const toggleSection = (key) => {
        setSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const showToast = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('Adoption Update', message);
        }
    };

    const toggleAdoption = () => {
        if (!dog) return;
        if (isAdopted) {
            removeAdoptions(dog.id);
            showToast(`${dog.name} was removed from your list 💔`);
        } else {
            addAdoption({
                id: dog.id,
                name: dog.name,
                image: dog.image,
                reference_image_id: dog.reference_image_id,
                type: 'dog',
            });
            showToast(`${dog.name} is in your adoption list 💖`);
        }
    };
    

    useEffect(() => {
        if (!isLoaded) {
            setTimeout(() => setLoadingDelay(true), 1000);
        } else {
            setLoadingDelay(true);
        }
    }, [isLoaded]);

    if (!dog) {
        return (
            <View style={styles.container}>
                <Text>No dog data available</Text>
            </View>
        );
    }

    if (!isLoaded || !loadingDelay) {
        return (
            <View style={styles.loadingText}>
                <ActivityIndicator size="large" color="#6096B4" />
                <Text style={styles.loadingTextStyle}>Loading doggo info...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
           
                <Text style={styles.title}>{dog.name}</Text>
           

            <View style={styles.centeredContainer}>
                <Image 
                    style={styles.dogImage}
                    source={{ uri: dog.image?.url || `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` }}
                />
                <TouchableOpacity onPress={toggleAdoption} style={styles.favoriteAdoption}>
                    <Icon 
                        name="paw"
                        type="font-awesome"
                        color={isAdopted ? '#6096B4' : 'gray'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <Divider style={styles.divider} color="#93BFCF" width={2} />

            {[
                { label: 'Temperament', key: 'temperament', value: dog.temperament || 'Unknown' },
                { label: 'Life Span', key: 'lifeSpan', value: dog.life_span || 'Unknown' },
                { label: 'Weight', key: 'weight', value: `${dog.weight?.imperial} lbs (${dog.weight?.metric} kg)` },
                { label: 'Height', key: 'height', value: `${dog.height?.imperial} in (${dog.height?.metric} cm)` },
                { label: 'Origin', key: 'origin', value: dog.origin || 'Unknown' },
                { label: 'Bred For', key: 'bredFor', value: dog.bred_for || 'Unknown' },
                { label: 'Breed Group', key: 'breedGroup', value: dog.breed_group || 'Unknown' },
            ].map(({ label, key, value }) => (
                <View key={key}>
                    <TouchableOpacity onPress={() => toggleSection(key)} style={styles.accordionHeader}>
                        <Text style={styles.sectionTitle}>{label}</Text>
                        <Icon 
                          name={sections[key] ? 'chevron-down' : 'chevron-up'} 
                          type="font-awesome" 
                          color="#6096B4"
                          padding={10} 
                        />
                    </TouchableOpacity>
                    <Collapsible collapsed={!sections[key]}>
                        <Text style={styles.infoText}>{value}</Text>
                    </Collapsible>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        paddingTop: 60, 
        backgroundColor: '#F0F4EF' 
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    backButton: {
        backgroundColor: '#rgba(150, 209, 210, 0.7)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#3A4F52',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#6096B4', 
        textAlign: 'center'
    },
    centeredContainer: { 
        alignItems: 'center', 
        marginBottom: 20 
    },
    dogImage: { 
        width: 300, 
        height: 300, 
        borderRadius: 10, 
        marginVertical: 10, 
        borderColor: '#93BFCF', 
        borderWidth: 2 
    },
    accordionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: 'white',
      padding: 5,
      borderWidth: 1,
    },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#6096B4', 
        marginTop: 15 
    },
    infoText: { 
        fontSize: 16, 
        padding: 10, 
        backgroundColor: '#E9F6FF', 
        borderRadius: 8, 
        color: '#3A4F52' 
    },
    loadingText: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loadingTextStyle: { 
        fontSize: 16, 
        marginTop: 10, 
        color: '#6096B4' 
    },
    divider: { 
        marginVertical: 10 
    },
    favoriteAdoption: {
        position: 'absolute',
        bottom: -10,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
