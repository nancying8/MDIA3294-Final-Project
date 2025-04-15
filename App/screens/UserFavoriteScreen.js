import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Text, Button, Icon, Badge } from '@rneui/themed';
import { getFavArrayByUser, addFavorite, delFavorite, checkFavorite } from '../services/FavoriteManager';
import { useUserState } from '../services/UserState';

// Replace with your actual API key
const apiKey = 'live_gklK0ek60ArLsWQaWQJDqXXTAmqxmtk6bXXPrGHcrIfQ7QYOtpGZ8bUV1aa0Ko5X';

export default function UserFavoriteScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);
  const [likedCats, setLikedCats] = useState([]);

  const cUser = useUserState().getUser();

  // Fetch liked cats along with full breed details
  const loadLikedCats = async () => {
    try {
      const storedLikes = await getFavArrayByUser(cUser.id);

      // Fetch all breed details
      const breedsResponse = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: { 'x-api-key': apiKey },
      });

      if (!breedsResponse.ok) throw new Error('Failed to fetch breeds');

      const allBreeds = await breedsResponse.json();

      // Merge breed data with liked cats
      const detailedCats = await Promise.all(
        storedLikes.map(async (cat) => {
          const breedInfo = allBreeds.find(b => b.id === cat.id);
          let imageUrl = cat.image?.url;

          // Fetch the image if reference_image_id exists
          if (breedInfo?.reference_image_id && !imageUrl) {
            const imageResponse = await fetch(
              `https://api.thecatapi.com/v1/images/${breedInfo.reference_image_id}`,
              { headers: { 'x-api-key': apiKey } }
            );

            if (imageResponse.ok) {
              const imageData = await imageResponse.json();
              imageUrl = imageData.url;
            }
          }

          return {
            ...cat,
            ...breedInfo,
            image: { url: imageUrl || 'https://via.placeholder.com/150' },
          };
        })
      );

      setDataResult(detailedCats);
      setLikedCats(detailedCats);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadLikedCats();
  }, [cUser.id]);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setIsLoaded(false);
      loadLikedCats();
    });

    return willFocusSubscription;
  }, [navigation]);

  const toggleLike = async (cat) => {
    let updatedLikes;
    if (checkFavorite(cat.id, likedCats)) {
      updatedLikes = await delFavorite(cat, likedCats, cUser.id);
    } else {
      updatedLikes = await addFavorite(cat, likedCats, cUser.id);
    }
    setLikedCats(updatedLikes);
    setDataResult(updatedLikes);
  };

  return (
    <View style={styles.container}>
      <Text h2 style={[styles.heading, styles.textPadding]}>User Favorites:</Text>
      {displayDataContainer(error, isLoaded, dataResult, navigation, likedCats, toggleLike)}
      <Button
        title="Back to Cat List"
        onPress={() => navigation.goBack()}
        buttonStyle={styles.backButton}
        icon={
          <Icon
            name="arrow-back"
            type="ionicon"
            size={20}
            color="white"
          />
        }
        iconLeft
      />
    </View>
  );
}

function displayDataContainer(error, isLoaded, dataResult, navigation, likedCats, toggleLike) {
  const renderItem = ({ item }) => (
    <View style={styles.catWrapper}>
      <TouchableOpacity 
        style={styles.catCube} 
        onPress={() => navigation.navigate('CatDetail', { detailId: item.id })}>
        <Image source={{ uri: item.image?.url }} style={styles.catImage} />
        <Text style={styles.catName}>{item.name}</Text>
        <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item)}>
          <Icon name={checkFavorite(item.id, likedCats) ? 'heart' : 'heart-o'} type="font-awesome" color="red" size={20} />
        </TouchableOpacity>
        {checkFavorite(item.id, likedCats) && (
          <Badge
            badgeStyle={{ backgroundColor: 'red' }}
            containerStyle={{ position: 'absolute', top: 10, right: 10 }}
            onPress={() => alert("You liked this cat!")}
            status="primary"
            textStyle={{ color: "#EFE" }}
            value="Liked! ❤️"
          />
        )}
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return (
      <View>
        <Text style={styles.textMargin}>Error: {error.message}</Text>
      </View>
    );
  } else if (!isLoaded) {
    return (
      <View>
        <Text style={styles.textPadding}>Loading...</Text>
        <ActivityIndicator size="small" color="#00ff11" />
      </View>
    );
  } else if (!dataResult.length) {
    return (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.paraPadding}>No liked cats so far ?!</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        style={styles.catList}
        data={dataResult}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.rowWrapper}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED8B1', // Same background color as CatListScreen
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    marginTop: 10,
    marginBottom: 10,
  },
  catList: {
    width: '100%',
  },
  textPadding: {
    paddingTop: 80,
  },
  paraPadding: {
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#ED9121',
    elevation: 0,
    shadowOpacity: 0,
  },
  catWrapper: { width: '48%', marginTop: 10 },
  catCube: { backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center' },
  catImage: { width: 150, height: 150, borderRadius: 10 },
  catName: { marginTop: 10, fontWeight: 'bold' },
  catDescription: { fontSize: 12, textAlign: 'center', marginTop: 5, color: '#666' },
  likeButton: { position: 'absolute', bottom: 10, right: 10 },
  rowWrapper: { justifyContent: 'space-between' },
});