"use client";
import LoginForm from "./LoginForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const LoginPage = () => {
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
      navigate("/home"); // Redirect to a dashboard or home page
    } catch (err) {
      setError(err.error || "Invalid credentials");
    }
  };
  return (
    <LoginForm
      email={email}
      password={password}
      handleSubmit={handleSubmit} // Renamed from onSubmit to match LoginForm
      error={error}
      setEmail={setEmail} // Added setEmail prop
      setPassword={setPassword} // Added setPassword prop
    />
  );
};

export default LoginPage;
