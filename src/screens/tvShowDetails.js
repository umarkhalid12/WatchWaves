import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { getTvDetails } from "../services/api";

const TvShowDetailScreen = ({ route }) => {
  const { tvShowId } = route.params;
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const data = await getTvDetails(tvShowId);
        setTvShow(data);
      } catch (err) {
        setError("Failed to load TV show details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTvShowDetails();
  }, [tvShowId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f9bc50" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }
  const genreNames = tvShow.genres ? tvShow.genres.map(g => g.name).join(", ") : "N/A";
  return (

    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{tvShow.name}</Text>
      <Text style={styles.releaseDate}>📅 First Air Date: {tvShow.first_air_date}</Text>
      <Text style={styles.overview}>{tvShow.overview}</Text>
      <Text style={styles.overview}>{tvShow.origin_country}</Text>
      <Text style={styles.overview}>{tvShow.popularity}</Text>
      <Text style={styles.overview}>{genreNames}</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10
  },
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 10
  },
  title: {
    fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 10
  },
  releaseDate: { fontSize: 16, color: "#aaa", marginVertical: 5 },
  overview: { fontSize: 16, color: "#fff", marginTop: 10, lineHeight: 22 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});

export default TvShowDetailScreen;
