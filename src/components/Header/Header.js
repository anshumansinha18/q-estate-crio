import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ onPage }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo">Q-Estate</div>
      {onPage === "home" ? (
        <div className="nav-link" onClick={() => navigate("/listings")}>
          Explore
        </div>
      ) : onPage === "listings" ? (
        <div className="nav-link" onClick={() => navigate("/")}>
          Featured
        </div>
      ) : (
        <>
          <div className="nav-link" onClick={() => navigate("/")}>
            Featured
          </div>
          <div className="nav-link" onClick={() => navigate("/")}>
            Explore
          </div>
        </>
      )}
    </div>
  );
}
