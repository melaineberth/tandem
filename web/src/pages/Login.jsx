import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Contexte personnalisé pour l'authentification
import { useNavigate } from "react-router-dom"; // Pour rediriger l'utilisateur après connexion

// Import des composants UI réutilisables
import Divider from "../components/Divider";
import SocialBtn from "../components/SocialBtn";
import AuthForm from "../components/AuthForm";
import AuthTitle from "../components/AuthTitle";
import AuthState from "../components/AuthState";

// Import des ressources (logos et background image)
import AppleLogo from "../assets/apple.png";
import GoogleLogo from "../assets/google.png";
import Background from "../assets/background.jpg";

// Import de l’animation Lottie
import Lottie from "@lottielab/lottie-player/react";

export default function Login() {
  // URL de l’API backend (défaut en local)
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  const { login } = useAuth(); // méthode pour connecter un utilisateur via le contexte
  const navigate = useNavigate(); // hook pour naviguer programmé

  // État pour afficher les erreurs côté UI
  const [error, setError] = useState(null);

  // Détermine si l'on est en mode "sign in" ou "sign up"
  const [isSignIn, setIsSignIn] = useState(true);

  // Données du formulaire utilisateur
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  // Soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    isSignIn ? signUp(formData) : signIn(formData);
  }

  // Changement entre les modes "sign in" et "sign up"
  function handleClick() {
    setIsSignIn((prev) => !prev);
  }

  // Mise à jour des données du formulaire au fur et à mesure de la saisie
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="grid grid-cols-2 grid-rows-1 h-screen w-auto p-4">
      {/* Colonne gauche avec image de fond + animation Lottie */}
      <div className="bg-cover bg-no-repeat rounded-3xl" style={{ backgroundImage: `url(${Background})` }}>
        <Lottie className="w-full h-full" src="https://cdn.lottielab.com/l/5WSrkiEqcdwzrs.json" autoplay />
      </div>

      {/* Colonne droite : contenu du formulaire */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 items-start gap-8 w-3/5">
          {/* Affiche l'erreur s'il y en a une */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Titre du formulaire, qui change selon le mode */}
          <AuthTitle
            title={isSignIn ? "Money should never be a conflict" : "Reconnect with harmony"}
            subtitle={ isSignIn ? "Sign up to start your 30 days free trial" : "Let’s keep your finances flowing"}
          />

          {/* Boutons pour connexion via des fournisseurs sociaux */}
          <div className="flex flex-row gap-2.5">
            <SocialBtn label="Google" path={GoogleLogo} />
            <SocialBtn label="Apple" path={AppleLogo} />
          </div>

          <Divider>or</Divider>

          {/* Formulaire principal d'authentification */}
          <AuthForm
            state={isSignIn}
            className="flex flex-col justify-center items-center w-full gap-8"
            type="submit"
            action="POST"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Lien pour changer de mode (sign in ↔ sign up) */}
        <AuthState
          content={isSignIn ? "Already have an account ? " : "Don't have an account ? "}
          label={isSignIn ? "Sign in" : "Sign up"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
