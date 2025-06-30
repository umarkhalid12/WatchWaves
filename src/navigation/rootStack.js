import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './mainStack';
import AuthStack from './authStack';
import { useAuth } from '../services/authContext';

const RootStack = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
