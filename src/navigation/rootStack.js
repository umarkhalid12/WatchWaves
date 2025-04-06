import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/splash';
import MainStack from './mainStack';

const RootStack = () => {
const [loading, setloading] =useState(false);
  return (
     <NavigationContainer>
      {loading? <Splash/>: <MainStack/>}
     </NavigationContainer>
  )
}

export default RootStack

const styles = StyleSheet.create({})