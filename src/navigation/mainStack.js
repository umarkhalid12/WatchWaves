import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './drawer';
import searchStack from './searchStack';
import AuthStack from './authStack';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="searchStack" component={searchStack} />
      <Stack.Screen name="authStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
