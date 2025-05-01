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
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-950 flex flex-col justify-center items-center w-full">
      <header className="absolute top-6 left-14 max-sm:left-5">
        <Logo />
      </header>

      <main className="flex flex-col justify-center items-center w-[443px] max-w-md mx-auto max-md:w-[90%] max-sm:w-full">
        <div className="w-full bg-white bg-opacity-10 rounded-[40px] p-8 backdrop-blur-sm">

          <form
          className="flex flex-col gap-5 items-center"
          onSubmit={handleSubmit}
          >
          <h1 className="text-2xl font-bold text-center text-white mb-4">
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

          <div className="flex items-start w-full mt-2">
            <Checkbox
              htmlFor="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              label={
                <>
                  I have read and accept the Terms of
                  <span> Service & Privacy Policy *
                  </span>
                </>
              }
            />
          </div>

          <a href="/login" className="text-white hover:underline text-sm mt-2">
            Already have account?
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
