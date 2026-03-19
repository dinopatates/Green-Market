import axios from 'axios';

// On définit l'URL de base de ton API (souvent configurée dans un .env)
const API_URL = 'http://localhost:8000/api/auth'; 

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - { name, email, password }
 */
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        // On propage l'erreur pour que le composant React puisse l'afficher
        throw error.response?.data || "Erreur lors de l'inscription";
    }
};

/**
 * Connexion de l'utilisateur
 * @param {Object} credentials - { email, password }
 */
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Email ou mot de passe incorrect";
    }
};

/**
 * Optionnel : Déconnexion (si ton backend nécessite d'invalider un token)
 */
export const logout = async (token) => {
    try {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Erreur déconnexion", error);
    }
};