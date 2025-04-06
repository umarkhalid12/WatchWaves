import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getTopRatedTvShows } from "../services/api"; // Import the getTopRatedTvShows function
import { useNavigation } from "@react-navigation/native";

const TopRatedTvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for better error handling
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const data = await getTopRatedTvShows(); // Fetch top-rated TV shows data
        setTvShows(data); // Set fetched TV shows data to state
      } catch (err) {
        setError("Failed to fetch top-rated TV shows. Please try again later."); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetch completes (successful or error)
      }
    };
    fetchTvShows(); // Call the function to fetch data
  }, []);

  const renderTvShowItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("searchStack", {
          screen: "TvShowDetail",
          params: { tvShowId: item.id }, // Pass tvShowId instead of the whole tvShow object
        })
      }
    >
      <View style={styles.tvShowCard}>
        {item.poster_path && (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.poster}
          />
        )}
        <Text style={styles.tvShowTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#E50914" />; // Display loading indicator

  if (error) return <Text style={styles.errorText}>{error}</Text>; // Show error message if there was an error during fetching

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🏆 Top Rated TV Shows</Text> {/* Section title */}
      <FlatList
        data={tvShows}
        renderItem={renderTvShowItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  tvShowCard: { marginRight: 10, alignItems: "center" },
  poster: { width: 120, height: 180, borderRadius: 10 },
  tvShowTitle: { color: "#fff", marginTop: 5, width: 120, textAlign: "center" },
  errorText: { color: "#FF0000", textAlign: "center", fontSize: 16, marginTop: 20 }, // Error text style
});

export default TopRatedTvShows;
