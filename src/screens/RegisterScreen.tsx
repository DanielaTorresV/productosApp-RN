import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any>{};

const RegisterScreen = ({ navigation }: Props) => {

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const onRegister = () => {
    console.log({name, email, password});
    Keyboard.dismiss();
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#5856D6'
        }}
        behavior={ ( Platform.OS === 'ios' ) ? 'padding' : 'height' }
      >
          {/* Keyboard avoid View */}
        <View style={ loginStyles.formContainer }>
          <WhiteLogo />
          <Text style={ loginStyles.title }>Register</Text>

          <Text style={ loginStyles.label }>Name:</Text>
          <TextInput 
            placeholder='Ingrese su nombre'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid= 'white'
            style={ loginStyles.inputField }
            selectionColor='white'
            onChangeText={ (value) => onChange(value, 'name') }
            value={ name }
            onSubmitEditing={ onRegister }
            autoCapitalize='words'
          />

          <Text style={ loginStyles.label }>Email:</Text>
          <TextInput 
            placeholder='Ingrese su email'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='email-address'
            underlineColorAndroid= 'white'
            style={ loginStyles.inputField }
            selectionColor='white'
            onChangeText={ (value) => onChange(value, 'email') }
            value={ email }
            onSubmitEditing={ onRegister }
            autoCapitalize='none'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Password:</Text>
          <TextInput 
            placeholder='*********'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid= 'white'
            style={ loginStyles.inputField }
            selectionColor='white'
            onChangeText={ (value) => onChange(value, 'password') }
            value={ password }
            onSubmitEditing={ onRegister }
            autoCapitalize='none'
            autoCorrect={ false }
          />

          {/* Botón Registro */}
          <View style={ loginStyles.buttonContainer }>
            <TouchableOpacity
            activeOpacity={ 0.8 }
            style={ loginStyles.button }
            onPress={ onRegister }
            >
              <Text style={ loginStyles.buttonText }>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>

          {/* Ingresar */}
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={ () => navigation.replace('LoginScreen')}
              style={ loginStyles.buttonReturn }
            >
              <Text style={ loginStyles.buttonText }>Login</Text>
            </TouchableOpacity>

        </View>
      </KeyboardAvoidingView> 
    </>
  )
}

export default RegisterScreen;