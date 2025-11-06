// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se está logado ao carregar
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('flavormix_user');
        const isLogged = localStorage.getItem('flavormix_logged');
        
        if (isLogged === 'true' && savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('flavormix_logged', 'true');
    localStorage.setItem('flavormix_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('flavormix_logged');
    localStorage.removeItem('flavormix_user');
    setUser(null);
  };

  return {
    user,
    loading,
    isLogged: !!user,
    login,
    logout
  };
}