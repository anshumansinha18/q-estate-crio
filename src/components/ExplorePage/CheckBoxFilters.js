import React from "react";

const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
const prices = ["0-264890", "264890-600000", "600001-1000000"];

export default function CheckBoxFilters({
  locationFilter,
  handleLocationFilterChange,
  priceRangeFilter,
  handlePriceRangeFilterChange,
}) {
  return (
    <div className="checkbox-filter-container">
      {console.log(locationFilter)}
      <div className="filter">
        <h2>Location</h2>
        {locations.map((location, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={location}
                checked={locationFilter.includes(location)}
                onChange={handleLocationFilterChange}
              />
              {location}
            </label>
          </div>
        ))}
      </div>
      <div className="filter">
        <h2>Price Range</h2>
        {prices.map((price, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={price}
                checked={priceRangeFilter.includes(price)}
                onChange={handlePriceRangeFilterChange}
              />
              {price}
            </label>
          </div>
        ))}

        {/* Add other price range checkboxes */}
      </div>
    </div>
  );
}
