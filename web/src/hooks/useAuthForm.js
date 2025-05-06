import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useAuthForm(apiBaseUrl) {
  const { login } = useAuth(); // méthode pour connecter un utilisateur via le contexte
  const navigate = useNavigate(); // hook pour naviguer programmé

  // Données du formulaire utilisateur
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // État pour afficher les erreurs côté UI
  const [error, setError] = useState(null);

  // Mise à jour des données du formulaire au fur et à mesure de la saisie
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Fonction d'inscription
  async function signUp(user) {
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Inclut les cookies, utile pour la gestion de session
        body: JSON.stringify(user),
      });

      const data = await res.json();

      // En cas d'erreur, déclenche une exception
      if (!res.ok) throw new Error(data.error || "Unknown error");

      // Sauvegarde l'utilisateur dans le contexte et redirige vers la page d’accueil
      login(data.user);
      navigate("/");
    } catch (error) {
      // Affiche l’erreur dans le composant
      setError(error.message);
    }
  }

  // Fonction à implémenter pour la connexion
  async function signIn(user) {
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Pour envoyer le cookie de session
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user); // Stocke l'utilisateur dans ton AuthContext
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return {
    formData,
    error,
    handleChange,
    signUp,
    signIn,
  };
}
