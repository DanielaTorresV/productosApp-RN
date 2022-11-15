import React, { createContext, useReducer } from 'react';

import { Usuario, LoginResponse, LoginData } from '../interfaces/AppInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';
import cafeApi from '../api/cafeApi';


type AuthContextProps = {
  errorMessage: string,
  token: string | null,
  user: Usuario | null,
  status: 'checking' | 'authenticated' | 'not-authenticated',
  signUp: () => void,
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

    } catch (error: any) {
      console.log( error.response.data.msg );
    }
  };
  const signUp = () => {};
  const logout = () => {};
  const removeEror = () => {};

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
