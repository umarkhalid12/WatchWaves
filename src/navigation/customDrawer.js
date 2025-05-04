import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../assets/colors';
import { auth } from '../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const CustomDrawer = (props) => {
  // Reference to track if component is mounted
  const isMounted = useRef(true);

  // Listen for auth state changes to redirect after logout
  useEffect(() => {
    // Mark as mounted when component is mounted
    isMounted.current = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'authStack', params: { screen: 'Login' } }],
        });
      }
    });

    return () => {
      // Mark as unmounted when component is unmounted
      isMounted.current = false;
      unsubscribe();
    };
  }, []);

  // Confirm before logging out
  const confirmLogout = () => {
    if (isMounted.current) {
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
    }
  };

  // Perform logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        if (isMounted.current) {
          console.log("User signed out successfully");
        }
      })
      .catch((error) => {
        if (isMounted.current) {
          console.error("Logout error:", error);
          Alert.alert("Logout Failed", error.message);
        }
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
          onPress={() => props.navigation.navigate('searchStack', { screen: 'Favourite' })}
          icon={({ color, size }) => <MaterialIcons name="favorite" color={color} size={size} />}
          labelStyle={{ color: colors.gray, fontSize: 16 }}
        />
        <DrawerItem
          label="Logout"
          onPress={confirmLogout}
          icon={({ color, size }) => <MaterialIcons name="exit-to-app" color={color} size={size} />}
          labelStyle={{ color: colors.gray, fontSize: 16 }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
