import React from "react";
import Header from "../Header/Header";
import "./LandingPage.css";
import FeaturedListing from "../FeaturedListing/FeaturedListing";

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <Header onPage="home" />

      <h1 className="featured-listings-title">
        Here are some of our featured listings:
      </h1>

      <FeaturedListing />
    </div>
  );
}
