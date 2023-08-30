import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEstate Homes</h1>
        <div className="company-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          velit molestias ea dolor fugiat dignissimos at nam veritatis aliquid,
          accusamus cupiditate ab facere corporis fugit officia neque voluptates
          provident a.
        </div>
      </div>
      <div className="second-col">
        <h2 className="link-header">Products</h2>
        <ul className="link-items">
          <li>Listings</li>
          <li>Popular Listings</li>
          <li>Rent</li>
          <li>Buy Property</li>
        </ul>
      </div>
      <div className="third-col">
        <h2 className="link-header">Useful Links</h2>
        <ul className="link-items">
          <li>Your Account</li>
          <li>Become an affliate</li>
          <li>Agent Rates</li>
          <li>Help</li>
        </ul>
      </div>
      <div className="fourth-col">
        <h2 className="link-header">Contact</h2>
        <ul className="link-items">
          <li>Bengaluru, India</li>
          <li>qestate@gmail.com</li>
          <li>+91900000112</li>
          <li>+021 93489223</li>
        </ul>
      </div>
    </footer>
  );
}
