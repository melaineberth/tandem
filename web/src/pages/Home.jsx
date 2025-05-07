import React from 'react';
import IconBtn from "../components/IconBtn";
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight01Icon } from '@hugeicons-pro/core-stroke-sharp';
import { ArrowDown01Icon } from '@hugeicons-pro/core-stroke-sharp';

export default function Home() {
  const navigate = useNavigate(); // hook pour naviguer programmé

  function handleButtonClick(e) {
    // Logique pour gérer le clic sur le bouton
    e.preventDefault(); // Empêche le comportement par défaut du bouton
    navigate('/login'); // Redirige vers la page de connexion
  }

  return (
    <div className='grid grid-cols-1 grid-rows-[auto_minmax(auto,1fr)_auto] h-screen w-auto p-4 text-base'>
      <header className='flex flex-row justify-between'>
        <img src="" alt="logo" />
        <ul className='flex flex-row list-none gap-4'>
          <li>Fonctionnalités</li>
          <li>Tarifs</li>
          <li>FAQ</li>
          <li>Blog</li>
        </ul>
        <div className='flex flex-row gap-4'>
          <IconBtn onClick={handleButtonClick} icon={ArrowUpRight01Icon} isLeft={false} label="Try our app" />
          <IconBtn onClick={handleButtonClick} icon={ArrowDown01Icon} outlined isLeft={false} label="eng" />
        </div>
      </header>
      <section className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg">This is the main page of your application.</p>
      </section>
      <footer>
        <p>Built in Le Mans © Tandem Inc.</p>
      </footer>
    </div>
  );
}