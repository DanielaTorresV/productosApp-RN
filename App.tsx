import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';

const AppState = ({ children }: any) => {
  return(
    <AuthProvider>
      <ProductsProvider>
        { children }
      </ProductsProvider>      
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>      
    </NavigationContainer>
  )
}

export default App;

