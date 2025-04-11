// src/pages/Home.js
import React from "react";
import HomeBanner from "../components/modals/HomeBanner";
import HomeProductDesc from "../components/HomeProductDesc";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <HomeProductDesc></HomeProductDesc>
    </div>
  );
};

export default Home;
