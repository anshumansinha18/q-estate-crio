import React from "react";
import Header from "./Header";
import "./LandingPage.css";
import FeaturedListing from "./FeaturedListing";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header />

      <h1 className="featured-listings-title">
        Here are some of our featured listings:
      </h1>

      <FeaturedListing />
    </div>
  );
}
