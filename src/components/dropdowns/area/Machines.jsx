import React, { useState, useEffect, useRef, useContext } from 'react';
import './ddstyle.css'; // Assuming the CSS is shared with the Zone component
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MachineContext } from '../../../hooks/ContextAPI/MachineContext';

function Machines({ onSelectMachineSerial, onSelectMachine ,selectedBeats , machineSerialNumbers}) {

  const {iSelectedMachines , setIselectedMachines, dropDownMachineNames, setDropDownMachineNames} = useContext(MachineContext)
    // console.log("MyBeats :", selectedBeats);
    // console.log("Machines Serial:", machineSerialNumbers);
    
//   const [options, setOptions] = useState([
//     { machine_id: '1', machine_name: 'Machine A' },
//     { machine_id: '2', machine_name: 'Machine B' },
//     { machine_id: '3', machine_name: 'Machine C' },
//     { machine_id: '4', machine_name: 'Machine D' }
//   ]); // Placeholder data

  const [options, setOptions] = useState([]); // Initialize with an empty array
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

   // Update options when machineSerialNumbers change
   useEffect(() => {
    const newOptions = machineSerialNumbers.map((serial, index) => ({
      machine_id: (index + 1).toString(), // Generate machine_id dynamically
      machine_name: serial, // Use the serial number as the machine name
    }));
    setOptions(newOptions);
    //setIselectedMachines(newOptions);
  }, [machineSerialNumbers]); // Re-run effect if machineSerialNumbers change


  function toggleDropdown() {
    setDropdownVisible(prevState => !prevState);
  }


function updateSelected(event) {
    const { value, checked } = event.target;
    if (value === "select-all") {
      if (checked) {
        const allMachineIds = options.map((option) => option.machine_id.toString());
        setSelectedOptions(allMachineIds);
        setTimeout(() => {
          onSelectMachine(allMachineIds);

          const allSelectedMachineSerial =  allMachineIds.map(id => options.find(option => option.machine_id === id).machine_name);
          onSelectMachineSerial(allSelectedMachineSerial);
          setIselectedMachines(allSelectedMachineSerial);
        //  console.log("Selected Machine Serial Numbers:", allMachineIds.map(id => options.find(option => option.machine_id === id).machine_name));
        }, 0);
      } else {
        setSelectedOptions([]);
        setIselectedMachines([])
        
        setTimeout(() => {
          onSelectMachine([]);
          onSelectMachineSerial([]);
         // console.log("Selected Machine Serial Numbers: None");
        }, 0);
      }
    } else {
      setSelectedOptions((prevState) => {
        const newSelection = checked ? [...prevState, value] : prevState.filter((option) => option !== value);
        setTimeout(() => {
          onSelectMachine(newSelection);
            const selectedMachines = newSelection.map(id => options.find(option => option.machine_id === id).machine_name);
          onSelectMachineSerial(selectedMachines);
          setIselectedMachines(selectedMachines);
          const selectedMachineSerial = newSelection.map(id => options.find(option => option.machine_id === id).machine_name)
        ////  console.log("DD Selected Machine Serial Numbers: ", selectedMachineSerial);
          setDropDownMachineNames(selectedMachineSerial)
          //console.log("DD My Selected Machine Serial Numbers: ", dropDownMachineNames);
        }, 0);
        return newSelection;
      });
    }
  }


  function clearSelection() {
    setSelectedOptions([]);
    setTimeout(() => onSelectMachine([]), 0);
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
    ? options.filter(option => selectedOptions.includes(option.machine_id.toString())).map(option => option.machine_name).join(", ")
    : "None Selected";
  const isAllSelected = selectedOptions.length === options.length;

  return (
    <div className='my-main-container'>
      <h4>Machines</h4>
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
                <label key={option.machine_id}>
                  <input
                    type="checkbox"
                    value={option.machine_id.toString()}
                    checked={selectedOptions.includes(option.machine_id.toString())}
                    onChange={updateSelected}
                  />
                  {option.machine_name}
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

export default Machines;
