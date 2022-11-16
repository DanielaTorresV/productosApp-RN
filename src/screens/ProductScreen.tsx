import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import useCategories from '../hooks/useCategories';
import LoadingScreen from './LoadingScreen';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};

const ProductScreen = ({ navigation, route }: Props) => {

  const { id, name = '' } = route.params;

  const { categories, isLoading } = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto'
    })
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={ styles.containerProduct } >
      <ScrollView>
        <Text style={ styles.label } >Nombre del Producto:</Text>
        <TextInput 
          placeholder='Producto'
          //Todo: Value, onChange
          style={ styles.textInput }
        />

        {/* Picker / Selector */}
        <Text style={ styles.label } >Categoría:</Text>

        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
            {
              categories.map( c => (
                <Picker.Item
                  key={ c._id }
                  label={ c.nombre }
                  value={ c._id } 
                />
              ))
            }
          
        </Picker>

        <Button 
          title='Guardar'
          color='#5856D6'
          //TODO: Pro hacer
          onPress={ () => {} }
        />

        <View style={ styles.containerButtons }>
        <Button 
          title='Cámara'
          color='#5856D6'
          //TODO: Pro hacer
          onPress={ () => {} }
        />
        <View style={{ width: 40 }} />
        <Button 
          title='Galería'
          color='#5856D6'
          //TODO: Pro hacer
          onPress={ () => {} }
        />
        </View>

      </ScrollView>
    </View>
  )
}

export default ProductScreen;

const styles = StyleSheet.create({
  containerProduct: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20
  },
  label: {
    fontSize: 20,
  },
  textInput: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 15,
    height: 45,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,    
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});