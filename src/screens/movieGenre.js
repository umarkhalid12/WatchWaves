import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMovieGenres } from "../services/api"; // Import API function

const MovieGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Navigation hook

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        if (data.length > 0) {
          setGenres(data);
        } else {
          console.log("No genres found in the response");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  // Function to handle genre press
  const handleGenrePress = (genre) => {
    navigation.navigate("searchStack", {
      screen: "MoviesByGenre",
      params: { genreId: genre.id, genreName: genre.name }
    });
  }; // Add this closing brace

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity style={styles.genreCard} onPress={() => handleGenrePress(item)}>
      <Text style={styles.genreTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Movie Genres</Text>
      {genres.length > 0 ? (
        <FlatList
          data={genres}
          renderItem={renderGenreItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noDataText}>No genres available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  genreCard: { padding: 15, backgroundColor: "#333", marginBottom: 8, borderRadius: 8, alignItems: "center" },
  genreTitle: { color: "#fff", fontSize: 18 },
  noDataText: { color: "#fff", textAlign: "center", marginTop: 20 },
});

export default MovieGenre;
