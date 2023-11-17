import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types/user';
import { useRequest } from './useRequest';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  getMe: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { request } = useRequest();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('is-authenticated')
  );
  useEffect(() => {
    if (token) getMe();
  }, [token]);

  const login = (email: string, password: string) => {
    setUser({ id: '1', name: 'Hao', email, password });
    setToken(email);
    localStorage.setItem('is-authenticated', email);
  };

  const logout = () => {
    localStorage.removeItem('is-authenticated');
    setUser(null);
    setToken(null);
  };

  const getMe = () => {
    setUser({ id: '1', name: 'Hao', email: 'daotanhao', password: '12345' });
  };

  const value = { user, login, logout, getMe };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
