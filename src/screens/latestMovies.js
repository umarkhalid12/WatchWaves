import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getNowPlayingMovies } from "../services/api"; // Import the getNowPlayingMovies function
import { useNavigation } from "@react-navigation/native";
import { getMovieDetails } from "../services/api";

const LatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
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

  if (loading) return <ActivityIndicator size="large" color="#E50914" />;

  return (
    <View>
      <Text style={styles.sectionTitle}>📽️ Now Playing Movies</Text> {/* Updated section title */}
      <FlatList data={movies} renderItem={renderMovieItem} keyExtractor={(item) => item.id.toString()} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  movieCard: { marginRight: 10, alignItems: "center" },
  poster: { width: 120, height: 180, borderRadius: 10 },
  movieTitle: { color: "#fff", marginTop: 5, width: 120, textAlign: "center" },
});

export default LatestMovies;
