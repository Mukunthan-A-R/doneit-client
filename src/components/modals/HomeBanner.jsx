// src/components/modals/HomeBanner.js
import React from "react";
import BannerImg from "../../assets/BannerImg.jpg";
import { Link } from "react-router-dom";

const HomeBanner = ({ onLearnMoreClick }) => {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="text-center lg:text-left max-w-2xl">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
            Task Tracker
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Organize. Prioritize. Achieve.
          </h1>
          <p className="text-gray-600 text-lg mt-4">
            Boost your productivity with a streamlined task tracking experience.
            From daily to-dos to project planning — we've got you covered.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <button
              onClick={onLearnMoreClick}
              className="inline-block px-6 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-xl hover:bg-blue-50 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="w-full max-w-md">
          <img
            src={BannerImg}
            alt="Team collaboration workspace with shared task lists"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
