import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../screens/search';
import MovieDetail from '../screens/movieDetail';
import MoviesByGenre from '../screens/movieByGenre';
import AllMovies from '../screens/allMovies';
import TvShowDetailScreen from '../screens/tvShowDetails';
import AllTvShows from '../screens/allTvShows';
import Favourite from '../screens/favourite';
import Watch from '../screens/watch';

const Stack =createStackNavigator();
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
      <Stack.Screen name="MovieDetail" component={MovieDetail} options={{headerShown:false}}/>
      <Stack.Screen name="MoviesByGenre" component={MoviesByGenre} options={{headerShown:false}}/>
      <Stack.Screen name="AllMovies" component={AllMovies} options={{headerShown:false}}/>
      <Stack.Screen name="TvShowDetail" component={TvShowDetailScreen} options={{headerShown:false}}/>
      <Stack.Screen name="AllTVShows" component={AllTvShows} options={{headerShown:false}}/>
      <Stack.Screen name="Favourite" component={Favourite} options={{headerShown:false}}/>
      <Stack.Screen name="Watch" component={Watch} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default SearchStack

const styles = StyleSheet.create({})