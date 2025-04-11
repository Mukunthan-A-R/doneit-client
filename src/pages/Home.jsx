// src/pages/Home.js
import React from "react";
import HomeBanner from "../components/modals/HomeBanner";
import HomeProductDesc from "../components/HomeProductDesc";
import ProductivityBoost from "../components/modals/ProductivityBoost";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <HomeProductDesc></HomeProductDesc>
      <ProductivityBoost></ProductivityBoost>
    </div>
  );
};

export default Home;
