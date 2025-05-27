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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Attempting registration with:", {
        username: formData.username,
        email: formData.email,
        password: "***",
      });

      const response = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.password2
      );

      console.log("Registration successful!", response);

      
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      acceptedTerms={acceptedTerms}
      setAcceptedTerms={setAcceptedTerms}
      error={error}
      loading={loading}
    />
  );
};

export default RegisterPage;
