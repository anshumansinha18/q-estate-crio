import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import Header from "../Header/Header";
import CheckBoxFilters from "../CheckboxFilter/CheckBoxFilters";
import SortingFilters from "../SortingFilter/SortingFilters";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import "./Explore.css";
import Footer from "../Footer/Footer";

export default function Explore() {
  //STATES:
  const [listingsData, setListingsData] = useState([]); //for all the states
  const [locationFilter, setLocationFilter] = useState([]); //location based filters
  const [priceRangeFilter, setPriceRangeFilter] = useState([]); //priceRangeFitlers
  const [sortBy, setSortBy] = useState(""); //sortBy filters

  //FILTER HANDLERS:

  const handleLocaltionFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      //If a location is checked, then add that location to the locationFilters state:
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    } else {
      //If a location is unchecked, remove that location from the locationFilters:
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;
    //If a Price Filter is checked, then add that priceRange to priceRangeFilter state:
    if (isChecked)
      setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
    //If a price filter is unchecked, then remove that price filter from the priceRangeFilter state:
    else
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handleSortByChange = (event) => {
    //If a sort dropdown option is selected, then add it to sortBy state(we need to add only single value here)
    setSortBy(event.target.value);
  };


  //FETCH ALL LISTINGS: 

  async function fetchListings() {
    try {
      const response = await axios.get(
        `${config.backendEndpoint}/real-estate-data`
      );
      const data = response.data.listings;
      setListingsData(data);
    } catch (err) {
      console.log(err);
    }
  }

  //USE EFFECTS: 
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
