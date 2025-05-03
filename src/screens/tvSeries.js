import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react'
import TrendingTvShows from './trendingTv'
import PopularTvShows from './popularTv'
import TopRatedTvShows from './topRatedTv'
import { useNavigation } from '@react-navigation/native';

const TvSeries = () => {
const navigation =useNavigation();
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
        <TrendingTvShows />
        <PopularTvShows />
        <TopRatedTvShows />
      </ScrollView>
    </View>
  )
}

export default TvSeries

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 30,
    marginBottom: -50
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    height: 130,
    width: 130,
  }
})