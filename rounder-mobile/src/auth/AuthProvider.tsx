/**
 * @class AuthProvider
 * @description provider that handles auth for mobile
 */

import React, {
  createContext, useEffect, useRef, useState, useCallback,
} from 'react';

import { removePassword, checkLogin } from './functions';

interface AuthContextDataLoading {
  loading: true;
}

interface AuthContextDataLoaded {
  loading: false;
  isAuthenticated: boolean;
  getToken(): string;
  setToken(token: string): void;
  logout(): Promise<void>;
}

type AuthContextData = AuthContextDataLoading | AuthContextDataLoaded;

export const AuthContext = createContext<AuthContextData>({ loading: true });

const AuthProvider: React.FC = ({ children }) => {
  const token = useRef<string>();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const init = useCallback(async () => {
    const loginResult = await checkLogin();

    if (loginResult.success) {
      token.current = loginResult.token;
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    token.current = undefined;
    await removePassword();
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    init();
  }, []);

  const value: AuthContextData = loading ? {
    loading: true,
  } : {
    logout,
    loading: false,
    isAuthenticated,
    getToken: (): string => token.current || '',
    setToken: (newToken: string): void => {
      token.current = newToken;
      setIsAuthenticated(true);
    },
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
