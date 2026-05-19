/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
// import Loader from "../components/Loader"; // Enlevé pour éviter l'erreur 'no-unused-vars' (jamais utilisé)

export const AuthContext = createContext();
const api_url = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      // 1. Correction : On récupère le token ICI à l'intérieur. 
      // Cela supprime l'erreur de dépendance manquante d'un seul coup.
      const token = localStorage.getItem("token");

      // 2. Correction logique : C'est "if (!token)" (s'il n'y a PAS de token).
      // Ton ancien code coupait la fonction si un token existait, empêchant de charger l'utilisateur.
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${api_url}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { user } = await response.json();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Erreur de validation du token :", error);
      } finally {
        setLoading(false);
      }
    }

    validateToken();
  }, []);

  async function logout() {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  async function login({ email, password }) {
    try {
      const response = await fetch(`${api_url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 400) {
        throw new Error("* Champs emails et mot de passe obligatoires");
      }

      if (response.status === 401) {
        throw new Error("Email ou mot de passe incorrecte");
      }

      if (response.status === 500) {
        throw new Error("Erreur serveur : réessayez plus tard");
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      if (token) {
        const response = await fetch(`${api_url}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = await response.json();
        setCurrentUser(user);
      }
    } catch (e) {
      // 3. Correction : On log l'erreur avant de la rethrow.
      // Cela règle l'erreur ESLint 'no-useless-catch'.
      console.error("Erreur détectée lors de la connexion :", e);
      throw e;
    }
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    logout,
    login,
    setCurrentUser,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}