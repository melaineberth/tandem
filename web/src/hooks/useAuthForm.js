import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useAuthForm() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"; // URL de l’API backend (défaut en local)
  const { login } = useAuth(); // méthode pour connecter un utilisateur via le contexte
  const navigate = useNavigate(); // hook pour naviguer programmé
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  }); // Données du formulaire utilisateur
  const [error, setError] = useState(null); // État pour afficher les erreurs côté UI
  const [isLoading, setIsLoading] = useState(false);
  const timer = React.useRef(undefined);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      // En cas d'erreur, déclenche une exception
      if (!res.ok) throw new Error(data.error || "Unknown error");

      timer.current = setTimeout(() => {
        // Sauvegarde l'utilisateur dans le contexte et redirige vers la page d’accueil
        login(data.user, data.token);
        navigate("/onboarding");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      // Affiche l’erreur dans le composant
      setError(error.message);
    }
  }

  // Fonction à implémenter pour la connexion
  async function signIn(user) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      timer.current = setTimeout(() => {
        // Sauvegarde l'utilisateur dans le contexte et redirige vers la page d’accueil
        login(data.user, data.token);
        navigate("/dashboard");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  }

  return {
    formData,
    error,
    isLoading,
    handleChange,
    signUp,
    signIn,
  };
}
