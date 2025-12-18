import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import ProtectedRoute from "./Providers/ProtectedRoute";
import { AuthProvider } from "./Providers/AuthProvider";
import Loader from "./components/Loader";

const ProductList = React.lazy(() => import("./components/ProductList"));
const ProductDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
const HomePage = React.lazy(() => import("./pages/Home"));

export default function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<ProductList />} />
            <Route path="/catalog/{ id }" element={<ProductDetailsPage />} />

            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <PostDetailsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
