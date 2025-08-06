import React from "react";

const FreeForNow = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold sm:text-5xl mb-4">
          It’s Completely Free — For Now!
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          For a limited time, you can use all features at no cost. No credit
          card required. Just dive in and build.
        </p>
        <a
          href="/signup"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition"
        >
          Start Free Now
        </a>
      </div>
    </section>
  );
};

export default FreeForNow;
