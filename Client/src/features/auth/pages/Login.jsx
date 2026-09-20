import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/auth.api";
import { useAuth } from "../../../app/providers/useAuth";

const TOKEN_KEY = "studentswap_token";
const USER_KEY = "studentswap_user";
const AUTH_KEY = "studentswap_auth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError(
        "Veuillez renseigner votre adresse email et votre mot de passe.",
      );
      return;
    }

    try {
      setLoading(true);

      const data = await loginRequest(formData);

      if (!data?.token) {
        throw new Error("Le serveur n'a pas retourné de token.");
      }

      const user = data.user ?? null;

      // Stockage du token
      localStorage.setItem(TOKEN_KEY, data.token);

      // Stockage des informations utilisateur
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      // Stockage de la session complète
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          token: data.token,
          user,
        }),
      );

      // Mise à jour du contexte d'authentification
      login(data.token, user);

      navigate("/");
    } catch (error) {
      console.error("Erreur de connexion :", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Une erreur est survenue lors de la connexion.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <h1 className="font-display text-display font-bold text-text">
            Connexion
          </h1>

          <p className="mt-2 text-small text-muted">
            Connectez-vous à votre compte StudentSwap.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-small font-medium text-text"
            >
              Adresse email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-small font-medium text-text"
            >
              Mot de passe
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-small text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-small text-muted">
          Vous n&apos;avez pas encore de compte ?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-primary-dark"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;