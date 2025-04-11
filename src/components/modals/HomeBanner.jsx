import React from "react";
import BannerImg from "../../assets/BannerImg.jpg";

const HomeBanner = () => {
  return (
    <section class="bg-gray-50 py-20 px-6 md:px-12 lg:px-24 ">
      <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="text-center lg:text-left max-w-2xl">
          <span class="text-blue-600 text-sm font-semibold uppercase tracking-wide">
            Task Tracker
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            Organize. Prioritize. Achieve.
          </h1>
          <p class="text-gray-600 text-lg mt-4">
            Boost your productivity with a streamlined task tracking experience.
            From daily to-dos to project planning — we've got you covered.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <a
              href="#"
              class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="#"
              class="inline-block px-6 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-xl hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <div class="w-full max-w-md">
          <img
            src={BannerImg}
            alt="Person working illustration"
            class="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
