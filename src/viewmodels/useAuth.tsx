import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  onAuthChange,
} from '../services';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: typeof apiLogin;
  register: typeof apiRegister;
  logout: typeof apiLogout;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: apiLogin,
        register: apiRegister,
        logout: apiLogout,
      }}
    >
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
