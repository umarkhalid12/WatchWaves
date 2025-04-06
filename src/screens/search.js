import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import SimpleInput from '../components/simpleInput';
import { getSearchResults } from '../services/api';  // Import API function to search by keyword

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log('Search query is empty');
      return;  // Don't search if query is empty
    }

    setLoading(true);
    console.log(`Searching for: ${searchQuery}`);

    try {
      const data = await getSearchResults(searchQuery); // Get results from the API
      console.log('API Response:', data); // Log the full response from the API
      setSearchResults(data.results || []); // Update search results with API response
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
      console.log('Loading finished');
    }
  };

  const renderSearchResult = ({ item }) => {
    console.log('Rendering item:', item); // Log each item being rendered
    return (
      <View style={styles.resultCard}>
        {/* If the item has a poster_url or image_url, show it */}
        {item.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} // Adjust the base URL as per your API
            style={styles.posterImage}
          />
        ) : (
          <View style={styles.noImagePlaceholder}>
            <Text style={styles.noImageText}>No Poster</Text>
          </View>
        )}
        <Text style={styles.resultTitle}>{item.name || item.title}</Text>
        {/* Additional details or information can be added here */}
      </View>
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
          onSubmitEditing={handleSearch}  // Trigger search when pressing 'Enter'
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
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
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  backButton: { left: 10, top: 5 },
  searchBar: { flexDirection: 'row', gap: 20, alignItems: 'center', marginBottom: 10 },
  resultCard: { padding: 10, marginBottom: 8, backgroundColor: "#333", borderRadius: 8 },
  resultTitle: { color: "#fff", fontSize: 16, marginTop: 10 },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  noImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  noImageText: {
    color: '#fff',
    fontSize: 16,
  },
  noResultsText: { color: "#fff", textAlign: "center", marginTop: 20, fontSize: 16 },
});

export default Search;
