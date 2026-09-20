import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerRequest } from "../api/auth.api";
import { getVilles } from "../../villes/api/villes.api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    Id_villes: "",
  });

  const [villes, setVilles] = useState([]);
  const [loadingVilles, setLoadingVilles] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const data = await getVilles();
        setVilles(data);
      } catch (error) {
        console.error("Erreur lors du chargement des villes :", error);
        setError("Impossible de charger la liste des villes.");
      } finally {
        setLoadingVilles(false);
      }
    };

    fetchVilles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
    setSuccess("");
  
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.pseudo ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.Id_villes
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    try {
      setLoading(true);
  
      await registerRequest(formData);
  
      setSuccess(
        "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
      );
  
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Erreur inscription :", error);
      console.error("Réponse backend :", error.response?.data);
  
      setError(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          "Une erreur est survenue lors de l'inscription.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <h1 className="font-display text-display font-bold text-text">
            Inscription
          </h1>

          <p className="mt-2 text-small text-muted">
            Créez votre compte StudentSwap.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="prenom"
                className="text-small font-medium text-text"
              >
                Prénom
              </label>

              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Lucas"
                autoComplete="given-name"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="nom"
                className="text-small font-medium text-text"
              >
                Nom
              </label>

              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Daviot"
                autoComplete="family-name"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="pseudo"
              className="text-small font-medium text-text"
            >
              Pseudo
            </label>

            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              placeholder="monpseudo"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

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
              htmlFor="Id_villes"
              className="text-small font-medium text-text"
            >
              Ville
            </label>

            <select
              id="Id_villes"
              name="Id_villes"
              value={formData.Id_villes}
              onChange={handleChange}
              disabled={loadingVilles}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {loadingVilles
                  ? "Chargement des villes..."
                  : "Sélectionnez votre ville"}
              </option>

              {villes.map((ville) => (
                <option key={ville.Id_villes} value={ville.Id_villes}>
                  {ville.nom}
                </option>
              ))}
            </select>
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
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-body text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-small font-medium text-text"
            >
              Confirmer le mot de passe
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              autoComplete="new-password"
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

          {success && (
            <p
              role="status"
              className="rounded-xl bg-green-50 px-4 py-3 text-small text-green-600"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || loadingVilles}
            className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Création du compte..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-small text-muted">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary-dark"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;