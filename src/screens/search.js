// Search.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SimpleInput from '../components/simpleInput';
import { getSearchResults, getMovieDetails } from '../services/api';

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log('Search query is empty');
      return;
    }

    setLoading(true);
    console.log(`Searching for: ${searchQuery}`);

    try {
      const data = await getSearchResults(searchQuery);
      console.log('API Response:', data);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
      console.log('Loading finished');
    }
  };

  const handleResultPress = async (item) => {
    try {
      const fullDetails = await getMovieDetails(item.id, item.media_type);
      navigation.navigate("MovieDetail", { movie: fullDetails });
    } catch (error) {
      console.error("Failed to fetch full movie details:", error);
    }
  };

  const renderSearchResult = ({ item }) => {
    const year =
      item.release_date?.slice(0, 4) ||
      item.first_air_date?.slice(0, 4) ||
      'Year Unknown';

    return (
      <TouchableOpacity
        style={styles.resultCard}
        onPress={() => handleResultPress(item)}
      >
        {item.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.posterImage}
          />
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={styles.noImageText}>No Poster</Text>
          </View>
        )}
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle}>{item.name || item.title}</Text>
          <Text style={styles.resultYear}>● {year}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#f9bc50" />
        </TouchableOpacity>
        <SimpleInput
          placeholder="Search for movies or TV shows"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f9bc50" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noResultsText}>No results found</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    left: 5,
  },
  searchBar: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  resultCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  noImagePlaceholder: {
    width: 100,
    height: 150,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  noImageText: {
    color: '#fff',
    fontSize: 16,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultYear: {
    color: '#aaa',
    fontSize: 14,
  },
  noResultsText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Search;
