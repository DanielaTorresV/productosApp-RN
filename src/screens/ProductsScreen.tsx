import React, { useContext, useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ProductsContext } from '../context/ProductsContext';
import { AuthContext } from '../context/AuthContext';
import { ProductsStackParams } from '../navigation/ProductsNavigator';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{};

const ProductsScreen = ({ navigation }: Props) => {

  const { logout } = useContext( AuthContext );
  const { products } = useContext( ProductsContext );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={ 0.8 }
          style={ styles.addButton }
          onPress={ () => navigation.navigate('ProductScreen', {}) }
        >
          <Text style={{ color: 'white' }}>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <View style={ styles.containerProducts }>
      <FlatList 
        data={ products }
        keyExtractor= { (p) => p._id }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => navigation.navigate('ProductScreen', {
              id: item._id,
              name: item.nombre
            }) }
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
  },
  addButton: {
    marginRight: 10,
    backgroundColor: '#5856D6',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5 
  }
});