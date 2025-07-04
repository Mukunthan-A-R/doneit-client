const ProductivityBoost = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Supercharge Your Team’s Productivity
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Empower your team with{" "}
            <span className="text-blue-600 font-semibold">
              real-time insights
            </span>{" "}
            and{" "}
            <span className="text-blue-600 font-semibold">
              data-backed decisions
            </span>{" "}
            to get more done, faster.
          </p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-20">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Measurable Productivity Gains
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Teams using Done It report up to{" "}
                <span className="font-semibold text-blue-600">
                  40% more task completions
                </span>
                . Optimize workflows with{" "}
                <span className="text-blue-600 font-medium">
                  real-time insights
                </span>{" "}
                and{" "}
                <span className="text-blue-600 font-medium">
                  intuitive dashboards
                </span>
                .
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Manage projects, track deadlines, and collaborate seamlessly —
                all in one unified workspace built for remote and hybrid teams.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md w-full h-60">
                <img
                  src="/Graph.jpg"
                  alt="Analytics dashboard"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Smarter Time Allocation
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Eliminate{" "}
                <span className="text-blue-600 font-medium">
                  context switching
                </span>{" "}
                with focused task views, smart reminders, and attention-aware
                notifications.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Help your team prioritize high-impact tasks while staying
                aligned on goals, milestones, and progress.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md w-full h-60">
                <img
                  src="/paperwork.avif"
                  alt="Time management"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductivityBoost;
