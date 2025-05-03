import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import TrendingMovies from './trendingMovies'
import UpcomingMovies from './upcomingMovies'
import LatestMovies from './latestMovies'
import PopularMovies from './popularMovies'

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('searchStack', { screen: 'Search' })}>
          <MaterialIcons name="search" size={22} color='#4e5b60' style={styles.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView 
      showsVerticalScrollIndicator={false}>
      <TrendingMovies/>
      <UpcomingMovies/>
      <LatestMovies/>
      <PopularMovies/>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 30,
    marginBottom: -40
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    height: 130,
    width: 130,
  }
})