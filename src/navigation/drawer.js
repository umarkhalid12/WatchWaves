import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './homeStack';
import CustomDrawer from './customDrawer';
import { colors } from '../assets/colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        swipeEnabled: true,
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
