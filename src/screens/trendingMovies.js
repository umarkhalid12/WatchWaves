import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getTrendingMovies } from "../services/api"; // Import the getTrendingMovies function
import { useNavigation } from "@react-navigation/native";
import { getMovieDetails } from "../services/api";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better error handling
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies(); // Fetch trending movies data
        setMovies(data); // Set fetched movies data to state
      } catch (err) {
        setError("Failed to fetch trending movies. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetch completes (successful or error)
      }
    };
    fetchMovies(); // Call the function to fetch data
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
    onPress={async () => {
      try {
        const fullMovieDetails = await getMovieDetails(item.id);
        navigation.navigate('searchStack', {
          screen: 'MovieDetail',
          params: { movie: fullMovieDetails }
        });
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    }}
  >
    <View style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#E50914" />; // Display loading indicator

  if (error) return <Text style={styles.errorText}>{error}</Text>; // Show error message if there was an error during fetching

  return (
    <View>
      <Text style={styles.sectionTitle}>🔥 Trending Movies</Text> {/* Section title */}
      <FlatList 
        data={movies} 
        renderItem={renderMovieItem} 
        keyExtractor={(item) => item.id.toString()} 
        horizontal 
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  movieCard: { marginRight: 10, alignItems: "center" },
  poster: { width: 120, height: 180, borderRadius: 10 },
  movieTitle: { color: "#fff", marginTop: 5, width: 120, textAlign: "center" },
  errorText: { color: "#FF0000", textAlign: "center", fontSize: 16, marginTop: 20 }, // Error text style
});

export default TrendingMovies;
