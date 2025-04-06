import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getTvGenres } from "../services/api"; // Import the getTvGenres function
import { useNavigation } from "@react-navigation/native";

const TvGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better error handling
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getTvGenres(); // Fetch TV genres data
        setGenres(data); // Set fetched genres data to state
      } catch (err) {
        setError("Failed to fetch TV genres. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetch completes (successful or error)
      }
    };
    fetchGenres(); // Call the function to fetch data
  }, []);

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate("searchStack", {
        screen: "MoviesByGenre",
        params: { genreId: item.id, genreName: item.name } // Corrected from `genre` to `item`
      })}>
      {/* Navigate to a screen with the genre's TV shows */}
      <View style={styles.genreCard}>
        <Text style={styles.genreName}>{item.name}</Text> {/* Display genre name */}
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#E50914" />; // Display loading indicator

  if (error) return <Text style={styles.errorText}>{error}</Text>; // Show error message if there was an error during fetching

  return (
    <View>
      <Text style={styles.sectionTitle}>🎬 TV Genres</Text> {/* Section title */}
      <FlatList 
        data={genres} 
        renderItem={renderGenreItem} 
        keyExtractor={(item) => item.id.toString()} 
        numColumns={2} // Display genres in two columns
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  genreCard: { 
    margin: 10, 
    backgroundColor: "#333", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    flex: 1, 
    justifyContent: "center"
  },
  genreName: { color: "#fff", fontSize: 16, fontWeight: "bold" }, // Genre name style
  errorText: { color: "#FF0000", textAlign: "center", fontSize: 16, marginTop: 20 }, // Error text style
});

export default TvGenres;
