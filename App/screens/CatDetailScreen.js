import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native';
import { Divider, Icon } from '@rneui/themed';
import Collapsible from 'react-native-collapsible';
import { useAdoption } from '../components/AdoptionContext';

export default function catDetailScreen({ route, navigation }) {
    const { cat } = route.params;
    const [isLoaded, setIsLoaded] = useState(true);
    const [loadingDelay, setLoadingDelay] = useState(false);

    const { adoptions = [], addAdoption, removeAdoptions } = useAdoption() || {};
    const isAdopted = adoptions.some((adoptedcat) => adoptedcat.id === cat?.id);

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
        if (!cat) return;
        if (isAdopted) {
            removeAdoptions(cat.id);
            showToast(`${cat.name} was removed from your list 💔`);
        } else {
            addAdoption({
                id: cat.id,
                name: cat.name,
                image: cat.image,
                reference_image_id: cat.reference_image_id,
                type: 'cat',
            });
            showToast(`${cat.name} is in your adoption list 💖`);
        }
    };
    

    useEffect(() => {
        if (!isLoaded) {
            setTimeout(() => setLoadingDelay(true), 1000);
        } else {
            setLoadingDelay(true);
        }
    }, [isLoaded]);

    if (!cat) {
        return (
            <View style={styles.container}>
                <Text>No cat data available</Text>
            </View>
        );
    }

    if (!isLoaded || !loadingDelay) {
        return (
            <View style={styles.loadingText}>
                <ActivityIndicator size="large" color="#fb8500" />
                <Text style={styles.loadingTextStyle}>Loading catgo info...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
           
                <Text style={styles.title}>{cat.name}</Text>
           

            <View style={styles.centeredContainer}>
                <Image 
                    style={styles.catImage}
                    source={{ uri: cat.image?.url || `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg` }}
                />
                <TouchableOpacity onPress={toggleAdoption} style={styles.favoriteAdoption}>
                    <Icon 
                        name="paw"
                        type="font-awesome"
                        color={isAdopted ? '#fb8500' : 'gray'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>

            <Divider style={styles.divider} color="#93BFCF" width={2} />

            {[
                { label: 'Temperament', key: 'temperament', value: cat.temperament || 'Unknown' },
                { label: 'Life Span', key: 'lifeSpan', value: cat.life_span || 'Unknown' },
                { label: 'Weight', key: 'weight', value: `${cat.weight?.imperial} lbs (${cat.weight?.metric} kg)` },
                { label: 'Height', key: 'height', value: `${cat.height?.imperial} in (${cat.height?.metric} cm)` },
                { label: 'Origin', key: 'origin', value: cat.origin || 'Unknown' },
                { label: 'Bred For', key: 'bredFor', value: cat.bred_for || 'Unknown' },
                { label: 'Breed Group', key: 'breedGroup', value: cat.breed_group || 'Unknown' },
            ].map(({ label, key, value }) => (
                <View key={key}>
                    <TouchableOpacity onPress={() => toggleSection(key)} style={styles.accordionHeader}>
                        <Text style={styles.sectionTitle}>{label}</Text>
                        <Icon 
                          name={sections[key] ? 'chevron-down' : 'chevron-up'} 
                          type="font-awesome" 
                          color="#fb8500"
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
        backgroundColor: '#fefae0' 
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
        color: '#ED9121', 
        textAlign: 'center'
    },
    centeredContainer: { 
        alignItems: 'center', 
        marginBottom: 20 
    },
    catImage: { 
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
        color: '#fb8500', 
        marginTop: 15 
    },
    infoText: { 
        fontSize: 16, 
        padding: 10, 
        backgroundColor: '#e9c46a', 
        borderRadius: 8, 
        color: '#5a3e1b' 
    },
    loadingText: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    loadingTextStyle: { 
        fontSize: 16, 
        marginTop: 10, 
        color: '#fb8500' 
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
