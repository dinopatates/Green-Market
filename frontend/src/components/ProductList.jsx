import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const clothingProducts = data
          .filter((product) => product.category.includes("clothing"));
        setProducts(clothingProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = products.slice(startIdx, endIdx);

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      {/* Produits */}
      <section className="px-4 w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-start items-center">
          <h3 className="py-8 text-xl font-bold">Nos produits</h3>
        </div>

        {loading ? (
          <p>Chargement...</p>
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
                    <div className="w-full h-3/4 bg-white rounded-t-lg flex justify-center items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full object-contain p-2"
                      />
                    </div>

                    {/* Infos */}
                    <div className="px-2 font-bold mt-1">
                      <h4 className="text-md">
                        {product.title.length > 25
                          ? product.title.slice(0, 25) + "…"
                          : product.title}
                      </h4>
                      <p className="text-md">{product.price} €</p>
                    </div>

                    {/* Bouton */}
                    <div className="w-full px-2 font-md text-md bg-[var(--color-main)] hover:bg-green-800 text-white text-center mt-auto py-2 rounded-b-lg hover:opacity-90 transition">
                      Voir le produit
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[var(--color-main)] text-white  rounded disabled:opacity-50"
              >
                Précédent
              </button>

              <span className="flex items-center px-2">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
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
