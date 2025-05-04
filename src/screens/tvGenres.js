import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getTvGenres } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const TvGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getTvGenres();
        setGenres(data);
      } catch (err) {
        setError("Failed to fetch TV genres. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const renderGenreItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("searchStack", {
        screen: "MoviesByGenre",
        params: { genreId: item.id, genreName: item.name }
      })}>

      <View style={styles.genreCard}>
        <Text style={styles.genreName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#f9bc50" />;

  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View>
      <Text style={styles.sectionTitle}>TV Genres</Text>
      <FlatList
        data={genres}
        renderItem={renderGenreItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e5b60",
    marginVertical: 10,
    marginLeft: 10,
  },
  genreCard: {
    margin: 10,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  genreName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20
  },
});

export default TvGenres;
