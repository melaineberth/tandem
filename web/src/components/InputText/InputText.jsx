import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon } from '@hugeicons-pro/core-solid-rounded';
import { ViewOffIcon } from '@hugeicons-pro/core-solid-rounded';
import "./InputText.css";

export default function InputText({ type, name, placeholder, isVisible, onClick }) {
  return (
    <div className="input-container">
      <h2>{name}<span>*</span></h2>
      <div className="input-field">
        <input type={type} name={name} placeholder={placeholder} required />
        {name === "password" && <button type="button" className="view-icon" onClick={onClick}>
          <HugeiconsIcon icon={isVisible ? ViewOffIcon : ViewIcon} size={20} color="#00000070" />
        </button>}
      </div>
    </div>
  );
}
