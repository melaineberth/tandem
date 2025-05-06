import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon } from '@hugeicons-pro/core-solid-rounded';
import { ViewOffIcon } from '@hugeicons-pro/core-solid-rounded';

export default function InputText({ type, name, placeholder, isVisible, onClick, onChange }) {
  return (
    <div className="w-full">
      <h2 className='text-[0.9rem] capitalize font-medium text-black pb-2'>{name}<span className='text-[#ff4444]'>*</span></h2>
      <div className="flex border-solid border-[1.5px] border-black/20 rounded-xl bg-transparent px-4 py-4 justify-between h-14">
        <input onChange={onChange} className='w-full border-none outline-none bg-transparent' type={type} name={name} placeholder={placeholder} required />
        {name === "password" && <button type="button" className="bg-transparent border-none cursor-pointer" onClick={onClick}>
          <HugeiconsIcon className='align-middle' icon={isVisible ? ViewOffIcon : ViewIcon} size={20} color="#00000070" />
        </button>}
      </div>
    </div>
  );
}
