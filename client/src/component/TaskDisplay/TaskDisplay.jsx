import React from "react";
import "./TaskDisplay.css";
import { Outlet } from "react-router-dom";

const TaskDisplay = () => {
  return (
    <main className="task-display">
      <Outlet />
    </main>
  );
};

export default TaskDisplay;
