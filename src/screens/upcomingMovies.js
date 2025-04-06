import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getUpcomingMovies } from "../services/api"; // Make sure this is correctly imported from your api.js file
import { useNavigation } from "@react-navigation/native";
import { getMovieDetails } from "../services/api";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better error handling
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        try {
          const movieDetails = await getMovieDetails(item.id); // ✅ Fetch full details
          navigation.navigate("searchStack", {
            screen: "MovieDetail",
            params: { movie: movieDetails },
          });
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }}
    >
      <View style={styles.movieCard}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  

  if (loading) return <ActivityIndicator size="large" color="#E50914" />; // Loading state

  if (error) return <Text style={styles.errorText}>{error}</Text>; // Show error message if fetching fails

  return (
    <View>
      <Text style={styles.sectionTitle}>🎬 Upcoming Movies</Text>
      <FlatList data={movies} renderItem={renderMovieItem} keyExtractor={(item) => item.id.toString()} horizontal showsHorizontalScrollIndicator={false} />
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

export default UpcomingMovies;
