import React, { useState, useEffect, useRef, useContext } from 'react';
import './ddstyle.css';
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MachineContext } from '../../../hooks/ContextAPI/MachineContext';

function Zone({ onSelectZone }) {
  const [options, setOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const { dropDownZoneNames, setDropDownZoneNames} = useContext(MachineContext)
  useEffect(() => {
    fetch('https://mcuconnect.com/dashboard-api/zones')
      .then(response => response.json())
      .then(data => {
      //  console.log('Fetched zones:', data);
        setOptions(data);
      })
      .catch(error => console.error('Error fetching zones:', error));
  }, []);

  function toggleDropdown() {
    setDropdownVisible(prevState => !prevState);
  }

  function updateSelected(event) {
    const { value, checked } = event.target;
    if (value === "select-all") {
      if (checked) {
        const allZoneIds = options.map(option => option.zone_id.toString());
     //  console.log('Selected All Zones:', options.map(option => option.zone_name).join(", "));
        setSelectedOptions(allZoneIds);
        // Call onSelectZone after state is updated
        setTimeout(() => onSelectZone(allZoneIds), 0);
      } else {
        setSelectedOptions([]);
       // console.log('Cleared All Zones');
        // Call onSelectZone after state is updated
        setTimeout(() => onSelectZone([]), 0);
      }
    } else {
      setSelectedOptions(prevState => {
        const newSelection = checked ? [...prevState, value] : prevState.filter(option => option !== value);
        // Call onSelectZone after state is updated
        setTimeout(() => onSelectZone(newSelection), 0);
        return newSelection;
       // console.log("Selected Zonecc : ", onSelectZone);
        
      });
    }
  }

  function clearSelection() {
    setSelectedOptions([]);
   // console.log('Cleared Selection');
    // Call onSelectZone after state is updated
    setTimeout(() => onSelectZone([]), 0);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const buttonText = selectedOptions.length > 0 
    ? options.filter(option => selectedOptions.includes(option.zone_id.toString())).map(option => option.zone_name).join(", ")
    : "None Selected";
  const isAllSelected = selectedOptions.length === options.length;

  return (
    <div className='my-main-container'>
      <h4>Level 1</h4>
      <div className="areaClass">
        <div className="tick">
          <FaCheck />
        </div>

        <div className="multiselect-container" ref={dropdownRef}>
          <button className="multiselect-btn" onClick={toggleDropdown} aria-expanded={dropdownVisible}>
            {buttonText}
            {selectedOptions.length > 0 ? (
              <span className="clear-icon" onClick={(e) => { e.stopPropagation(); clearSelection(); }}>×</span>
            ) : (
              <span className="arrow-icon">▼</span>
            )}
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              <label>
                <input
                  type="checkbox"
                  value="select-all"
                  checked={isAllSelected}
                  onChange={updateSelected}
                />
                Select All
              </label>
              {options.map((option) => (
                <label key={option.zone_id}>
                  <input
                    type="checkbox"
                    value={option.zone_id.toString()}
                    checked={selectedOptions.includes(option.zone_id.toString())}
                    onChange={updateSelected}
                  />
                  {option.zone_name}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="cross" onClick={(e) => { e.stopPropagation(); clearSelection(); }}>
          <FaXmark />
        </div>
      </div>
    </div>
  );
}

export default Zone;
