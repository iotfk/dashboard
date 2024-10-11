import{ React, useEffect} from 'react'
import '../css/area.css'
import '../css/virtual-select.min.css'
import '../js/virtual-select.min.js'
import { FaCheck, FaXmark } from "react-icons/fa6";

function Ward() {
  useEffect(() => {
    if (window.VirtualSelect) {
      window.VirtualSelect.init({
        ele: '#multipleSelect', 
      });
    }
  }, []); 


  const clearWard = (className) => {
    const selectElements = document.querySelectorAll(`.${className}`);
    selectElements.forEach((selectElement) => {
      if (selectElement.virtualSelect) {
        selectElement.virtualSelect.reset();
      } else {
        selectElement.value = "";
        selectElement.dispatchEvent(new Event('change'));
      }
    });
  };

  return (
    <div className="my-container">
    <h4>Ward</h4>

    <div className="areaClass">
      <div className="tick">
      <FaCheck/>  
      </div>

    <div className="dd-container">
    <select multiple id="multipleSelect"  className="wardSelect" placeholder="None Selected" data-search="false" data-silent-initial-value-set="true">
      <option value="1">Ward A</option>
      <option value="2">Ward B</option>
      <option value="3">Ward C</option>
    </select>
    </div>
    <div className="cross" onClick={() => clearWard('wardSelect')}>
    < FaXmark />
    </div>

    </div>
  </div>
  )
}

export default Ward