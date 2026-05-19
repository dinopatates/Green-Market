import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const woodBg = "/images/wood_texture.webp";

  return (
    <footer
      className=" py-8"
      style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: "40%",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
      aria-label="Pied de page Green Market"
    >
      <div className="container mx-auto px-4 flex flex-col items-center font-medium">
        {/* Titre */}
        <h2 className="text-3xl font-bold mb-6 text-[var(--color-main)]" tabIndex={0}>
          Green Market
        </h2>

        <nav aria-label="Navigation principale du footer">
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link
                to="/"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Catalogue
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Politique de Confidentialité
              </Link>
            </li>
          </ul>
        </nav>
        
        <p className="mt-6 text-center text-sm" tabIndex={0}>
          © 2024 Green Market. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
