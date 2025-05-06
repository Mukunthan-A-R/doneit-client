import React from "react";
import GraphImg from "../../assets/Graph.jpg";
import PaperWork from "../../assets/paperwork.avif";

const ProductivityBoost = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-32 font-sans">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Drive Productivity with Smart Insights
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Equip your team with{" "}
          <span className="text-blue-700 font-semibold">data-driven tools</span>{" "}
          and
          <span className="text-blue-700 font-semibold">
            {" "}
            real-time tracking
          </span>{" "}
          to stay focused and achieve more.
        </p>
      </div>

      {/* Feature Blocks */}
      <div className="space-y-28">
        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Measurable Productivity Gains
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Teams using our platform report up to
              <span className="text-blue-600 font-semibold">
                {" "}
                40% more task completions
              </span>
              . Optimize workflows with
              <span className="text-blue-600 font-medium">
                {" "}
                real-time insights
              </span>{" "}
              and
              <span className="text-blue-600 font-medium">
                {" "}
                intuitive dashboards
              </span>
              .
            </p>
            <br />
            <p className="text-gray-700 text-lg leading-relaxed">
              Done It is an innovative work management software that helps teams{" "}
              <strong>track tasks</strong>, manage deadlines, and{" "}
              <strong>collaborate on projects</strong> seamlessly. Our task
              management tools are designed for remote teams, startups, and
              growing businesses.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
              <img
                src={GraphImg}
                alt="Analytics and reporting dashboard for project progress tracking"
                className="object-cover w-full h-auto max-h-80 xl:max-h-72 2xl:max-h-64 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Smarter Time Allocation
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Reduce
              <span className="text-blue-600 font-medium">
                {" "}
                context switching
              </span>{" "}
              with smart notifications and focused task management. Prioritize
              effortlessly and maintain team alignment on
              <span className="text-blue-600 font-medium">
                {" "}
                high-impact objectives
              </span>
              .
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
              <img
                src={PaperWork}
                alt="Project planning board with deadlines and milestones"
                className="object-cover w-full h-auto max-h-80 xl:max-h-72 2xl:max-h-64 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductivityBoost;
