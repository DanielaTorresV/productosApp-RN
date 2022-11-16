import React, { useContext} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { ProductsContext } from '../context/ProductsContext';
import { AuthContext } from '../context/AuthContext';

const ProductsScreen = () => {

  const { logout } = useContext( AuthContext );
  const { products } = useContext( ProductsContext );


  return (
    <View style={ styles.containerProducts }>
      <FlatList 
        data={ products }
        keyExtractor= { (p) => p._id }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={ 0.8 }
          >
            <Text style={ styles.productName } >{ item.nombre }</Text>
          </TouchableOpacity>          
        )}
        ItemSeparatorComponent={() => (
          <View style={ styles.separator } />
        )}
      />

      <View style={{ width: 100 }}>
        <Button 
          title='LOGOUT'
          color='#5856D6'
          onPress={ logout }
        />
      </View>
      
    </View>
  )
}

export default ProductsScreen;


const styles = StyleSheet.create({
  containerProducts:{
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10
  },
  productName: {
    fontSize: 20,
  },
  separator:{
    borderBottomWidth: 3,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  }
});