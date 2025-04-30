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
    <section className="flex flex-col justify-center items-center mx-auto w-full max-w-none h-screen max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <header className="flex justify-center items-center py-6 pr-20 pl-14 w-full h-[91px] max-sm:px-5 max-sm:py-6">
        <Logo />
      </header>

      <main className="flex relative flex-col justify-center items-center h-[616px] w-[463px] max-md:h-auto max-md:w-[90%] max-sm:p-5 max-sm:w-full">
        <div className="absolute bg-white bg-opacity-10 h-[596px] rounded-[80px] w-[443px]" />

        <form
          className="flex relative flex-col gap-5 items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-base font-bold text-center text-white leading-[50px]">
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

          <div className="flex items-center pl-16 -ml-1">
            <Checkbox
              htmlFor="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              label={
                <>
                  I have read and accept the Terms of
                  <span className="text-slate-200">
                    {" "}
                    Service & Privacy Policy *
                  </span>
                </>
              }
            />
          </div>

          <a href="/login" className="text-base text-white underline">
            Already have account?
          </a>

          <Button type="submit">Continue</Button>
        </form>
      </main>
    </section>
  );
};

export default RegisterForm;
