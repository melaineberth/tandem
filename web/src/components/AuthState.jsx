import React from "react";

export default function AuthState({ content, label, ...props }) {
  return (
    <p className="absolute top-4 right-4 text-sm text-black/50">
      {content}
      <button {...props} className="border-none bg-transparent">
        <span className="text-black text-sm font-semibold cursor-pointer">
          {label}
        </span>
      </button>
    </p>
  );
}
