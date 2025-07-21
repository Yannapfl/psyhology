'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, SignInRequest, SignInResponse, User } from '@/types/AuthTypes';
import { BaseUrl } from '@/constants/BaseUrl';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (data: SignInRequest) => {
    try {
      const response = await fetch(`${BaseUrl}/v1/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const result: SignInResponse = await response.json();

      const accessToken = result.access_token;

      setToken(accessToken);
      console.log("Токен:", accessToken);

      const userData: User = { email: data.email, role_id: data.role_id };
      setUser(userData);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('SignIn Error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
