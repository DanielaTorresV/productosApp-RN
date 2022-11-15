import React, { useContext} from 'react';
import { View, Text, FlatList, Button } from 'react-native';

import { ProductsContext } from '../context/ProductsContext';
import { AuthContext } from '../context/AuthContext';

const ProductsScreen = () => {

  const { logout } = useContext( AuthContext );
  const { products } = useContext( ProductsContext );

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList 
        data={ products }
        keyExtractor= { (p) => p._id }
        renderItem={({ item }) => (
          <Text>{ item.nombre }</Text>
        )}
      />
      <Button 
        title='LOGOUT'
        color='#5856D6'
        onPress={ logout }
      />
    </View>
  )
}

export default ProductsScreen;
