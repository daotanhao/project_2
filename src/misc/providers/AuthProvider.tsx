import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useRequestWithState } from '../../hooks/useRequest';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => void;
  signUp: (values: any) => void;
  logout: () => void;
  getMe: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { request, loading } = useRequestWithState();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('is-authenticated')
  );
  useEffect(() => {
    if (token) getMe();
  }, [token]);

  console.log('user', user);

  const login = async (email: string, password: string) => {
    await request('/user/login', {
      method: 'POST',
      data: { email, password },
    }).then((res) => {
      setUser(res.data);
      setToken(res.data._id);
      localStorage.setItem('is-authenticated', res.data._id);
    });
  };

  const logout = () => {
    localStorage.removeItem('is-authenticated');
    setUser(null);
    setToken(null);
  };

  const getMe = () => {
    const currentUserId = localStorage.getItem('is-authenticated');
    if (!currentUserId) {
      logout();
    } else {
      request(`/user/${currentUserId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          logout();
        });
    }
  };

  const signUp = async (values: any) => {
    await request('/user/register', {
      method: 'POST',
      data: values,
    }).then((res) => {
      setUser(res.data);
      setToken(res.data._id);
      localStorage.setItem('is-authenticated', JSON.stringify(res.data));
    });
  };

  const value = { user, login, logout, signUp, getMe, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
