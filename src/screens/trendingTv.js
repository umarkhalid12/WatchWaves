import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getTrendingTvShows } from "../services/api"; 
import { useNavigation } from "@react-navigation/native";
import TextButton from "../components/textButton";

const TrendingTvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const data = await getTrendingTvShows(); 
        setTvShows(data); 
      } catch (err) {
        setError("Failed to fetch trending TV shows. Please try again later."); 
      } finally {
        setLoading(false); 
      }
    };
    fetchTvShows(); 
  }, []);

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : title;
  };

  const renderTvShowItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("searchStack", {
          screen: "TvShowDetail",
          params: { tvShowId: item.id }, 
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
        <Text style={styles.tvShowTitle}>{truncateTitle(item.name)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#f9bc50" />; 

  if (error) return <Text style={styles.errorText}>{error}</Text>; 

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 151 }}>
        <Text style={styles.sectionTitle}>Trending TV Shows</Text>
        <TextButton
          title="View All"
          onPress={() => navigation.navigate('searchStack',{
            screen: 'AllTVShows'
          })}
        />
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e5b60",
    marginVertical: 10,
    marginLeft: 10,
  },
  tvShowCard: {
    marginRight: 8,
    alignItems: "center",
    left: 8
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10
  },
  tvShowTitle: {
    color: "black",
    marginTop: 5,
    width: 120,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 13
  },
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20
  },
});

export default TrendingTvShows;
