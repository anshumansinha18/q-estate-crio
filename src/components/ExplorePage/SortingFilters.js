import React from "react";

const options = ["", "price", "date"];

export default function SortingFilters({ sortBy, handleSortByChange }) {
  return (
    <div className="sorting-filter-container">
      <h2 className="title">Sort By:</h2>
      <div className="dropdown">
        <select name="sortby" id="sortBy" onChange={handleSortByChange}>
          {options.map((ele, index) => (
            <option key={index} value={ele}>
              {ele.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
