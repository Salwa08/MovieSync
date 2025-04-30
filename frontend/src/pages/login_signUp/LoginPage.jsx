"use client";
import React from "react";
import Logo from "./Logo";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center items-center mx-auto w-full max-w-none h-screen max-md:max-w-[991px] max-sm:max-w-screen-sm bg-black">
      <header className="flex justify-center items-center py-6 pr-20 pl-14 w-full max-md:p-5 max-sm:p-4">
        <Logo />
      </header>

      <LoginForm />
    </main>
  );
};

export default LoginPage;
