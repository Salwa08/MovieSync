"use client";
import React from "react";
import Logo from "./Logo";
import InputField from "./InputField";
import Button from "./Button";
import Checkbox from "./Checkbox";

const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  acceptedTerms,
  setAcceptedTerms,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 flex flex-col justify-center items-center w-full px-4 max-sm:px-6">
      <header className="absolute top-6 left-6 max-sm:left-6">
        <Logo />
      </header>

      <main className="w-full max-w-md flex flex-col items-center justify-center">
        <div className="w-full bg-opacity-10 bg-white rounded-[40px] p-6 sm:p-8 backdrop-blur-sm">

          <form
          className="flex flex-col gap-y-4 sm:gap-y-5 items-center"
          onSubmit={handleSubmit}
          >
          <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-2">
            Register
          </h1>

          <InputField
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            placeholder="Password*"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            placeholder="Confirm Password*"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
          />

          <div className="flex items-start w-full mt-1">
            <Checkbox
              htmlFor="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              label={
                <>
                I have read and accept the{" "}
                <span className="text-red-400 underline">
                  Terms of Service & Privacy Policy *
                </span>
              </>
            }
            />
          </div>

          <a href="/login" className="text-white hover:underline text-sm mt-2">
            Already have an account?
          </a>
          <div className="mt-4 w-full flex justify-center">
          <Button type="submit">Continue</Button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterForm;
