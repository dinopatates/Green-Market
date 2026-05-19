import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${api_url}/api/products`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success && response.data) {
          setProducts(response.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = products.slice(startIdx, endIdx);

  const defaultImage = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80";

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <section className="px-4 w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-start items-center">
          <h3 className="py-8 text-xl font-bold">Nos vêtements écolos</h3>
        </div>

        {loading ? (
          <p>Chargement des pépites...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-4">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="w-full"
                >
                  <article
                    className="rounded-lg flex flex-col w-full h-96 transition hover:bg-black/5"
                    style={{
                      backgroundImage: "url('/images/wood_texture.webp')",
                      backgroundSize: "repeat",
                    }}
                  >
                    {/* Image */}
                    <div className="w-full h-3/4 bg-white rounded-t-lg flex justify-center items-center overflow-hidden">
                      <img
                        src={product.image} 
                        alt={product.name}
                        className="h-full w-full object-cover p-0"
                      />
                    </div>

                    {/* Infos */}
                    <div className="px-2 font-bold mt-1">
                      <h4 className="text-md">
                        {product.name.length > 25
                          ? product.name.slice(0, 25) + "…"
                          : product.name}
                      </h4>
                      <p className="text-md text-green-700">{product.price} €</p>
                      <p className="text-xs text-gray-500 font-normal">Vendu par : {product.user?.name}</p>
                    </div>

                    {/* Bouton */}
                    <div className="w-full px-2 font-md text-md bg-[var(--color-main)] hover:bg-green-800 text-white text-center mt-auto py-2 rounded-b-lg hover:opacity-90 transition">
                      Voir la pièce
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination reste identique */}
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[var(--color-main)] text-white rounded disabled:opacity-50"
              >
                Précédent
              </button>

              <span className="flex items-center px-2">
                {currentPage} / {totalPages || 1}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 bg-[var(--color-main)] text-white rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </>
        )}
      </section>
    </Suspense>
  );
}