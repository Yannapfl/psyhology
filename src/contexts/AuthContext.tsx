'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { AuthContextType, Role, User } from '@/types/AuthTypes';
import { useRole } from './RoleContext';
import api, { setApiToken } from '@/utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { setRole } = useRole();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const hydrate = async () => {
      if (storedToken) {
        setToken(storedToken);
        setApiToken(storedToken);
        try {
          const { data } = await api.get<User>('/v1/profile');
          setUser(data);
          setRole((data.role as Role) ?? null);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (e) {
          const err = e as AxiosError;
          console.error('Автологин: не удалось получить профиль', err.message);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setApiToken(null);
          setToken(null);
          setUser(null);
          setRole(null);
        }
      }
      setIsHydrated(true);
    };
    void hydrate();
  }, [setRole]);

  const signIn: AuthContextType['signIn'] = async (data) => {
    const authRes = await api.post<{ access_token?: string; refresh_token?: string }>(
      '/v1/auth/sign-in',
      { email: data.email, password: data.password, role: data.role }
    );

    const accessToken = authRes.data?.access_token;
    const refreshToken = authRes.data?.refresh_token;
    if (!accessToken) throw new Error('Токен не получен');

    setToken(accessToken);
    setApiToken(accessToken);
    localStorage.setItem('token', accessToken);
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);

    const profileRes = await api.get<User>('/v1/profile');
    const userData = profileRes.data;

    setUser(userData);
    setRole((userData.role as Role) ?? null);
    localStorage.setItem('user', JSON.stringify(userData));

    if (data.remember) {
      localStorage.setItem('remember_email', data.email);
 
      const r = userData.role as Role;
      if (r) localStorage.setItem('role', r);
    } else {
      localStorage.removeItem('remember_email');
    }

    return { user: userData, role: (userData.role as Role) ?? data.role ?? null };
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    setApiToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
