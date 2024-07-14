import React, { useState } from "react";

import { Link, NavLink } from "react-router-dom";
import "./SideBar.css";
import Logo from "../../images/logo.png";
import AddModal from "../AddEditModal/AddModal/AddModal";

import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";

const Sidebar = ({
  handleShowAddModal,
  showAdd,
  setShowAdd,
  getStageTasks,
}) => {
  return (
    <>
      <div className="main-side-bar">
        <a href="/tasks" className="logo-link">
          <img className="logo" src={Logo} />
        </a>

        <div className="sidebar-content">
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="sidebar-icons">
              <FaTasks className="icon" />
              <span className="icon-text">Tasks</span>
            </div>
          </NavLink>

          <NavLink
            to="/incomplete"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="sidebar-icons">
              <BiTaskX className="icon" />
              <span className="icon-text">In-Complete Tasks</span>
            </div>
          </NavLink>

          <NavLink
            to="/completed"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="sidebar-icons">
              <BiTask className="icon" />
              <span className="icon-text">Complete Tasks</span>
            </div>
          </NavLink>
        </div>
        <div className="footer-side-bar">
          <AddModal
            handleShowAddModal={handleShowAddModal}
            showAdd={showAdd}
            setShowAdd={setShowAdd}
            getStageTasks={getStageTasks}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
