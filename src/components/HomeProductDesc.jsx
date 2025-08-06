// src/components/HomeProductDesc.js
import React, { forwardRef } from "react";
import {
  FiCheckSquare, // Task Management
  FiColumns, // Kanban Board
  FiZap, // AI Assistant
  FiUsers, // Team Collaboration
  FiCalendar, // Timeline & Calendar
  FiBarChart2, // Heatmap & Logs
} from "react-icons/fi";

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
                title: "Task & Project Management",
                desc: "Organize tasks, set priorities, and manage projects with clarity using a centralized, intuitive workspace.",
                icon: <FiCheckSquare className="w-6 h-6" />,
                iconColor: "bg-indigo-100 text-indigo-600",
              },
              {
                title: "Kanban Boards",
                desc: "Visualize progress with drag-and-drop workflows, ideal for agile teams and fast-paced task management.",
                icon: <FiColumns className="w-6 h-6" />,
                iconColor: "bg-blue-100 text-blue-600",
              },
              {
                title: "AI Assistant",
                desc: "Get smart suggestions, deep insights, and instant help with our built-in AI assistant — available 24/7.",
                icon: <FiZap className="w-6 h-6" />,
                iconColor: "bg-purple-100 text-purple-600",
              },
              {
                title: "Team Collaboration",
                desc: "Assign roles, share tasks, and collaborate in real-time with teammates across departments.",
                icon: <FiUsers className="w-6 h-6" />,
                iconColor: "bg-green-100 text-green-600",
              },
              {
                title: "Live Timeline & Calendar",
                desc: "Plan, schedule, and view your work using integrated calendars and live timelines.",
                icon: <FiCalendar className="w-6 h-6" />,
                iconColor: "bg-yellow-100 text-yellow-600",
              },
              {
                title: "Heatmap & Activity Logs",
                desc: "Track user activity, identify bottlenecks, and stay informed with visual insights and action history.",
                icon: <FiBarChart2 className="w-6 h-6" />,
                iconColor: "bg-pink-100 text-pink-600",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl p-6 rounded-xl"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-md mb-4 ${card.iconColor}`}
                >
                  {card.icon}
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
