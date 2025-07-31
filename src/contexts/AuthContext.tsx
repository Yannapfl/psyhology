'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, Role, SignInRequest, User } from '@/types/AuthTypes';
import { BaseUrl } from '@/constants/BaseUrl';
import { useRole } from './RoleContext';
import api from '@/utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { setRole } = useRole();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');


    if (storedToken) {
      try {
        setToken(storedToken);
      } catch (error) {
        console.error('Ошибка при парсинге user из localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const signIn = async (data: SignInRequest) => {
  try {
    const response = await fetch(`${BaseUrl}/v1/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка авторизации');
    }

    const result = await response.json();
    const accessToken = result.access_token;
    const refreshToken = result.refresh_token;

    if (!accessToken) throw new Error('Токен не получен');
    setToken(accessToken);
    localStorage.setItem('token', accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    localStorage.setItem('refresh_token', refreshToken);

    const profileRes = await fetch(`${BaseUrl}/v1/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!profileRes.ok) {
      throw new Error('Ошибка при получении профиля');
    }

    const userData: User = await profileRes.json();

    setUser(userData);
    setRole(userData.role as Role);
    console.log('Установлена роль в контекст:', userData.role);
    console.log('userdata role', userData.role)
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
