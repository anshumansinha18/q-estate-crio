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
