import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProtectedRoute from "./Providers/ProtectedRoute";
import { AuthProvider } from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

// Lazy load des pages pour améliorer les performances
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductListPage = React.lazy(() => import("./pages/ProductListPage"));
const ProductDetailsPage = React.lazy(() => import("./pages/ProductDetailsPage"));

export default function App() {
  return (
    // AuthProvider gère la connexion utilisateur
    <AuthProvider>
      {/* HelmetProvider pour SEO + Helmet */}
      <HelmetProvider>
        {/* BrowserRouter pour le routage */}
        <BrowserRouter>
          {/* Navigation */}
          <Nav />

          {/* Suspense pour le lazy loading */}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<HomePage />} />

              {/* Page liste des produits */}
              <Route path="/products" element={<ProductListPage />} />

              {/* Détails d'un produit */}
              <Route
                path="/product/:id"
                element={

                    <ProductDetailsPage />
                }
              />
            </Routes>
          </Suspense>

          {/* Pied de page */}
          <Footer />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}
