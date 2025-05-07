import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

export default function IconBtn({ icon, label, isLeft = true, outlined = false, onClick, ...props }) {
  const baseStyle = "px-5 py-3 rounded-full text-sm cursor-pointer flex items-center justify-center gap-2 transition-colors duration-150";
  const filledStyle = "bg-black text-white border-none hover:bg-[#7A3E9D]";
  const outlinedStyle = "bg-transparent text-black border border-black border-[2px] hover:bg-gray-100";

  return (
    <button
      {...props}
      onClick={onClick}
      className={`${baseStyle} ${outlined ? outlinedStyle : filledStyle}`}
    >
      {isLeft && (
        <HugeiconsIcon icon={icon} size={20} color={outlined ? "#000" : "#fff"} strokeWidth={2} />
      )}
      {label}
      {!isLeft && (
        <HugeiconsIcon icon={icon} size={20} color={outlined ? "#000" : "#fff"} strokeWidth={2} />
      )}
    </button>
  );
}
