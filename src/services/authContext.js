import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = (user) => {
    if (user) {
      setCurrentUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL
      });
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.log('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();

    return () => subscriber();
  }, []);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      const user = auth.currentUser;
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL
        });
      }
    } catch (e) {
      console.log('Failed to save token', e);
      throw e;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
      setCurrentUser(null);
    } catch (e) {
      console.log('Failed to sign out', e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user: currentUser,
        isLoading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
