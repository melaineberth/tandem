import React from 'react';
import "./MainBtn.css";

export default function MainBtn({ label, type }) {
  return (
    <button className="main-btn" type={type}>
      {label}
    </button>
  );
}