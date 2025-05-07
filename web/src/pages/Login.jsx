import React, { useState } from "react";

// Import des composants UI réutilisables
import Divider from "../components/Divider";
import SocialBtn from "../components/SocialBtn";
import AuthForm from "../components/AuthForm";
import AuthTitle from "../components/AuthTitle";
import AuthState from "../components/AuthState";
import IconBtn from "../components/IconBtn";

// Import du contexte d'authentification
import useAuthForm from "../hooks/useAuthForm";

// Import des ressources (logos et background image)
import AppleLogo from "../assets/apple.png";
import GoogleLogo from "../assets/google.png";
import Background from "../assets/background.jpg";

// Import de l’animation Lottie
import Lottie from "@lottielab/lottie-player/react";
import Alert from '@mui/material/Alert';
import { ArrowLeft02Icon } from '@hugeicons-pro/core-stroke-sharp';

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // hook pour naviguer programmé
  const [isSignIn, setIsSignIn] = useState(true); // Détermine si l'on est en mode "sign in" ou "sign up"
  const { formData, error, isLoading, handleChange, signUp, signIn } = useAuthForm();

  // Soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    isSignIn ? signUp(formData) : signIn(formData);
  }

  // Changement entre les modes "sign in" et "sign up"
  function handleClick() {
    setIsSignIn((prev) => !prev);
  }

  function handleBack() {
    console.log("Back to website");
    // Redirige vers la page d'accueil
    navigate("/");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-1 h-screen w-auto p-4">
      {/* Colonne gauche avec image de fond + animation Lottie */}
      <div className="bg-cover bg-no-repeat rounded-[40px]" style={{ backgroundImage: `url(${Background})` }}>
        <IconBtn onClick={handleBack} style={{position: "absolute", top: 35, left: 35}} icon={ArrowLeft02Icon} label="Back to website" />
        <Lottie
          className="w-full h-full pointer-events-none"
          src="https://cdn.lottielab.com/l/5WSrkiEqcdwzrs.json"
          autoplay
        />
      </div>

      {/* Colonne droite : contenu du formulaire */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 items-start gap-10 w-3/5">
          {/* Affiche l'erreur s'il y en a une */}
          {error && <Alert className="absolute top-4" severity="error" onClose={() => {}}>{error}</Alert>}

          {/* Titre du formulaire, qui change selon le mode */}
          <AuthTitle
            title={
              isSignIn
                ? "Money should\n never be a conflict"
                : "Reconnect\n with harmony"
            }
            subtitle={
              isSignIn
                ? "Sign up to start your 30 days free trial"
                : "Let’s keep your finances flowing"
            }
          />

          {/* Formulaire principal d'authentification */}
          <AuthForm
            state={isSignIn}
            type="submit"
            action="POST"
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <Divider>or continue with</Divider>

          {/* Boutons pour connexion via des fournisseurs sociaux */}
          <div className="flex flex-row gap-5">
            <SocialBtn label="Google" path={GoogleLogo} />
            <SocialBtn label="Apple" path={AppleLogo} />
          </div>
        </div>

        {/* Lien pour changer de mode (sign in ↔ sign up) */}
        <AuthState
          content={
            isSignIn ? "Already have an account ? " : "Don't have an account ? "
          }
          label={isSignIn ? "Sign in" : "Sign up"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
