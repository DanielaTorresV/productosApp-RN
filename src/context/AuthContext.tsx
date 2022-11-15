import React, { createContext } from 'react';

import { Usuario } from '../interfaces/AppInterfaces';


type AuthContextProps = {
  errorMessage: string,
  token: string | null,
  user: Usuario | null,
  status: 'checking' | 'authenticated' | 'not-authenticated',
  signUp: () => void,
  signIn: () => void,
  logout: () => void,
  removeEror: () => void,
}

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ({ children }: any) => {
  return(
    <AuthContext.Provider
      value={{

      }}
    >
      { children }
    </AuthContext.Provider>
  )
}
