Green market est une plateforme e-commerce éco-responsable qui permet d'acheter et de vendre des articles ne faisant pas de mal à notre planète.

Site fait avec :

Laravel + Vite, React, PHP, HTML CSS et Tailwind.

Installation :

composer install,

npm install

LANCEMENT

créer deux terminals :

Premier terminal, aller dans Green-Market-Laravel et lancer la commande "php artisan serve".

Deuxième terminal, aller dans front-end et lancer la commande "npm run dev".

Aller sur le localhost donné par vite.

Variables d'environnements :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=green_market

Structure du projet :

GREEN-MARKET/
├── db/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Details.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HomeContent.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── Providers/
│   │   ├── services/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── pie
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
└── Green-Market-Laravel/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── AuthController.php
    │   │   │   ├── Controller.php
    │   │   │   ├── OrdersController.php
    │   │   │   ├── ProductsController.php
    │   │   │   └── UsersController.php
    │   │   └── Middleware/
    │   ├── Models/
    │   │   ├── Order.php
    │   │   ├── OrderLine.php
    │   │   ├── Product.php
    │   │   └── User.php
    │   └── Providers/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── public/
    ├── resources/
    │   ├── css/
    │   ├── js/
    │   └── views/
    ├── routes/
    │   ├── api.php
    │   ├── console.php
    │   └── web.php
    ├── storage/
    ├── tests/
    ├── vendor/
    ├── .editorconfig
    ├── .env
    ├── .env.example
    ├── .gitattributes
    ├── .gitignore
    ├── artisan
    ├── composer.json
    ├── composer.lock
    ├── package.json
    ├── phpunit.xml
    └── vite.config.js

    Route::post/register'
    Route::post/login'
    Route::get/me'

// Users routes
Route::get/users    -   Sert à voir les utilisateurs
Route::get/users/{user} -   Sert à voir un utilisateur précisément

// Products routes
Route::get/products -   voir la liste des produits
Route::get/products/{product}   -   voir un produit précisément
Route::post/products    -   créer un produit

// Orders routes
    Route::post/orders  -   créer une commande
    Route::get/orders   -   voir les commandes
    Route::get/orders/{order}   -   voir une commande précisément

Sécurité :

Mot de passes hashés en base de données, administration par rôles administrateurs seulement et création de produits par rôles aussi.

RGPD :

Supression modifications des données, demande possible en contactant le site et utilisation des données clairement dite sur la page des politiques de confidentialités