import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import TopCompanies from "./TopCompanies";
import PopularCategories from "./PopularCategories";

function Home() {
  return (
    <div className="min-h-[120rem]">
      
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <PopularCategories></PopularCategories>
    </div>
  );
}

export default Home;
