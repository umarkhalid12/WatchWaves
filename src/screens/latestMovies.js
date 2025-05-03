import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { getNowPlayingMovies } from "../services/api"; 
import { useNavigation } from "@react-navigation/native";
import { getMovieDetails } from "../services/api";
import TextButton from "../components/textButton";

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

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : title;
  };


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
        <Text style={styles.movieTitle}>{truncateTitle(item.title)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" color="#f9bc50" />;

  return (
    <View>
     <View style={{flexDirection:'row', alignItems:'center', gap: 150}}>
      <Text style={styles.title}>Now Playing Movies</Text>
      <TextButton
      title="View All"
      onPress={()=> navigation.navigate('searchStack',{
        screen:"AllMovies"
      })}/>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e5b60",
    marginVertical: 10,
    marginLeft:'2%'
  },
  movieCard: {
    alignItems: "center",
    left: 8
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginRight: 9
  },
  movieTitle: {
    color: "black",
    marginTop: 6,
    width: 120,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default LatestMovies;
