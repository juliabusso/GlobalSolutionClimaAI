"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  nome: string | null;
  email: string | null;
  login: (nome: string, email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [nome, setNome] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedNome = localStorage.getItem("nome");
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (storedNome && storedEmail && token) {
      setNome(storedNome);
      setEmail(storedEmail);
    }
  }, []);

  const login = (nome: string, email: string, token: string) => {
    localStorage.setItem("nome", nome);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    setNome(nome);
    setEmail(email);
  };

  const logout = () => {
    localStorage.clear();
    setNome(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ nome, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
