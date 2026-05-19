import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ProtectedRoute from "./Providers/ProtectedRoute";
import { AuthProvider } from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import RegisterPage from "./pages/RegisterPage";

// Lazy load des pages pour améliorer les performances
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProductListPage = React.lazy(() => import("./pages/ProductListPage"));
const ProductDetailsPage = React.lazy(() => import("./pages/ProductDetailsPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CreateProductPage = React.lazy(() => import("./pages/CreateProductPage"));
const OrdersPage = React.lazy(() => import("./pages/OrdersPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));

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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-product" element={<CreateProductPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </Suspense>

          {/* Pied de page */}
          <Footer />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}
