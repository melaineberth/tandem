import React from 'react';

export default function Checkbox({ children, ...props }) {
  return (
    <div {...props} className="flex flex-row gap-3 items-center pt-1.5">
      <input type="checkbox" className="w-5 h-5" required />
      <p className="text-sm">
        {children}
      </p>
    </div>
  );
}
