import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearUserSession, getAuthToken, getUserSession, setAuthToken, setUserSession, UserSession } from '../services/api';

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: UserSession) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = await getAuthToken();
        const storedUser = await getUserSession();
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (e) {
        console.error('Failed to load auth session:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, []);

  const login = async (newToken: string, newUser: UserSession) => {
    await setAuthToken(newToken);
    await setUserSession(newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    await clearUserSession();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
