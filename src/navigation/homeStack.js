import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/home';
import tvSeries from '../screens/tvSeries';
import Movie from '../screens/movie';
import { colors } from '../assets/colors';
import Genre from '../screens/genre';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-filled';
            } else if (route.name === 'TV Series') {
              iconName = 'tv';
            }
            else if(route.name === 'Movies'){
              iconName = 'movie';
            }
            else if(route.name === 'Genre'){
              iconName ='lightbulb-outline'
            }

            return <MaterialIcons name={iconName} size={22} color={color} />;
          },
          tabBarActiveTintColor: colors.theme,
          tabBarInactiveTintColor: colors.gray,
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Tab.Screen name="Movies" component={Movie} options={{headerShown: false}} />
        <Tab.Screen name="TV Series" component={tvSeries} options={{headerShown: false}} />
        <Tab.Screen name="Genre" component={Genre} options={{headerShown: false}} />
      </Tab.Navigator>
  );
}
