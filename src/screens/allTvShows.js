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
  getPopularTvShows,
  getTrendingTvShows,
  getTopRatedTvShows,
} from "../services/api";
import { useNavigation } from "@react-navigation/native";

const AllTvShows = () => {
  const [allTvShows, setAllTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllTvShows = async () => {
      try {
        const [popular, trending, topRated] = await Promise.all([
          getPopularTvShows(),
          getTrendingTvShows(),
          getTopRatedTvShows(),
        ]);

        const combined = [...popular, ...trending, ...topRated];
        const uniqueTvShows = Array.from(
          new Map(combined.map((show) => [show.id, show])).values()
        );

        setAllTvShows(uniqueTvShows);
      } catch (error) {
        console.error("Failed to fetch all TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTvShows();
  }, []);

  const renderTvShowItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("searchStack", {
          screen: "TvShowDetail",
          params: { tvShowId: item.id },
        })
      }
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
      data={allTvShows}
      renderItem={renderTvShowItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={4}
      key={"4-column-grid"}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default AllTvShows;

const styles = StyleSheet.create({
  container: {
    gap: 3,
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
