import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;

  // Vérifier que l'utilisateur est un producer
  if (currentUser?.role !== "producer") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
          <p>Seuls les producteurs peuvent créer des produits</p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la création du produit");
      }

      const data = await response.json();
      if (data.success) {
        navigate("/products");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Créer un produit - Green Market</title>
      </Helmet>

      <div className="p-4 min-h-screen flex items-center justify-center">
        <section className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Créer un nouveau produit</h1>

          <article
            className="rounded-xl py-8 px-6 flex flex-col gap-4 shadow-lg"
            style={{
              backgroundImage: "url('/images/wood_texture.webp')",
              backgroundSize: "repeat",
            }}
          >
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold uppercase tracking-wide">Nom du produit</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                  placeholder="Ex: T-shirt Coton Bio"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold uppercase tracking-wide">Prix (€)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                  placeholder="29.90"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold uppercase tracking-wide">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                  placeholder="50"
                  min="0"
                  required
                />
              </div>

              <div className="h-px w-full bg-black my-2"></div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--color-main)] text-white font-bold py-3 rounded hover:bg-gray-800 transition uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? "Création..." : "Créer le produit"}
              </button>
            </form>
          </article>
        </section>
      </div>
    </>
  );
}
