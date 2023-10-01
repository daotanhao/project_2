import React, { PropsWithChildren, createContext, useState } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({} as User);

  const value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
