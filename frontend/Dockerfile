# 1. Image de base Node.js (version Alpine, très légère et rapide)
FROM node:20-alpine

# 2. Définition du dossier de travail dans le conteneur
WORKDIR /app

# 3. Copie du package.json pour mettre en cache l'installation des modules
COPY package.json ./

# 4. Installation des dépendances (React, Tailwind, Vite, etc.)
RUN npm install

# 5. Copie de tout le reste du code source du frontend
COPY . .

# 6. Exposition du port (on choisit 3000 pour éviter le conflit avec le Vite du Backend)
EXPOSE 3000

# 7. Lancement de Vite en mode dev, ouvert sur l'extérieur (--host) et sur le port 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]