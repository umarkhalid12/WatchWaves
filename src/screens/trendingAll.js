import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { getTrendingAll } from '../services/api.js';
import { useNavigation } from '@react-navigation/native';
import { getGenreNames } from '../services/genresMap.js';
import CustomButton from '../components/customButton.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 220;
const ITEM_SPACING = 20;

const TrendingAll = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingAll();
      console.log("daat is ", data )
      setTrendingData(data);
      setLoading(false);

      const initialIndex = 0;
      setCurrentIndex(initialIndex);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: initialIndex, animated: true });
      }, 500);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (trendingData.length === 0) return;
      const nextIndex = (currentIndex + 1) % trendingData.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, trendingData]);

  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 4 ? words.slice(0, 4).join(' ') + '...' : title;
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (ITEM_WIDTH + ITEM_SPACING));
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const addToFavorites = (movie) => {
    // Ensure the movie isn't already in favorites
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [
          ...prevFavorites,
          { id: movie.id, name: movie.title, poster: movie.poster_path },
        ];
      }
      return prevFavorites;
      // If movie is already in favorites, return the current state
    });
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f9bc50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending</Text>
      <Animated.FlatList
        ref={flatListRef}
        data={trendingData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + ITEM_SPACING,
          offset: (ITEM_WIDTH + ITEM_SPACING) * index,
          index,
        })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
            index * (ITEM_WIDTH + ITEM_SPACING),
            (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('searchStack', {
                  screen: 'MovieDetail',
                  params: { movie: item },
                });
              }}
            >
              <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.image}
                />
                <Text style={styles.title}>{truncateTitle(item.name || item.title)}</Text>
                <Text style={styles.genreText}>{getGenreNames(item.genre_ids)}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 16 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('searchStack', {
              screen: 'MovieDetail',
              params: { movie: trendingData[currentIndex] },
            });
          }}
        >
          <MaterialIcons name="info-outline" size={22} color="black" />
        </TouchableOpacity>
        <CustomButton title="WATCH NOW"
       onPress={() => navigation.navigate("searchStack", {
        screen: "Watch"
      })} />
        <TouchableOpacity
          onPress={() => {
            console.log("Current favorites:", favorites); 
            navigation.setParams({ favorites: favorites });
          }}
        >
          <MaterialIcons name="favorite-border" size={22} color="black" />
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    fontSize: 16,
    color: '#4e5b60',
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 330,
    borderRadius: 8,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  genreText: {
    fontSize: 10,
    textAlign:'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrendingAll;
