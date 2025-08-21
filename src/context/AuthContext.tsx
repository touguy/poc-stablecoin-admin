'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

type User = { id: string; username: string } | null;

type AuthContextValue = {
  user: User;
  isAuthenticated: boolean;
  setUser: (u: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const logout = useCallback(() => {
    setUser(null);
    // 서버에 /auth/logout 호출 및 쿠키 삭제 처리를 권장
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
