import { useState, useCallback } from 'react';
import { getAuth, setAuth } from '@/lib/storage';

const ADMIN_EMAIL = 'admin@listinghub.com';
const ADMIN_PASSWORD = 'admin123';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAuth());

  const login = useCallback((email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAuth(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((): void => {
    setAuth(false);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
