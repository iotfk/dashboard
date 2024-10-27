import React, { useState, useEffect, useRef, useContext } from 'react';
import './ddstyle.css'
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MachineContext } from '../../../hooks/ContextAPI/MachineContext';

function Wards({ selectedZones, onSelectWard }) {
    const [options, setOptions] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const { dropDownWardNames, setDropDownWardNames } = useContext(MachineContext);

    useEffect(() => {
        //if (selectedZones.length > 0) {
            if (1 > 0) {
        //    fetch(`http://localhost:7000/wards?zones=${selectedZones.join(',')}`)
        fetch('https://mcuconnect.com/dashboard-api/wards')
                .then(response => response.json())
                .then(data => {
                    // console.log('Fetched wards:', data);
                    setOptions(data);
                })
                .catch(error => console.error('Error fetching wards:', error));
        } else {
            setOptions([]);
        }

        //// setDropDownWardNames(selectedWardNames);

    }, [selectedZones]);

//console.log(options);

    function toggleDropdown() {
        setDropdownVisible(prevState => !prevState);
    }

    function updateSelected(event) {
        const { value, checked } = event.target;
    
        if (value === "select-all") {
            if (checked) {
                // Select all ward names
                const allWardsNames = options.map(option => option.ward_name.toString());
                const allWardIds = options.map(option => option.ward_id.toString());
    
                // Update state with all selections
                setSelectedOptions(allWardIds);
                setDropDownWardNames(allWardsNames);
                onSelectWard(allWardIds); // Notify parent
    
               // console.log('Selected All Wards names:', allWardsNames);
            } else {
                // Clear all selections
                setSelectedOptions([]);
                setDropDownWardNames([]);
                onSelectWard([]); // Notify parent
    
               // console.log('Cleared All Wards');
            }
        } else {
            setSelectedOptions(prevState => {
                const newSelection = checked
                    ? [...prevState, value]
                    : prevState.filter(option => option !== value);
    
                // Find corresponding ward names from selected ward IDs
                const selectedWardNames = options
                    .filter(option => newSelection.includes(option.ward_id.toString()))
                    .map(option => option.ward_name);
    
                // Update dropdown with selected ward names
                setDropDownWardNames(selectedWardNames);
    
                // Notify parent component
                onSelectWard(newSelection);
    
              //  console.log(`Corresponding Ward Names: ${selectedWardNames}`);
    
                return newSelection;
            });
        }
    }
    
    // Function to clear all selections
    function clearSelection() {
        setSelectedOptions([]);
        setDropDownWardNames([]);
        console.log('Cleared Selection');
        onSelectWard([]); // Notify parent
    }
    
    // Log selected options whenever they change
    useEffect(() => {
        if (selectedOptions.length === options.length) {
           // console.log("Selected All Wards names:", dropDownWardNames);
        } else if (selectedOptions.length > 0) {
         //   console.log("Corresponding Ward Names:", dropDownWardNames);
        } else {
          //  console.log('Cleared All Wards');
        }
    }, [selectedOptions, dropDownWardNames]); 
    

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

    // const buttonText = selectedOptions.length > 0 ? selectedOptions.join(", ") : "None Selected";
    // const isAllSelected = selectedOptions.length === options.length;

    const buttonText = selectedOptions.length > 0
        ? options.filter(option => selectedOptions.includes(option.ward_id.toString())).map(option => option.ward_name).join(", ")
        : "None Selected";
    const isAllSelected = selectedOptions.length === options.length;

    // useEffect(()=>{
    //     setDropDownWardNames(selectedWardNames);
    // },[onSelectWard])


    return (
        <div className='my-main-container'>
            <h4>Level 2</h4>
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
                                <label key={option.ward_id.toString()}>
                                    <input
                                        type="checkbox"
                                        value={option.ward_id.toString()}
                                        checked={selectedOptions.includes(option.ward_id.toString())}
                                        onChange={updateSelected}
                                    />
                                    {option.ward_name}
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
    )
}

export default Wards;






