import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

const LoginScreen = () => {
  return (
    <>
      {/* BackGround */}
      <Background />
      {/* Keyboard avoid View */}
      <View style={ loginStyles.formContainer }>
        <WhiteLogo />
        <Text style={ loginStyles.title }>Login</Text>

        <Text style={ loginStyles.label }>Email:</Text>
        <TextInput 
          placeholder='Ingrese su email'
          placeholderTextColor='rgba(255,255,255,0.4)'
          keyboardType='email-address'
          underlineColorAndroid= 'white'
          style={ loginStyles.inputField }
          selectionColor='white'
          // onChange={() => {}}
          // value=
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
          // onChange={() => {}}
          // value=
          autoCapitalize='none'
          autoCorrect={ false }
        />

        {/* Botón Login */}
        <View style={ loginStyles.buttonContainer }>
          <TouchableOpacity
          activeOpacity={ 0.8 }
          style={ loginStyles.button }
          >
            <Text style={ loginStyles.buttonText }>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Nueva cuenta */}
        <View style={ loginStyles.newUserContainer }>
          <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ () => console.log('press')}
          >
            <Text style={ loginStyles.buttonText }>Nueva Cuenta </Text>
          </TouchableOpacity>
        </View>
      </View>
      

    </>
  )
}

export default LoginScreen;
