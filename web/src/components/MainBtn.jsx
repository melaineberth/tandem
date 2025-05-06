import React from 'react';

export default function MainBtn({ label, type }) {
  return (
    <button className="bg-black text-white border-none rounded-xl cursor-pointer w-full h-14 px-4 py-4 text-sm" type={type}>
      {label}
    </button>
  );
}