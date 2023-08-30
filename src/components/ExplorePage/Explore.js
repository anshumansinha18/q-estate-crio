import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Header from "../Header/Header";
import CheckBoxFilters from "./CheckBoxFilters";
import SortingFilters from "./SortingFilters";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import "./Explore.css";
import Footer from "../Footer/Footer";

export default function Explore() {
  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const handleLocaltionFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    } else {
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked)
      setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
    else
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  async function fetchListings() {
    const response = await axios.get(
      `${config.backendEndpoint}/real-estate-data`
    );
    const data = response.data.listings;
    setListingsData(data);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header onPage="listings" />

      <div className="property-listings-view">
        <CheckBoxFilters
          locationFilter={locationFilter}
          handleLocationFilterChange={handleLocaltionFilterChange}
          priceRangeFilter={priceRangeFilter}
          handlePriceRangeFilterChange={handlePriceRangeFilterChange}
        />
        <SortingFilters
          sortBy={sortBy}
          handleSortByChange={handleSortByChange}
        />
        <ListingsTableView
          listingsData={listingsData}
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
          sortBy={sortBy}
        />
      </div>
      <Footer />
    </>
  );
}
