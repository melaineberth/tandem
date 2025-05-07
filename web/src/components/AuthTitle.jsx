import React from 'react';

export default function AuthTitle({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl md:max-2xl:text-4xl md:max-xl:text-3xl font-semibold whitespace-pre-line">
        {title}
      </h1>
      <p className="text-base text-black/50">{subtitle}</p>
    </div>
  );
}
