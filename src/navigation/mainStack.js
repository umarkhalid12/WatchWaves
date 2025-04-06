import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStack from './authStack';
import HomeStack from './homeStack';
import DrawerNavigator from './drawer';
import DrawerStack from './drawerStack';
import searchStack from './searchStack';


const Stack= createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="authStack" component={AuthStack} options={{headerShown:false}}/>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="searchStack" component={searchStack} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({})