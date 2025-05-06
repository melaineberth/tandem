import React from 'react';

export default function Divider({ children }) {
    return (
      <div className="flex items-center">
        <div className="border-[1px] border-solid border-black/20 w-full" />
        <span className="px-3 text-black/40">
          {children}
        </span>
        <div className="border-[1px] border-solid border-black/20 w-full" />
      </div>
    );
  };