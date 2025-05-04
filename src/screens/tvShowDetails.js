import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomButton from "../components/customButton";
import SimpleButton from "../components/simpleButton";
import { getTvDetails } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const OverviewTab = ({ overview }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.overview}>{overview}</Text>
  </ScrollView>
);

const InfoTab = ({ tvShow, genreNames }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.info}>Genres: {genreNames}</Text>
    <Text style={styles.info}>Language: {tvShow.original_language?.toUpperCase()}</Text>
    <Text style={styles.info}>Popularity: {tvShow.popularity}</Text>
    <Text style={styles.info}>Rating: {tvShow.vote_average}</Text>
    <Text style={styles.info}>Origin Country: {tvShow.origin_country?.join(", ")}</Text>
  </ScrollView>
);

const TvShowDetailScreen = ({ route }) => {
  const { tvShowId } = route.params;
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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
  const releaseYear = tvShow.first_air_date ? tvShow.first_air_date.split('-')[0] : 'N/A';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backPosterContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}` }} style={styles.backPoster} />
        <LinearGradient colors={['transparent', '#f9bc50']} style={styles.gradient} />
      </View>

      <View style={styles.headerContainer}>
        <View style={styles.posterContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }} style={styles.poster} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {tvShow.name}
          </Text>
          <Text style={styles.releaseDate}>● {releaseYear}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-around' }}>
        <CustomButton
          title="Watch Now"
          onPress={() => navigation.navigate("searchStack", {
            screen: "Watch"
          })}
        />
        <SimpleButton
          title="Trailer"
          width={155}
          paddingVertical={12}
          textColor="#4e5b60"
          backgroundColor="white"
          borderWidth={2}
          borderColor="#f9bc50"
        />
      </View>

      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", color: "#000" },
            tabBarIndicatorStyle: { backgroundColor: "#f9bc50" },
            tabBarStyle: { backgroundColor: "#fff" },
          }}
        >
          <Tab.Screen name="Overview">
            {() => <OverviewTab overview={tvShow.overview} />}
          </Tab.Screen>
          <Tab.Screen name="Info">
            {() => <InfoTab tvShow={tvShow} genreNames={genreNames} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
};

export default TvShowDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -170,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  posterContainer: {
    width: 110,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    flexShrink: 1,
  },
  releaseDate: {
    fontSize: 16,
    color: "white",
  },
  tabContainer: {
    height: 350,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginTop: 15
  },
  overview: {
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 10,
    color: "#000",
    textAlign:'justify'
  },
  info: {
    fontSize: 16,
    marginTop: 8,
    color: "#000",
  },
  tabContent: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20
  },
});
