import { React, useEffect } from 'react'
import '../css/virtual-select.min.css'
import '../js/virtual-select.min.js'

import './rcstyle.css'

import { FaCheck, FaXmark } from "react-icons/fa6";

function ZoneReport() {
  useEffect(() => {

    if (window.VirtualSelect) {
      window.VirtualSelect.init({
        ele: '#multipleSelect',
      });
    }
  }, []);



  const clearZone = (className) => {
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

  const clearBeat = (className) => {
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



  const clearMachine = (className) => {
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

    <div className="dady-container">



      <div className="child-container">
        <h4>Zone</h4>

        <div className="areaClass">
          <div className="tick">
            <FaCheck />
          </div>


          <select
            multiple
            id="multipleSelect"
            className="zoneSelect"
            placeholder="None Selected"
            data-search="false"
            data-silent-initial-value-set="true"

          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <div className="cross" onClick={() => clearZone('zoneSelect')} >
            < FaXmark />
          </div>

        </div>
      </div>




      <div className="child-container">
        <h4>Ward</h4>

        <div className="areaClass">
          <div className="tick">
            <FaCheck />
          </div>


          <select
            multiple
            id="multipleSelect"
            className="wardSelect"
            placeholder="None Selected"
            data-search="false"
            data-silent-initial-value-set="true"
          >
            <option value="1">AD</option>
            <option value="2">AB</option>
            <option value="3">EB</option>
          </select>

          <div className="cross" onClick={() => clearWard('wardSelect')}>
            < FaXmark />
          </div>

        </div>
      </div>






      <div className="child-container">
        <h4>Beat</h4>

        <div className="areaClass">
          <div className="tick">
            <FaCheck />
          </div>


          <select
            multiple
            id="multipleSelect"
            className='beatSelect'
            placeholder="None Selected"
            data-search="false"
            data-silent-initial-value-set="true"
          >
            <option value="1">101</option>
            <option value="2">98</option>
            <option value="3">202</option>
          </select>

          <div className="cross" onClick={() => clearBeat('beatSelect')}  >
            < FaXmark />
          </div>

        </div>
      </div>






      <div className="child-container">
        <h4>Machine</h4>

        <div className="areaClass">
          <div className="tick">
            <FaCheck />
          </div>


          <select
            multiple
            id="multipleSelect"
            className='machineSelect'
            placeholder="None Selected"
            data-search="false"
            data-silent-initial-value-set="true"
          >
            <option value="1">AX225B003</option>
            <option value="2">AX225B004</option>
            <option value="3">AX225B055</option>
          </select>

          <div className="cross" onClick={() => clearMachine('machineSelect')}>
            < FaXmark />
          </div>

        </div>
      </div>



    </div>
  )
}

export default ZoneReport