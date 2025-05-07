import React from 'react';

export default function Divider({ children }) {
    return (
      <div className="flex items-center text-center">
        <div className="border-[1px] border-solid border-black/20 w-full" />
        <span className="text-sm text-black/40 w-full">
          {children}
        </span>
        <div className="border-[1px] border-solid border-black/20 w-full" />
      </div>
    );
  };