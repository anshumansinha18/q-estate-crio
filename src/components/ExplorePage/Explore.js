import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Header from "../Header/Header";
import CheckBoxFilters from "./CheckBoxFilters";
import SortingFilters from "./SortingFilters";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import "./Explore.css";

export default function Explore() {
  const [listingsData, setListingsData] = useState([]);
  const [filteredListings, setFilteredListings] = useState(listingsData);

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
    setFilteredListings(data);
  }

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters(locationFilter, priceRangeFilter, sortBy);
  }, [locationFilter, priceRangeFilter, sortBy]);

  const applyFilters = (location, priceRange, sortBy) => {
    console.log("From APPLY FILTERS: ", location, priceRange, sortBy);

    let filteredData = [...listingsData];

    if (location.length) {
      filteredData = filteredData.filter((listing) =>
        location.includes(listing.city)
      );
    }

    if (priceRange.length) {
      filteredData = filteredData.filter((listing) => {
        let found = false;
        priceRange.forEach((ele) => {
          let low = ele.split("-")[0];
          let high = ele.split("-")[1];
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          )
            found = true;
        });
        return found;
      });
    }

    if (sortBy === "price") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "date") {
      filteredData.sort(
        (a, b) => new Date(a.listing_date) - new Date(b.listing_date)
      );
    }
    console.log(filteredData);
    setFilteredListings(filteredData);
  };

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
          filteredData={filteredListings}
          setFilteredData={setFilteredListings}
          originalData={listingsData}
          editOriginalData={setListingsData}
        />
      </div>
    </>
  );
}
