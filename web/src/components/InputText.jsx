import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon } from '@hugeicons-pro/core-stroke-rounded';
import { ViewOffSlashIcon } from '@hugeicons-pro/core-stroke-rounded';

export default function InputText({ type, name, placeholder, isVisible, onClick, onChange, ...props }) {
  return (
    <div className="flex border-none bg-black/5 rounded-2xl px-4 py-4 justify-between w-full h-14">
    <input {...props} onChange={onChange} className='w-full border-none outline-none bg-transparent placeholder:text-base placeholder:text-black/40 text-base' type={type} name={name} placeholder={placeholder} required />
    {name === "password" && <button type="button" className="bg-transparent border-none cursor-pointer" onClick={onClick}>
      <HugeiconsIcon className='align-middle' icon={isVisible ? ViewOffSlashIcon : ViewIcon} size={20} color="#00000070" strokeWidth={2}/>
    </button>}
  </div>
  );
}
