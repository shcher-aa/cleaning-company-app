

import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Меню</h2>
      <nav>
        <ul className="sidebar-list">
          <li><Link to="/calendar">Календарь</Link></li>
          <li><Link to="/schedule">Табель</Link></li>
          <li><Link to="/clients">Клиенты</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;