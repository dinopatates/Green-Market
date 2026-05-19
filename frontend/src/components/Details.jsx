import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState(null);
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);

    fetch(`${api_url}/api/products`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success && response.data) {
          const product = response.data.find((p) => p.id === parseInt(id));
          if (product) {
            setProduct(product);
            setSuggestedProducts(response.data.filter((p) => p.id !== product.id).slice(0, 6));
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, api_url]);

  const handleOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setOrdering(true);

    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${api_url}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [
            {
              product_id: product.id,
              quantity: parseInt(quantity),
            },
          ],
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de la commande");
      }

      const data = await response.json();
      if (data.success) {
        alert("Commande créée avec succès!");
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) {
    return <p className="p-4">Chargement...</p>;
  }

  if (!product) {
    return <p className="p-4">Produit introuvable</p>;
  }

  return (
    <div className="p-4">
      {/* Détails du produit */}
      <section className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Détails du produit
        </h1>

        <article className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white rounded-lg flex justify-center items-center h-80">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
                alt={product.name}
                className="h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Infos */}
          <div
            className="w-full md:w-1/2 rounded-xl py-4 px-4 flex flex-col gap-4"
            style={{
              backgroundImage: "url('/images/wood_texture.webp')",
              backgroundSize: "repeat",
            }}
          >
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            <p className="text-lg font-bold">
              {product.price} € | Stock: {product.stock}
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            {product.stock > 0 ? (
              <form onSubmit={handleOrder} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Quantité</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={ordering}
                  className="bg-[var(--color-main)] text-white px-6 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {ordering ? "Commande en cours..." : "Commander"}
                </button>
              </form>
            ) : (
              <p className="text-red-600 font-bold">Rupture de stock</p>
            )}

            <div className="h-px w-full bg-black my-2"></div>

            <p className="text-md font-medium text-justify">
              Produit de qualité écologique. Vendu par {product.user?.name || "Green Market"}
            </p>
          </div>
        </article>
      </section>

      {/* Ce qui pourrait vous intéresser */}
      {suggestedProducts.length > 0 && (
        <section className="mt-16">
          <h3 className="text-xl font-bold mb-6">
            Ce qui pourrait vous intéresser
          </h3>

          <div className="flex gap-3 overflow-x-auto pb-4">
            {suggestedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="flex-shrink-0"
              >
                <article
                  className="rounded-lg flex flex-col w-56 h-80 transition hover:bg-black/5"
                  style={{
                    backgroundImage: "url('/images/wood_texture.webp')",
                    backgroundSize: "repeat",
                  }}
                >
                  <div className="w-full h-2/3 bg-white rounded-t-lg flex justify-center items-center">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
                      alt={p.name}
                      className="h-full object-contain p-2"
                    />
                  </div>

                  <div className="px-2 font-bold mt-1">
                    <h4 className="text-sm">
                      {p.name.length > 30
                        ? p.name.slice(0, 30) + "…"
                        : p.name}
                    </h4>
                    <p className="text-sm">{p.price} €</p>
                  </div>

                  <div className="w-full px-2 bg-[var(--color-main)] hover:bg-green-800 text-white text-center mt-auto py-2 rounded-b-lg transition">
                    Voir le produit
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
