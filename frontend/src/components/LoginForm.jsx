import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 min-h-screen flex items-center justify-center">
      <section className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>

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
              <label className="text-sm font-bold uppercase tracking-wide">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                placeholder="jean@exemple.fr"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold uppercase tracking-wide">Mot de passe</label>
              <input
                type="password"
                className="w-full p-2 rounded border-none focus:ring-2 focus:ring-[var(--color-main)] outline-none"
                placeholder="••••••••"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="h-px w-full bg-black my-2"></div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-main)] text-white font-bold py-3 rounded hover:bg-gray-800 transition uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Se connecter"}
            </button>
          </form>

          <p className="text-sm text-center mt-2">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-bold underline hover:text-gray-700">
              S'inscrire
            </Link>
          </p>
        </article>
      </section>
    </div>
  );
}
