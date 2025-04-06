import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient'; 

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;

  const genreNames = movie.genres ? movie.genres.map(g => g.name).join(", ") : "N/A";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backPosterContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} style={styles.backPoster} />
        <LinearGradient
          colors={['transparent', '#f9bc50']}
          style={styles.gradient} 
        />
      </View>

      <View style={styles.posterContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
      </View>

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.releaseDate}>📅 Release Date: {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.info}>🗣 Language: {movie.original_language.toUpperCase()}</Text>
      <Text style={styles.info}>🔥 Popularity: {movie.popularity}</Text>
      <Text style={styles.info}>🎭 Genres: {genreNames}</Text>
      <Text style={styles.info}>⭐ Rating: {movie.vote_average} / 10</Text>
    </ScrollView>
  );
};
export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backPosterContainer: {
    width: "100%",
    height: 250,
    position: 'relative',
  },
  backPoster: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  posterContainer: {
    position: "absolute",
    top: 100,  
    left: "30%",
    transform: [{ translateX: -100 }], 
    zIndex: 1, 
  },
  poster: {
    width: 110,
    height: 140,
    borderRadius: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10
  },
  releaseDate: {
    fontSize: 16,
    color: "#aaa",
    marginVertical: 5
  },
  overview: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    lineHeight: 22
  },
  info: {
    fontSize: 16,
    color: "#bbb",
    marginTop: 8
  },
});
