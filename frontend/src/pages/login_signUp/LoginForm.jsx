"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import InputField from "./InputField";
import SocialLoginButton from "./SocialLoginButton";
import Logo from "./Logo";
import { useUser } from "../../contexts/UserContext"; 
import { login } from "../../api/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { loginUser } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Attempting login with:", { email, password: "***" });

    try {
      const response = await login(email, password);
      console.log("Login successful:", response);

      loginUser(response.user, response.token || response.access);
      navigate("/home"); 
    } catch (error) {
      console.error("Login error:", error);
      setError(error.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 flex flex-col justify-center items-center w-full px-4 max-sm:px-6">
      <header className="absolute top-6 left-6 max-sm:left-10">
        <Logo />
      </header>

      <main className="w-full max-w-md flex flex-col items-center justify-center">
        <div className="w-full bg-opacity-10 bg-white rounded-[40px] p-6 sm:p-8 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 sm:gap-y-5"
          >
            <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
              Login
            </h1>

            {error && (
              <div className="w-full p-3 mb-4 rounded-lg bg-red-900/50 text-white text-sm">
                {error}
              </div>
            )}

            <InputField
              type="text"
              placeholder="Username"
              name="username"
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
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-medium transition-all mt-2"
            >
              <span className="text-sm sm:text-base font-bold text-center text-white uppercase">
                Sign in
              </span>
            </button>
          </form>

          <div className="my-5 flex items-center ">
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
            <a href="/register" className="text-red-500 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
