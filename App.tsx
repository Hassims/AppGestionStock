import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { ProductFormScreen } from './src/screens/ProductFormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#111827',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >  
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Gestion Stock 📦' }} 
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{ title: 'Détail du Produit', headerShown: true }} 
          />
          <Stack.Screen 
            name="ProductForm" 
            component={ProductFormScreen} 
            options={({ route }: any) => ({ 
              title: route.params?.productId ? 'Modifier le Produit 📝' : 'Ajouter un Produit ➕' 
            })} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}