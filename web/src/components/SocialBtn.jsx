import React from 'react';

export default function SocialBtn({label, path}) {
  return (
    <button className="text-black bg-black/5 border-solid border-[2px] border-black/20 px-4 py-4 rounded-2xl cursor-pointer w-full">
      <div className="flex flex-row justify-center items-center gap-2">
        <img className='w-6 h-6' src={path} alt={"Sign in with " + label} />
        <p className='text-base font-medium'>{label}</p>
      </div>
    </button>
  );
}
