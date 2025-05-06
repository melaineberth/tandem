import React from 'react';

export default function SocialBtn({label, path}) {
  return (
    <button className="bg-transparent text-black border-solid border-[1.5px] border-black/20 px-4 py-4 rounded-xl cursor-pointer w-full">
      <div className="flex flex-row justify-center items-center gap-2">
        <img className='w-6 h-6' src={path} alt={"Sign in with " + label} />
        <p>{label}</p>
      </div>
    </button>
  );
}
