import React from "react";

const TaskCardHolder = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 h-screen overflow-y-auto">
      <div className="bg-red-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 1</h2>
        <p>Content for Column 1</p>
      </div>
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 2</h2>
        <p>Content for Column 2</p>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Column 3</h2>
        <p>Content for Column 3</p>
      </div>
    </div>
  );
};

export default TaskCardHolder;
