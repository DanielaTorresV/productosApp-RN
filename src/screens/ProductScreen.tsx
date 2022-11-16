import React, { useEffect, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';

import {Picker} from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigation/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import LoadingScreen from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};

const ProductScreen = ({ navigation, route }: Props) => {

  const { id = '', name = '' } = route.params;

  const { categories, isLoading } = useCategories();

  const { loadProductById } = useContext( ProductsContext );

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  });


  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Nuevo Producto'
    })
  }, []);

  useEffect(() => {
    loadProduct();
  }, [])

  const loadProduct = async() => {
    if (id.length === 0) return;
    const product = await loadProductById( id );
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre,
      img: product.img || ''
    })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={ styles.containerProduct } >
      <ScrollView>
        <Text style={ styles.label } >Nombre del Producto:</Text>
        <TextInput 
          placeholder='Producto'
          value={ name }
          onChangeText={ (value) => onChange(value, 'nombre') }
          style={ styles.textInput }
        />

        {/* Picker / Selector */}
        <Text style={ styles.label } >Categoría:</Text>

        <Picker
          selectedValue={ categoriaId }
          onValueChange={( value ) =>
            onChange( value, 'categoriaId' )
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

        {
          img.length > 0 && (
            <Image 
              source={{ uri: img }}
              style={ styles.image }
            />
          )
        }
                {/* todo mostrar img temporal */}

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
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: 300
  }
});