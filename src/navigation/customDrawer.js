import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../assets/colors';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

const CustomDrawer = (props) => {

  const confirmLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Do you really want to logout?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => handleLogout()
        }
      ]
    );
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        props.navigation.navigate('authStack', {
          screen: 'Login'
        });
      })
      .catch((error) => {
        Alert.alert("Logout Failed", error.message);
      });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#F5EDE7' }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image source={require('../assets/images/logoIcon.png')} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      </View>

      <View style={{ flex: 1 }}>
        <DrawerItem
          label="Dashboard"
          onPress={() => props.navigation.navigate('Dashboard')}
          icon={({ color, size }) => <MaterialIcons name="dashboard" color={color} size={size} />}
          labelStyle={{ color: colors.gray, fontSize: 16 }}
        />
        <DrawerItem
          label="Favourite"
          onPress={() => props.navigation.navigate('searchStack',{
          screen: 'Favourite'})}
          icon={({ color, size }) => <MaterialIcons name="favorite" color={color} size={size} />}
          labelStyle={{ color: colors.gray, fontSize: 16 }}
        />
        <DrawerItem
          label="Logout"
          onPress={confirmLogout} // Updated to call confirmLogout first
          icon={({ color, size }) => <MaterialIcons name="exit-to-app" color={color} size={size} />}
          labelStyle={{ color: colors.gray, fontSize: 16 }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
