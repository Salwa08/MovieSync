"use client";
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import DevicesSection from "./DevicesSection";
import FaqSection from "./FaqSection";
import PricingSection from "./PricingSection";
import CtaBanner from "./CtaBanner";
import Footer from "./Footer";

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white max-md:pl-5">
      <div className="flex overflow-hidden flex-col bg-neutral-900 max-md:max-w-full">
        <div className="flex flex-col items-center max-md:max-w-full">
          <Header />
          <HeroSection id="home"/>
          <CategoriesSection id="movies-and-shows"/>
          <DevicesSection />
          <FaqSection id="support"/>
          <PricingSection id="subscriptions"/>

          {/* Decorative images section */}





        
          <CtaBanner />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;