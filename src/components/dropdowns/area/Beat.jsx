import React, { useState, useEffect, useRef } from 'react';
import './ddstyle.css';
import { FaCheck, FaXmark } from "react-icons/fa6";

function Beat({ beats = [], selectedWards, selectedBeats, setSelectedBeats }) {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Clear selection when selected wards change
  useEffect(() => {
   setSelectedBeats([]);
  }, [selectedWards]);


  function toggleDropdown() {
   // setDropdownVisible(prevState => !prevState);
   if (beats.length > 0) {
    setDropdownVisible(prevState => !prevState);
  }
  }

  function updateSelected(event) {
    const { value, checked } = event.target;
    if (value === "select-all") {
      if (checked) {
        const allBeats = beats.map(option => option.beat_name.toString());
       console.log('From Beat Selected All Beats:', allBeats);
        setSelectedBeats(allBeats);
      } else {
        setSelectedBeats([]);
       // console.log('Cleared All Beats');
      }
    } else {
      setSelectedBeats(prevState => {
        let newState;
        if (checked) {
          newState = [...prevState, value];
          console.log(`from Beat Selected Beat: ${value}`, selectedBeats);
        } else {
          newState = prevState.filter(option => option !== value);
         // console.log(`Deselected Beat: ${value}`);
        }
        return newState;
      });
    }
  }

  function clearSelection() {
    setSelectedBeats([]);
   // console.log('Cleared Selection');
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

  const buttonText = selectedBeats.length > 0 ? selectedBeats.join(", ") : "None Selected";
  const isAllSelected = selectedBeats.length === beats.length;

  return (
    <div className='my-main-container'>
      <h4>Level 3</h4>
      <div className="areaClass">
        <div className="tick">
          <FaCheck />
        </div>

        <div className="multiselect-container" ref={dropdownRef}>
          <button className="multiselect-btn" onClick={toggleDropdown} aria-expanded={dropdownVisible}>
            {buttonText}
            {selectedBeats.length > 0 ? (
              <span className="clear-icon" onClick={(e) => { e.stopPropagation(); clearSelection(); }}>×</span>
            ) : (
              <span className="arrow-icon">▼</span>
            )}
          </button>
          {dropdownVisible && (
            <div className="dropdown-content">
              {beats.length > 0 ? (
                <>
                  <label>
                    <input
                      type="checkbox"
                      value="select-all"
                      checked={isAllSelected}
                      onChange={updateSelected}
                    />
                    Select All
                  </label>
                  {beats.map((option) => (
                    <label key={option.beat_id.toString()}>
                      <input
                        type="checkbox"
                        value={option.beat_name.toString()}
                        checked={selectedBeats.includes(option.beat_name.toString())}
                        onChange={updateSelected}
                      />
                      {option.beat_name}
                    </label>
                  ))}
                </>
              ) : (
                <div className="no-options">No beats available</div>
              )}
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

export default Beat;