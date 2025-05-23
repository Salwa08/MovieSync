import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Logo from "../login_signUp/Logo";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-[#141414] flex w-full h-[91px] px-[52px] py-[3px] items-center flex-shrink-0 relative z-50">
      <div className="flex justify-between w-full items-center">
        <Logo />
        <nav className="flex rounded-[10px] border-[3px] border-[#1F1F1F] bg-[#0F0F0F] p-2 items-center gap-4">
          <a
            href="#home"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
          >
            Home
          </a>
          <a
            href="#movies-and-shows"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
          >
            Movies & Shows
          </a>
          <a
            href="#support"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
          >
            Support
          </a>
          <a
            href="#subscriptions"
            className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
          >
            Subscriptions
          </a>
        </nav>
        <Button
          className="rounded-lg bg-[#E50000] hover:bg-red-700 transition-colors px-4 py-2"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </header>
  );
}

export default Header;
