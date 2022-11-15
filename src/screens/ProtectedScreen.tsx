import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProtectedScreen = () => {

  const { user, token, logout } = useContext( AuthContext );

  return (
    <View style={ styles.container }>
      <Text style={ styles.title}>Protected Screen</Text>
      <Button 
        title='LOGOUT'
        color='#5856D6'
        onPress={ logout }
      />
      <View style={ styles.containerTexts }>
        <Text style={ styles.text }>
          Usuario: { JSON.stringify( user, null, 5) }
        </Text>
        <Text style={ styles.text }>
          Token: { token }
        </Text>
      </View>
      
    </View>
  )
}

export default ProtectedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22, 
    marginBottom: 20
  },
  containerTexts: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
    marginHorizontal: 20
  },
  text: {
    fontSize: 18,
  }
});