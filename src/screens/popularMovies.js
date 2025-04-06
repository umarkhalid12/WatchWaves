import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getPopularMovies } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import TextButton from "../components/textButton";
import { getMovieDetails } from "../services/api";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
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
      console.log("dtatassss", item)
      try {
        const movieDetails = await getMovieDetails(item.id); 
        navigation.navigate("searchStack", {
          screen: "MovieDetail",
          params: { movie: movieDetails }, 
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
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

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f9bc50" />
      </View>
    );

  if (error)
    return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View>
      <View style={{flexDirection:'row', alignItems:'center', gap: 177}}>
      <Text style={styles.title}>Popular Movies</Text>
      <TextButton
      title="See All"
      onPress={()=> navigation.navigate('searchStack',{
        screen:"AllMovies"
      })}/>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e5b60",
    marginVertical: 10,
    marginLeft: 10,
  },
  movieCard: {
    marginRight: 8,
    alignItems: "center",
    left: 8
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: "black",
    marginTop: 6,
    width: 120,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

export default PopularMovies;
