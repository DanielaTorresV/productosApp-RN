import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';

import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};

const ProductScreen = ({ navigation, route }: Props) => {

  const { id, name = '' } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto'
    })
  }, [])

  return (
    <View style={ styles.containerProduct } >
      <Text style={ styles.text }>{ id }</Text>
      <Text style={ styles.text }>{ name }</Text>
    </View>
  )
}

export default ProductScreen;

const styles = StyleSheet.create({
  containerProduct: {
    flex: 1,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 20
  }
});