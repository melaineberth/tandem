import React, { useState } from "react";
import InputText from "./InputText";
import MainBtn from "./MainBtn";

export default function AuthForm({ type, onChange, state, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => {
      return !prev;
    });
  }

  return (
    <form {...props}>
      {state && <InputText onChange={onChange} type="text" name="username" placeholder="Enter your username" />}
      <InputText onChange={onChange} type="email" name="email" placeholder="Enter your email" />
      <InputText
        onChange={onChange}
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        isVisible={isPasswordVisible}
        onClick={togglePasswordVisibility}
      />
      <MainBtn label={state ? "Get Started" : "Continue"} type={type} />
    </form>
  );
}
