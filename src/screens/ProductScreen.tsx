import React, { useEffect, useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image } from 'react-native';

import {Picker} from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { ProductsStackParams } from '../navigation/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import LoadingScreen from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};

const ProductScreen = ({ navigation, route }: Props) => {

  const { id = '', name = '' } = route.params;

  const [ tempUri, setTempUri ] = useState<string>();

  const { categories, isLoading } = useCategories();

  const { loadProductById, addProduct, updateProduct, uploadImage } = useContext( ProductsContext );

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  });


  useEffect(() => {
    navigation.setOptions({
      title: (nombre) ? nombre : 'Sin Nombre del Producto'
    })
  }, [nombre]);

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
    });
  }

  const saveOrUpdate = async() => {
    if ( id.length > 0 ) {
      updateProduct( categoriaId, nombre, id );
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct( tempCategoriaId, nombre );
      onChange( newProduct._id, '_id');
    }
  }

  const takePhoto = () => {
    launchCamera({
      cameraType: 'back',
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if (resp.didCancel) return;
      if (!resp.assets![0].uri) return;

      //console.log(resp);
      setTempUri(resp.assets![0].uri);
      uploadImage( resp, _id);
    });
  }

  const takePhotoFromGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if (resp.didCancel) return;
      if (!resp.assets![0].uri) return;

      //console.log(resp);
      setTempUri(resp.assets![0].uri);
      uploadImage( resp, _id);
    });
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
          value={ nombre }
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
          onPress={ saveOrUpdate }
        />

        {
          ( _id.length > 0 ) && (
            <View style={ styles.containerButtons }>
              <Button 
                title='Cámara'
                color='#5856D6'
                //TODO: Pro hacer
                onPress={ takePhoto }
              />
              <View style={{ width: 40 }} />
              <Button 
                title='Galería'
                color='#5856D6'
                //TODO: Pro hacer
                onPress={ takePhotoFromGallery }
              />
            </View>
          )
        }        

        {
          ( img.length > 0 && !tempUri ) && (
            <Image 
              source={{ uri: img }}
              style={ styles.image }
            />
          )
        }
        {/* todo mostrar img temporal */}
        {
          ( tempUri ) && (
            <Image 
              source={{ uri: tempUri }}
              style={ styles.image }
            />
          )
        }

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