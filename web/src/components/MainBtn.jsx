import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function MainBtn({ label, type, isLoading, ...props}) {
  return (
    <button {...props} disabled={isLoading} className="bg-[#7A3E9D] text-white border-none rounded-2xl cursor-pointer w-full h-14 px-4 py-4 text-base" type={type}>
      {isLoading ? <CircularProgress size="1.5rem" color='#FFF'/> : label}
    </button>
  );
}