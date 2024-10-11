import React, { useState, useRef, useEffect } from 'react';
import '../area/ddstyle.css';
import { FaCheck, FaXmark } from "react-icons/fa6";

function BStatus({selectedBurningStatus, setSelectedBurningStatus}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
 // const [selectedBurningStatus, setSelectedBurningStatus] = useState([]);
  const dropdownRef = useRef(null);
  const dropdownOptions = ["Idle", "Burning", "Error"]; // Static dropdown options

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Update selected burning status
  const updateSelected = (event) => {
    const { value } = event.target;
    setSelectedBurningStatus(prevState =>{
  const newStatus =    prevState.includes(value)
      ? prevState.filter(status => status !== value)
      : [...prevState, value]
     // console.log("Selected Status :", newStatus);
      return newStatus;
      
    }
     
    );
  };

  // Handle select all functionality
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedBurningStatus(dropdownOptions);
     // console.log('Selected Status: All Selected', dropdownOptions); // Log all selected

    } else {
      setSelectedBurningStatus([]);
    //  console.log('Selected Status: None'); // Log none selected
    }
  };

  // Clear selection and close dropdown
  const clearSelection = () => {
    setSelectedBurningStatus([]);
    setDropdownVisible(false);
   // console.log("Dropdown Cleared!");
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
      <h4>Burning Status</h4>
      <div className="areaClass">
        <div className="multiselect-container" ref={dropdownRef}>
          <button
            className="multiselect-btn"
            onClick={toggleDropdown}
            aria-expanded={dropdownVisible}
          >
            {selectedBurningStatus.length > 0 ? selectedBurningStatus.join(", ") : "None Selected"}
            {selectedBurningStatus.length > 0 ? (
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
                  checked={selectedBurningStatus.length === dropdownOptions.length}
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
                    checked={selectedBurningStatus.includes(option)}
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

export default BStatus;
