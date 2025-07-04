// src/components/HomeProductDesc.js
import React, { forwardRef } from "react";

const HomeProductDesc = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="bg-gray-50 font-sans antialiased">
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Task Tracker?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Our platform is designed to help individuals and teams stay focused,
            hit deadlines, and achieve their goals with ease.
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {[
              {
                title: "Smart Task Management",
                desc: "Create, edit, organize and prioritize your tasks with intuitive controls and a user-friendly UI.",
                iconColor: "bg-blue-100 text-blue-600",
                path: "M9 12h6m2 6H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z",
              },
              {
                title: "Team Collaboration",
                desc: "Assign tasks, set deadlines, and work with your team in real time with seamless coordination tools.",
                iconColor: "bg-green-100 text-green-600",
                path: "M5 13l4 4L19 7",
              },
              {
                title: "Real-time Notifications",
                desc: "Stay updated on task progress, mentions, and deadlines with instant alerts and activity logs.",
                iconColor: "bg-purple-100 text-purple-600",
                path: "M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Clean & Intuitive UI",
                desc: "Minimalist design with powerful features so you can focus on what matters most — getting things done.",
                iconColor: "bg-pink-100 text-pink-600",
                path: "M3 7h18M3 12h18m-9 5h9",
              },
              {
                title: "Analytics & Insights",
                desc: "Visualize your productivity with built-in charts, trends, and progress tracking for individuals and teams.",
                iconColor: "bg-yellow-100 text-yellow-600",
                path: "M3 10h11M9 21V3m12 8h-6",
              },
              {
                title: "Cross-Platform Access",
                desc: "Access your tasks anywhere — web, tablet, or mobile. Sync in real-time across all devices.",
                iconColor: "bg-red-100 text-red-600",
                path: "M15 17h5l-1.405-1.405M20 12V5a2 2 0 00-2-2h-4.586a1 1 0 00-.707.293l-7.414 7.414a1 1 0 000 1.414l6.586 6.586a1 1 0 001.414 0l1.414-1.414M9 16h.01",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6 rounded-xl"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-md mb-4 ${card.iconColor}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={card.path}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
});

export default HomeProductDesc;
