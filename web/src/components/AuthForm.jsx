import React, { useState } from "react";
import InputText from "./InputText";
import MainBtn from "./MainBtn";
import Checkbox from "./Checkbox";

export default function AuthForm({ type, onChange, isLoading, state, ...props }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => {
      return !prev;
    });
  }

  return (
    <form {...props} className="flex flex-col justify-center items-center w-full gap-14">
      <div className="flex flex-col gap-5 w-full">
        {state && (
          <div className="flex flex-row gap-5 w-full">
            <InputText
              type="text"
              name="fName"
              placeholder="First name"
              disabled={isLoading}
              onChange={onChange}
            />
            <InputText
              type="text"
              name="lName"
              placeholder="Last name"
              disabled={isLoading}
              onChange={onChange}
            />
          </div>
        )}
        <InputText
          type="email"
          name="email"
          placeholder="Email"
          disabled={isLoading}
          onChange={onChange}
        />
        <InputText
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          isVisible={isPasswordVisible}
          onClick={togglePasswordVisibility}
          disabled={isLoading}
          onChange={onChange}
        />
        <Checkbox>I agree to the <a href="">Terms & Conditions</a></Checkbox>
      </div>
      <MainBtn label={state ? "Create account" : "Continue"} type={type} isLoading={isLoading} />
    </form>
  );
}
