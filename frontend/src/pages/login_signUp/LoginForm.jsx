"use client";
import React from "react";
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";
import Logo from "./Logo";

const LoginForm = ({
  handleSubmit,
  error,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 flex flex-col justify-center items-center w-full">
      <header className="absolute top-6 left-14 max-sm:left-5">
        <Logo />
      </header>

      <main className="flex flex-col justify-center items-center w-[443px] max-w-md mx-auto max-md:w-[90%] max-sm:w-full">
        <div className="w-full bg-opacity-10 bg-white rounded-[40px] p-8 backdrop-blur-sm">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Login
          </h1>
        <InputField
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password*"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-right w-full">
          <a
            href="/forgot-password"
            className="text-white hover:underline text-sm"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-medium transition-all mt-4"
        >
          <span className="text-base font-bold text-center text-white uppercase">
            Sign in
          </span>
        </button>
      </form>

      <div className="my-6 flex items-center w-full">
        <div className="flex-1 border-t border-gray-400/30"></div>
        <span className="px-4 text-sm text-white">or continue with</span>
        <div className="flex-1 border-t border-gray-400/30"></div>
      </div>

      <div className="flex justify-center gap-4 w-full">
        <SocialLoginButton provider="facebook" />
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="apple" />
      </div>

      <div className="text-white text-sm mt-6 text-center">
        New to MovieSync?{" "}
        <a href="/register" className="text-red-400 hover:underline">
          Sign up
        </a>
      </div>
      </div>
      </main>
      </div>
  );
};

export default LoginForm;
