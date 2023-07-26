import React, { useEffect, useState } from "react";
import MainCarousel from "components/MainCarousel";

const Home = () => {
  return (
    <div id='home'>
      <img
        src="/images/Header2.png"
        className="absolute top-0 left-0 w-full h-auto"
        alt="back-particle"
      />
      <div className="relative w-full my-16 overflow-hidden flex flex-col justify-center">
        <MainCarousel />
      </div>
    </div>
  );
};

export default Home;
