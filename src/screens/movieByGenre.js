import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getMoviesByGenre } from "../services/api"; // API function to fetch movies by genre

const MoviesByGenre = () => {
  const route = useRoute();
  const { genreId, genreName } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(genreId);
        console.log("Fetched movies:", data); // Log the fetched data to check its structure
        setMovies(data.results || []); // Check if the movies data has a 'results' key
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId]);

  const renderMovieItem = ({ item }) => {
    // Check if poster_path exists before trying to render the image
    const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : null;

    return (
      <View style={styles.movieCard}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.movieImage} />
        ) : (
          <View style={styles.movieImagePlaceholder} />
        )}
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" />;
  }

  if (movies.length === 0) {
    return <Text style={styles.noMoviesText}>No movies available for this genre.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genreName} Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  movieCard: { padding: 10, margin: 5, backgroundColor: "#222", borderRadius: 8, alignItems: "center", width: "48%" },
  movieImage: { width: 100, height: 150, borderRadius: 5 },
  movieImagePlaceholder: { width: 100, height: 150, backgroundColor: "#555", borderRadius: 5 },
  movieTitle: { color: "#fff", fontSize: 14, textAlign: "center", marginTop: 5 },
  noMoviesText: { color: "#fff", textAlign: "center", marginTop: 20, fontSize: 16 },
});

export default MoviesByGenre;
