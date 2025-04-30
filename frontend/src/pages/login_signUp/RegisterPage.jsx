"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { register } from "../../api/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Please accept the Terms of Service & Privacy Policy");
      return;
    }

    if (formData.password !== formData.password2) {
      alert("Passwords don't match");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      alert("Registration successful!");
      console.log("Navigating to login page..."); // Debugging redirection
      navigate("/login");
    } catch (error) {
      alert(`Registration failed: ${error.error || "Unknown error"}`);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      acceptedTerms={acceptedTerms}
      setAcceptedTerms={setAcceptedTerms}
    />
  );
};

export default RegisterPage;
