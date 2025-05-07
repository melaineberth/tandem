import React from 'react';

export default function AuthTitle({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl font-semibold whitespace-pre-line">
        {title}
      </h1>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
}
