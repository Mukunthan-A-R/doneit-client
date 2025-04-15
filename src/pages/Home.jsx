// src/pages/Home.js
import React, { useRef } from "react";
import HomeBanner from "../components/modals/HomeBanner";
import HomeProductDesc from "../components/HomeProductDesc";
import ProductivityBoost from "../components/modals/ProductivityBoost";

const Home = () => {
  const productDescRef = useRef(null);

  const scrollToProductDesc = () => {
    productDescRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <HomeBanner onLearnMoreClick={scrollToProductDesc} />
      <HomeProductDesc ref={productDescRef} />
      <ProductivityBoost />
    </div>
  );
};

export default Home;
