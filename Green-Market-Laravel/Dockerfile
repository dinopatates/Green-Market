# 1. Image de base PHP 8.3 en mode CLI (parfait pour le développement avec artisan)
FROM php:8.3-cli

# 2. Installation des dépendances système nécessaires pour Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Installation des extensions PHP requises par Laravel (MySQL, BCMath, etc.)
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath

# 4. Récupération de Composer depuis son image officielle
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Récupération de Node.js et NPM (requis car ton package.json utilise Vite et Concurrently)
COPY --from=node:20 /usr/local /usr/local

# 6. Définition du dossier de travail dans le conteneur
WORKDIR /var/www/html

# 7. Optimisation du cache Docker : on copie d'abord les fichiers de dépendances
COPY composer.json package.json ./

# Installation des packages PHP et Node sans exécuter les scripts post-install pour l'instant
RUN composer install --no-scripts --no-autoloader
RUN npm install

# 8. Copie du reste du code de ton application backend
COPY . .

# Génération de l'autoloader final de Composer
RUN composer dump-autoload

# 9. Exposition des ports : 
# 8000 pour Laravel Serve, 5173 pour le serveur de dev Vite local au backend
EXPOSE 8000
EXPOSE 5173

# 10. Lancement de ton script personnalisé défini dans ton composer.json
# Ce script va lancer en parallèle : artisan serve, la queue, les logs et Vite !
CMD ["composer", "dev"]