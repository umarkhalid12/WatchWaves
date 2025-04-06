import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrendingTvShows from './trendingTv'
import PopularTvShows from './popularTv'
import TopRatedTvShows from './topRatedTv'

const TvSeries = () => {
  return (
    <ScrollView>
     <TrendingTvShows/>
     <PopularTvShows/>
     <TopRatedTvShows/>
    </ScrollView>
  )
}

export default TvSeries

const styles = StyleSheet.create({})