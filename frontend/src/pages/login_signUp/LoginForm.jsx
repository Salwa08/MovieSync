"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to a dashboard or home page
    } catch (err) {
      setError(err.error || "Invalid credentials");
    }
  };

  return (
    <section className="flex relative flex-col gap-5 items-center h-[602px] w-[463px] max-md:h-auto max-md:w-[90%] max-sm:p-5 max-sm:w-full">
      <div className="absolute bg-white bg-opacity-10 h-[582px] rounded-[80px] w-[443px]" />

      <h1 className="relative text-base font-bold text-center text-white leading-[50px] top-[30px]">
        Login
      </h1>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-5"
      >
        <div className="relative h-[50px] w-[360px] max-md:w-4/5 max-sm:w-[90%]">
          <InputField
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative h-[50px] w-[360px] max-md:w-4/5 max-sm:w-[90%]">
          <InputField
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="relative top-10 cursor-pointer h-[51px] w-[185px] max-md:w-4/5 max-sm:w-[90%] bg-red-600 rounded-[40px] flex items-center justify-center focus:outline-none hover:bg-red-700 transition-colors"
        >
          <span className="text-base font-bold text-center text-white uppercase">
            Sign in
          </span>
        </button>
      </form>

      <p className="relative text-base font-medium text-white text-opacity-50 top-[60px]">
        or continue with
      </p>

      <div className="flex relative gap-12 items-center top-[70px] max-md:gap-8 max-sm:gap-5">
        <SocialLoginButton provider="facebook" />
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="apple" />
      </div>

      <div className="relative text-base font-semibold text-red-600 top-[90px]">
        <span>New to MovieSync?</span>
        <button className="ml-1.5 font-bold text-red-600 focus:outline-none hover:underline">
          Sign up
        </button>
      </div>
    </section>
  );
};

export default LoginForm;
