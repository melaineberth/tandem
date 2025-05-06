import React, { useState } from "react";
import InputText from "./InputText";
import MainBtn from "./MainBtn";

export default function AuthForm({ type, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => {
      return !prev;
    });
  }

  return (
    <form {...props}>
      <InputText type="text" name="name" placeholder="Enter your name" />
      <InputText type="email" name="email" placeholder="Enter your email" />
      <InputText
        type={isPasswordVisible ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        isVisible={isPasswordVisible}
        onClick={togglePasswordVisibility}
      />
      <MainBtn label="Get Started" type={type} />
    </form>
  );
}
