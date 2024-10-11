import React, { useState, useRef, useEffect } from 'react';
import '../area/ddstyle.css';
import { FaCheck, FaXmark } from "react-icons/fa6";

function SStatus({selectedStockStatus, setSelectedStockStatus}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
 // const [selectedStockStatus, setSelectedStockStatus] = useState([]);
  const dropdownRef = useRef(null);
  const dropdownOptions = ["OK", "Low", "Empty"]; // Static dropdown options

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Update selected stock status
  const updateSelected = (event) => {
    const { value } = event.target;
    setSelectedStockStatus(prevState => {
  const newStatus =    prevState.includes(value)
        ? prevState.filter(status => status !== value)
        : [...prevState, value]

       // console.log("Selected on Staock Status : ", newStatus);
        return newStatus;
        
   } );
  };

  // Handle select all functionality
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStockStatus(dropdownOptions);
     // console.log("Selected Status : All Selected : ", dropdownOptions);
      
    } else {
      setSelectedStockStatus([]);
     // console.log('Selected Status: None');
    }
  };

  // Clear selection and close dropdown
  const clearSelection = () => {
    setSelectedStockStatus([]);
    setDropdownVisible(false);
    //console.log("Dropdown Cleared!");
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className='my-main-container my-dd-container'>
      <h4>Stock Status</h4>
      <div className="areaClass">
        <div className="multiselect-container" ref={dropdownRef}>
          <button
            className="multiselect-btn"
            onClick={toggleDropdown}
            aria-expanded={dropdownVisible}
          >
            {selectedStockStatus.length > 0 ? selectedStockStatus.join(", ") : "None Selected"}
            {selectedStockStatus.length > 0 ? (
              <span
                className="clear-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
              >×</span>
            ) : (
              <span className="arrow-icon">▼</span>
            )}
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              {/* Select All option */}
              <label>
                <input
                  type="checkbox"
                  checked={selectedStockStatus.length === dropdownOptions.length}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
              {/* Individual options */}
              {dropdownOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedStockStatus.includes(option)}
                    onChange={updateSelected}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SStatus;
