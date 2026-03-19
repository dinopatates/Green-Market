import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((productData) => {
        setProduct(productData);

        return fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((allProducts) => {
            const suggestions = allProducts
              .filter(
                (p) =>
                  p.category === productData.category &&
                  p.id !== productData.id
              )
              .slice(0, 6);

            setSuggestedProducts(suggestions);
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [id]);

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
                src={product.image}
                alt={product.title}
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
              {product.title}
            </h2>

            <p className="text-lg font-bold">
              {product.price} €
            </p>

            <div className="flex justify-end">
              <button className="bg-[var(--color-main)] text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                Acheter
              </button>
            </div>

            <div className="h-px w-full bg-black my-2"></div>

            <p className="text-md font-medium text-justify">
              {product.description}
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
                      src={p.image}
                      alt={p.title}
                      className="h-full object-contain p-2"
                    />
                  </div>

                  <div className="px-2 font-bold mt-1">
                    <h4 className="text-sm">
                      {p.title.length > 30
                        ? p.title.slice(0, 30) + "…"
                        : p.title}
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
