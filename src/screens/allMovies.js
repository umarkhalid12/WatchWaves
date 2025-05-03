import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getPopularMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieDetails,
} from "../services/api";
import { useNavigation } from "@react-navigation/native";

const AllMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [popular, trending, upcoming, nowPlaying] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies(),
        ]);

        const combined = [...popular, ...trending, ...upcoming, ...nowPlaying];
        const uniqueMovies = Array.from(
          new Map(combined.map((movie) => [movie.id, movie])).values()
        );

        setAllMovies(uniqueMovies);
      } catch (error) {
        console.error("Failed to fetch all movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      onPress={async () => {
        try {
          const details = await getMovieDetails(item.id);
          navigation.navigate("searchStack", {
            screen: "MovieDetail",
            params: { movie: details },
          });
        } catch (err) {
          console.error("Error fetching movie details:", err);
        }
      }}
    >
      <View style={styles.posterWrapper}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f9bc50" />
      </View>
    );
  }

  return (
    <FlatList
      data={allMovies}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={4}
      key={'4-column-grid'}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AllMovies;

const styles = StyleSheet.create({
  container: {
    gap: 3
  },
  posterWrapper: {
    margin: 2,
  },
  poster: {
    width: 85,
    height: 130,
    borderRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
