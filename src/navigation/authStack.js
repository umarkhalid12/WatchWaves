import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/home';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Home" component={Home}/>

    </Stack.Navigator>
  );
};

export default AuthStack;
