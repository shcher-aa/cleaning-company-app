import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/calendar" style={{ marginRight: "10px" }}>Календарь</Link>
      <Link to="/schedule" style={{ marginRight: "10px" }}>Табель</Link>
      <Link to="/clients">Клиенты</Link>
    </nav>
  );
}

export default Header;
