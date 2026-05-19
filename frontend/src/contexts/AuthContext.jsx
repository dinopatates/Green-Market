/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Correction : Initialisation "lazy" directement depuis le localStorage.
    // Cela évite le useEffect, le double rendu et l'erreur de modification synchrone d'état.
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null; // Sécurité si le JSON dans le localStorage est corrompu
        }
    });

    // Puisque le chargement du localStorage est instantané au démarrage,
    // le chargement est déjà terminé (false).
    const [loading] = useState(false);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        setUser(data.user); 
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};