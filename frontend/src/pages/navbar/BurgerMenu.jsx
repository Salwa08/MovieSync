import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { CiSearch } from "react-icons/ci";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const BurgerMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2">
          <CiSearch className="text-white w-6 h-6 mr-2" />
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 focus:outline-none"
      >
        {isOpen ? (
          <IoMdClose size={28} />
        ) : (
          <RxHamburgerMenu size={28} />
        )}
      </button>

      
      {isOpen && (
        <div className="absolute top-20 right-2 w-64 bg-black/95 rounded-lg shadow-lg py-5 px-6">
          
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={`#${link.toLowerCase()}`}
                className="text-white text-lg md:hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>

          
          <div className="h-px bg-gray-700 my-4" />

         
          <div className="flex flex-col gap-4">
            <button className="flex items-center gap-3 text-white md:hover:text-red-600 transition-colors">
              <BsFillPersonFill size={20} />
              <span>Profile</span>
            </button>
            <button className="flex items-center gap-3 text-white md:hover:text-red-600 transition-colors">
              <BiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;