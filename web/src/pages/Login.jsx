import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Divider from "../components/Divider";
import SocialBtn from "../components/SocialBtn";
import AuthForm from "../components/AuthForm";
import AppleLogo from "../assets/apple.png"; // Assurez-vous que le chemin est correct
import GoogleLogo from "../assets/google.png"; // Assurez-vous que le chemin est correct

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "John Doe" }); // Ex. simple
    navigate("/"); // Redirection vers le tableau de bord
  };

  return (
    <div className="grid grid-cols-2 grid-rows-1 h-screen w-auto p-4">
      <div className="bg-[url(./assets/background.jpg)] bg-cover bg-no-repeat rounded-2xl" />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-1 items-start gap-8 w-3/5">
          <div className="flex flex-col gap-3">
            <h1 className='text-5xl font-semibold'>
              Money should <br />
              never be a conflict
            </h1>
            <p className='text-sm'>Sign up to start your 30 days free trial</p>
          </div>
          <div className="flex flex-row gap-2.5">
            <SocialBtn label="Google" path={GoogleLogo} />
            <SocialBtn label="Apple" path={AppleLogo} />
          </div>
          <Divider>or</Divider>
          <AuthForm className="flex flex-col justify-center items-center w-full gap-8" type="submit" action="POST" onSubmit={handleLogin} />
        </div>
        <p className="absolute top-8 right-8 text-sm text-black/50">
          Already have an account ? <button className='border-none bg-transparent' onClick={handleLogin}><span className='text-black font-semibold cursor-pointer'>Sign in</span></button>
        </p>
      </div>
    </div>
  );
}
