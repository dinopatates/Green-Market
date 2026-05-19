import React, { Suspense, useEffect, useState, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* Carte produit memo pour eviter re-render inutiles */
const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <article
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex-shrink-0 w-60 rounded-lg flex flex-col h-96 transition hover:bg-black/5 focus:outline-none focus:ring-4 focus:ring-green-600"
      aria-label={`Voir les détails du produit`}
    >
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col h-full"
        aria-label={`Voir les détails du produit ${product.name}`}
      >
        {/* Image produit */}
        <div className="w-full h-3/4 bg-white rounded-t-lg flex justify-center items-center" aria-hidden="true">
          <img
            src={product.image || "/images/placeholder-product.png"}
            alt=""
            loading="lazy"
            className="h-full object-contain p-2 pointer-events-none"
            onError={(e) => e.target.src = "/images/placeholder-product.png"}
          />
        </div>

        {/* Infos produit */}
        <div className="px-2 font-bold mt-1">
          <h4 className="text-md">{product.name.length > 25 ? product.name.slice(0, 25) + "…" : product.name}</h4>
          <p className="text-md">{product.price} €</p>
        </div>

        <div className="w-full px-2 font-md text-md bg-[var(--color-main)] hover:bg-green-800 text-white text-center mt-auto py-2 rounded-b-lg hover:opacity-90 transition">
          Voir le produit
        </div>
      </Link>
    </article>
  );
});

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);

  const heroImg = "/images/vetement_recycle_head.webp";

  useEffect(() => {
    const api_url = import.meta.env.VITE_API_URL;
    fetch(`${api_url}/api/products`)
      .then((res) => res.json())
      .then((response) => {
        if (response.success && response.data) {
          setProducts(response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des produits:", error);
        setLoading(false);
      });

    const img = new Image();
    img.src = heroImg;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Green Market - Vêtements recyclés et durables</title>
        <meta
          name="description"
          content="Green Market propose des vêtements recyclés et durables. Découvrez nos produits éthiques et contribuez à la protection de l'environnement."
        />
      </Helmet>

      <Suspense fallback={<div>Chargement...</div>}>
        {/* Hero */}
        <header
          className="relative w-full h-screen flex flex-col justify-center items-center transition-opacity duration-700"
          style={{
            backgroundImage: bgLoaded
              ? `url(${heroImg})`
              : "linear-gradient(#f0f0f0, #f0f0f0)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: bgLoaded ? 1 : 0,
          }}
          aria-label="Section héro Green Market"
        >
          <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Green Market
            </h1>
            <h2 className="text-2xl font-bold text-white">
              Protégeons notre planète, un vêtement à la fois.
            </h2>
          </div>
        </header>

        <main>
          {/* Produits */}
          <section className="px-4 py-8" aria-label="Nos produits">
            <h3 className="text-xl font-bold mb-6">
              Nos produits
            </h3>

            {loading ? (
              <p>Chargement...</p>
            ) : (
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-4">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="w-full flex justify-end">
              <Link
                to="/products"
                className="inline-block mt-4 px-6 py-2 bg-[var(--color-main)] text-white font-semibold rounded-md hover:bg-green-800 transition focus:outline-none focus:ring-4 focus:ring-green-600"
                aria-label="Voir tous les produits"
              >
                Voir tous les produits
              </Link>
            </div>
          </section>

          {/* À propos */}
          <section className="px-4 py-8" aria-label="À propos de Green Market">
            <h3 className="text-xl font-bold mb-6">
              À propos de nous
            </h3>
            <div className="flex flex-col md:flex-row w-full h-auto md:h-76 items-center gap-6 md:gap-20 md:px-20 lg:px-40">
              <p className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left mb-4 md:mb-0">
                Green Market est une plateforme dédiée à la vente de vêtements
                recyclés et durables. Nous croyons en la mode éthique et en la
                protection de l'environnement. En choisissant nos produits, vous
                contribuez à réduire les déchets textiles et à promouvoir un
                mode de vie plus responsable.
              </p>
              <img
                className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-full object-cover rounded-lg"
                src="{{product.image}}"
                alt=""
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </section>
        </main>
      </Suspense>
    </>
  );
}
