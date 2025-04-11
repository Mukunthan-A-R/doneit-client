import React from "react";
import GraphImg from "../../assets/Graph.jpg";
import PaperWork from "../../assets/paperwork.avif";

const ProductivityBoost = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">
          Boost Productivity with Smart Tracking
        </h2>
        <p className="text-gray-600 text-lg">
          Empower your team with{" "}
          <span className="text-blue-700 font-medium">insights</span> and{" "}
          <span className="text-blue-700 font-medium">tools</span> designed to
          increase efficiency and focus.
        </p>
      </div>

      <div className="space-y-24">
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row items-center lg:gap-24 gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Measurable Productivity Gains
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Teams using our platform have experienced up to{" "}
              <span className="text-blue-600 font-semibold">
                40% more completed tasks
              </span>
              . Track progress visually and optimize workflow with{" "}
              <span className="text-blue-600 font-medium">
                real-time updates
              </span>{" "}
              and{" "}
              <span className="text-blue-600 font-medium">
                streamlined processes
              </span>
              .
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="border border-gray-100 flex justify-center rounded-xl shadow-xl p-2 bg-gray-50">
              <img
                src={GraphImg}
                alt="Productivity Improvement Graph"
                className="rounded-lg md:w-2/3 w-full object-cover h-auto"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:gap-24 gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Smarter Time Allocation
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Reduce{" "}
              <span className="text-blue-600 font-medium">
                context switching
              </span>{" "}
              with intelligent alerts and simplified task assignment. Your team
              stays in sync while maintaining focus on{" "}
              <span className="text-blue-600 font-medium">
                high-priority tasks
              </span>
              .
            </p>
          </div>
          <div className="lg:w-1/2 w-full ">
            <div className="border border-gray-100 flex justify-center rounded-xl shadow-xl p-2 bg-gray-50">
              <img
                src={PaperWork}
                alt="Focus and Time Management Graph"
                className="rounded-lg md:w-2/3 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductivityBoost;
