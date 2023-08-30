import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ onPage }) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="logo" onClick={() => navigate("/")}>
        QEstate Homes
      </div>
      {onPage === "home" ? (
        <div className="nav-link" onClick={() => navigate("/listings")}>
          <span>Explore</span>
        </div>
      ) : onPage === "listings" ? (
        <div className="nav-link" onClick={() => navigate("/")}>
          Featured Listings
        </div>
      ) : (
        <div className="nav-list">
          <div className="nav-link" onClick={() => navigate("/")}>
            Featured
          </div>
          <div className="nav-link" onClick={() => navigate("/listings")}>
            Explore
          </div>
        </div>
      )}
    </div>
  );
}
