import React from 'react';
import RootStack from './src/navigation/rootStack';
import { AuthProvider } from './src/services/authContext'

const App = () => {
  return (
  <AuthProvider>
      <RootStack />
      </AuthProvider>
  );
};

export default App;
   