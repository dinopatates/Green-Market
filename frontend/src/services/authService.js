import axios from 'axios';

/**
 * Configuration de l'instance API
 * Centralise l'URL de base et les headers par défaut
 */
const api = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Inscription d'un utilisateur
 * @param {Object} userData - Données du formulaire (name, email, password)
 * @returns {Promise<Object>} Réponse de l'API (ID utilisateur, message)
 */
export const register = async (userData) => {
    try {
        const { data } = await api.post('/register', userData);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Erreur lors de l'inscription" };
    }
};

/**
 * Authentification de l'utilisateur
 * @param {Object} credentials - Identifiants (email, password)
 * @returns {Promise<Object>} Contient le Token JWT et les informations utilisateur
 */
export const login = async (credentials) => {
    try {
        const { data } = await api.post('/login', credentials);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Identifiants incorrects" };
    }
};

/**
 * Déconnexion
 * @param {string} token - Token JWT pour authentifier la requête
 */
export const logout = async (token) => {
    try {
        await api.post('/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error("Échec de la déconnexion :", error.message);
    }
};