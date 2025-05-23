import React, { useState } from "react";
import { checkEmailExistence } from "../../api";
import Logo from "./Logo";
import InputField from "./InputField";
import Button from "./Button";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "", // 'success', 'error', or ''
    message: "",
  });

  const validateEmail = (email) => {
    // More comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset status
    setStatus({ type: "", message: "" });

    // Validate email
    if (!email) {
      setStatus({ type: "error", message: "Please enter your email address." });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API to check email existence
      const response = await checkEmailExistence(email);

      setStatus({
        type: "success",
        message:
          response.message ||
          "If the email exists, a password reset link has been sent to your email. Please check your inbox.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-red-950">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-96 max-sm:w-full">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          Forgot Password
        </h2>

        {status.message && (
          <div
            className={`mb-4 p-3 rounded ${
              status.type === "success"
                ? "bg-green-500 bg-opacity-20 text-green-100"
                : "bg-red-500 bg-opacity-20 text-red-100"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              disabled={isSubmitting}
              aria-label="Email address"
            />
            <p className="text-xs text-gray-300 mt-1">
              Enter the email address associated with your account.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-sm">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-red-400 hover:text-red-300 underline"
            >
              Login
            </a>
          </p>
          <p className="text-white text-sm mt-2">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-red-400 hover:text-red-300 underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
