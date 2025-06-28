import { FeaturesSection } from "@/components/pages/FeaturesSection";
import { HeroSection } from "@/components/pages/HeroSection";
import { NavBar } from "@/components/pages/NavBar";
import React from "react";

function page() {
  return (
    <main className="bg-black">
      <NavBar />
      <HeroSection />
      <FeaturesSection/>
    </main>
  );
}

export default page;
