import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cafeApi from '../api/cafeApi';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/AppInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';



type AuthContextProps = {
  errorMessage: string,
  token: string | null,
  user: Usuario | null,
  status: 'checking' | 'authenticated' | 'not-authenticated',
  signUp: ( registerData: RegisterData) => void,
  signIn: ( loginData: LoginData ) => void,
  logout: () => void,
  removeEror: () => void,
}

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer( AuthReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async() => {
    const token =  await AsyncStorage.getItem( 'token' );

    if ( !token ) return dispatch({ type: 'notAuthenticated' });

    const { data, status } = await cafeApi.get('/auth');

    if( status !== 200 ) {
      return dispatch({ type: 'notAuthenticated' });
    }
    await AsyncStorage.setItem('token', data.token );
    dispatch({ 
      type: 'signUp',
      payload: {
        token: data.token,
        user: data.usuario
      }
    });
  }

  const signIn = async({ correo, password }: LoginData) => {
    try {
      
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password
      });

      dispatch({ 
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      });

      await AsyncStorage.setItem('token', data.token );

    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Información Incorrecta'
      });
    }
  };
  const signUp = async({ nombre, correo, password }: RegisterData ) => {
    try {
      
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password
      });

      dispatch({ 
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      });

      await AsyncStorage.setItem('token', data.token );

    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información'
      });
    }
  };
  
  const logout = async() => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };
  const removeEror = () => {
    dispatch({ type: 'removeError' });
  };

  return(
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logout,
        removeEror,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}
