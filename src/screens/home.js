import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { getTrendingAll } from '../services/api.js'
import TrendingAll from './trendingAll.js'
import PopularMovies from './popularMovies.js'
import PopularTvShows from './popularTv.js'

const Home = () => {
  const [trending, setTrending] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchTrendingData = async () => {
      const data = await getTrendingAll(); 
      setTrending(data);  
    };

    fetchTrendingData();
  }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('searchStack', { screen: 'Search' })}>
          <MaterialIcons name="search" size={22} color='#4e5b60' style={styles.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
      style={{marginBottom: 20}}>
       <TrendingAll/>
       <PopularMovies/>
       <PopularTvShows/>
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
    marginBottom: -65
  },
  icon: {
    marginRight: 10,
  },
  logo: {
    height: 130,
    width: 130,
  }
})
