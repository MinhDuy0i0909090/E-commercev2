import React, { Fragment, useState, useEffect } from "react";
import { Checkbox, Divider } from "antd";
import { filterOptions } from "../../config/index"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ProductFilter({ onFilterChange }) {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [selectedFilters, setSelectedFilters] = useState({});

  // Helper function to create query parameters from selected filters
  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  };

  // Update the URL and notify the parent component whenever selectedFilters change
  useEffect(() => {
    const queryString = createSearchParamsHelper(selectedFilters);
    navigate(`?${queryString}`); // Use navigate to update the URL
    onFilterChange(selectedFilters); // Notify parent about filter changes
  }, [selectedFilters, navigate, onFilterChange]);

  // Handle checkbox change
  const handleCheckboxChange = (key, option) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[key] || [];
      if (currentOptions.includes(option.id)) {
        return { ...prev, [key]: currentOptions.filter((id) => id !== option.id) };
      } else {
        return { ...prev, [key]: [...currentOptions, option.id] };
      }
    });
  };

  return (
    <div className="bg-background rounded-lg shadow-sm mt-1">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItems) => (
          <Fragment key={keyItems}>
            <div>
              <h3 className="font-semibold">{keyItems}</h3>
            </div>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItems].map((option) => (
                <Checkbox
                  key={option.id}
                  className="flex items-center gap-2 font-normal"
                  checked={selectedFilters[keyItems]?.includes(option.id) || false}
                  onChange={() => handleCheckboxChange(keyItems, option)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
