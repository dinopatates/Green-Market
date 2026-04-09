import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export default function Nav() {
  const { currentUser, logout } = useAuth();

  return (
    <Suspense>
      <nav
        className="main-nav bg-repeat bg-center flex items-center px-4"
        style={{ backgroundImage: "url('/images/wood_texture.webp')" }}
      >
        <div className="nav-container class w-full flex justify-between items-center py-4">
          <Link to="/" className="nav-logo">
            <h1 className="text-3xl font-bold text-[vut(--color-main)]">Green Market</h1>
          </Link>

          <div className="nav-links">
            {currentUser ? (
              <>
                <span className="text-lg py-2 px-4 text-white flex items-center rounded-md mr-4">
                  Connecté ({currentUser.name})
                </span>
                <button
                  onClick={logout}
                  className="text-lg py-2 px-4 text-white bg-red-600 flex justify-center items-center rounded-md mr-4 hover:opacity-90 transition-[var(--transition-normal)]"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="text-lg py-2 px-4 text-white bg-[var(--color-main)] flex justify-center  items-center rounded-md mr-4 hover:opacity-90 transition-[var(--transition-normal)]">
                Connexion / Inscription
              </Link>
            )}

            <Link to="/products" className="text-lg py-2 px-4 text-white bg-[var(--color-main)] flex justify-center  items-center rounded-md mr-4 hover:opacity-90 transition-[var(--transition-normal)]">
              Catalogue
            </Link>
          </div>
        </div>
      </nav>
    </Suspense>
  );
}
