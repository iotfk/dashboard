import React, { useState, useEffect, useRef, Button, useContext } from 'react';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import '../styles/dropdown.css';

import '../styles/machinemap.css'

import { MachineContext } from '../hooks/ContextAPI/MachineContext';
import MapComponent from '../components/maps/MapComponent';
import MStatus from '../components/dropdowns/machinestatus/MStatus';
import SStatus from '../components/dropdowns/machinestatus/SStatus';
import BStatus from '../components/dropdowns/machinestatus/BStatus';
import Zone from '../components/dropdowns/area/Zone';
import Wards from '../components/dropdowns/area/Wards';
import Beat from '../components/dropdowns/area/Beat';
import { Chart } from 'chart.js';
import PieChartForCard from '../components/charts/PieChartForCard';
import DonutChartForCard from '../components/charts/DoughnutChartForCard';
import {
  FaLayerGroup,
  FaPowerOff,
  FaScrewdriverWrench,
  FaIndianRupeeSign,
  FaFireFlameSimple,
  FaFireFlameCurved,
  FaFire,
  FaBatteryQuarter,
  FaBatteryHalf,
  FaBatteryFull,
  FaBatteryEmpty,
  FaRecycle
} from "react-icons/fa6";

const API = "http://localhost:7000/machines";

function Machinemap() {

  const { iSelectedMachines, isToggled, setIsToggled, startDate, endDate, dropDownMachineNames, dropDownWardNames, dropDownZoneNames, setDropDownZoneNames, dropDownBeatNames, setDropDownBeatNames } = useContext(MachineContext);

  const [activeZone, setActiveZone] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState([]);                 // State for Machine Status
  const [selectedBurningStatus, setSelectedBurningStatus] = useState([]);   // state for Burning Status
  const [selectedStockStatus, setSelectedStockStatus] = useState([]);       // state for Stock status

  const [selectedZones, setSelectedZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]);
  const [beats, setBeats] = useState([]);
  const [selectedBeats, setSelectedBeats] = useState([]);

  const [machines, setMachines] = useState([]); // State for storing complete machine data
  const [machineSerialNumbers, setMachineSerialNumbers] = useState([]); // State for storing machine serial numbers
  const [filteredMachines, setFilteredMachines] = useState([]);

  useEffect(() => {
    console.log("Machine Status Selected:", selectedStatus);
    console.log("Burning Status Selected: ", selectedBurningStatus);
    console.log("Stock Status Selected:", selectedStockStatus);
  }, [selectedStatus, selectedBurningStatus, selectedStockStatus]);


  const handleSelectZone = (zones) => {
    setSelectedZones(zones);
    // Fetch and set wards based on selected zones
    fetch(`http://localhost:7000/wards?zones=${zones.join(',')}`)
      .then(response => response.json())
      .then(data => setWards(data))
      .catch(error => console.error('Error fetching wards:', error));
    // console.log('slected wards:', wards);     
  };

  const handleSelectWard = (wards) => {
    setSelectedWards(wards);
    // Fetch and set beats based on selected wards
    fetch(`http://localhost:7000/beats?wards=${wards.join(',')}`)
      .then(response => response.json())
      .then(data => setBeats(data))
      .catch(error => console.error('Error fetching beats:', error));
    // console.log('My slected beats:', beats); 
  };

  useEffect(() => {
    fetch(`http://localhost:7000/machines`)
      .then((response) => response.json())
      .then((data) => {
        setMachines(data); // Store complete machine data

        // Apply filtering based on selected beats
        const filteredData = data.filter((machine) =>
          selectedBeats.includes(machine.beat_name)
        );

        setFilteredMachines(filteredData); // Store filtered machine data
        setMachineSerialNumbers(filteredData.map((machine) => machine.serial_number)); // Extract and store serial numbers
      })
      .catch((error) => console.error('Error fetching machines:', error));
  }, [selectedBeats]);


  setDropDownBeatNames(selectedBeats);
  setDropDownZoneNames(selectedZones);

  console.log('DD Selected Machine :', dropDownMachineNames);

  console.log('DD selected Beats Data:', dropDownBeatNames);

  console.log('DD selected Ward Data:', dropDownWardNames);

  console.log('DD selected Zone Data:', dropDownZoneNames);



  return (

    <div className="my-map-container">
      <div className="child1">


        <div className="grand-child">

          <div className="grand-child search-container">
            <input
              type="text"
              className="search-box"
              placeholder="Search Machines..."
            />
          </div>

          <MStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          <SStatus selectedStockStatus={selectedStockStatus} setSelectedStockStatus={setSelectedStockStatus} />
          <BStatus selectedBurningStatus={selectedBurningStatus} setSelectedBurningStatus={setSelectedBurningStatus} />

        </div>


        <div className="grand-child">

          <Zone onSelectZone={handleSelectZone} />
          <Wards selectedZones={selectedZones} onSelectWard={handleSelectWard} />
          <Beat beats={beats} selectedWards={selectedWards}
            selectedBeats={selectedBeats}
            setSelectedBeats={setSelectedBeats}
          />
        </div>

      </div>

      <div class="child2">
        <MapComponent />

        <div className="floating-cb">
          <div className="floating-checkbox">
            <Checkbox className="small-checkbox" shape="round" color="primary" animation="smooth"> Auto </Checkbox>
            <Checkbox className="small-checkbox" shape="round" color="primary" animation="smooth"> Zone </Checkbox>
            <Checkbox className="small-checkbox" shape="round" color="primary" animation="smooth"> Ward </Checkbox>
            <Checkbox className="small-checkbox" shape="round" color="primary" animation="smooth"> Beat </Checkbox>
            <Checkbox className="small-checkbox" shape="round" color="primary" animation="smooth"> Machine </Checkbox>
          </div>
        </div>

        <div className="floating-div">

          <div className="floating-buttons">
            <button className="floating-btn">Home</button>
            <button className="floating-btn">Graphs</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone1')}>Zone 1</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone2')} >Zone 2</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone3')}>Zone 3</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone4')}>Zone 4</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone5')}>Zone 5</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone6')}>Zone 6</button>
            <button className="floating-btn" onClick={() => setActiveZone('zone7')}>Zone 7</button>
          </div>
        </div>
      </div>

      {activeZone === 'zone1' && (
        <div className="floating-container">
          <p>Zone 1 Content</p>
        </div>
      )}



      {activeZone === 'zone2' && (
        <div className="floating-container">
          <h4 className='floating-heading'>Zone 2</h4>
          <div className="master-container-one">

            <div className="cards-containerOne">

              <PieChartForCard />
            </div>

            <div className="cards-containerTwo">

              <DonutChartForCard />
            </div>

          </div>

          <div className="master-cards-container">

            <div className="cards-rowone">
              <div className="my-cards">
                <div className="icons-div">
                  <FaScrewdriverWrench />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Machines installed</p4>
                </div>

              </div>
              <div className="my-cards">
                <div className="icons-div">
                  <FaPowerOff />
                  <p4 className='icon-div-text'>17</p4>
                </div>

                <div className="icon-text">
                  <p4 className='icon-div-text'>Machines Running</p4>
                </div>
              </div>
              <div className="my-cards">

              <div className="icons-div">
                  <FaIndianRupeeSign />
                  <p4 className='icon-div-text'>67716</p4>
                </div>

                <div className="icon-text">
                  <p4>Total collection</p4>
                </div>



              </div>
            </div>

            <div className="cards-rowtwo">

              <div className="my-cards">

              <div className="icons-div">
                  <FaLayerGroup />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Item dispensed</p4>
                </div>


              </div>




              <div className="my-cards">

              <div className="icons-div">
                  <FaBatteryEmpty/>
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Stock Empty</p4>
                </div>



              </div>







              <div className="my-cards">
              <div className="icons-div">
                  < FaBatteryHalf/>
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Stock Low</p4>
                </div>




              </div>


            </div>

            <div className="cards-rowthree">

              <div className="my-cards">

              <div className="icons-div">
                  <FaBatteryQuarter />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Stock Error</p4>
                </div>


              </div>
              <div className="my-cards">

              <div className="icons-div">
                  <FaBatteryFull />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Stock Ok</p4>
                </div>


              </div>
              <div className="my-cards">

              <div className="icons-div">
                  <FaFireFlameSimple />
                  <p4 className='icon-div-text'>40</p4>
                </div>

                <div className="icon-text">
                  <p4>Burning idle</p4>
                </div>


              </div>



            </div>
            <div className="cards-rowfour">

              <div className="my-cards">
              <div className="icons-div">
                  < FaFire />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Burning Enabled</p4>
                </div>



              </div>
              <div className="my-cards">
              <div className="icons-div">
                  <FaFireFlameCurved />
                  <p4 className='icon-div-text'>16</p4>
                </div>

                <div className="icon-text">
                  <p4>Burning Error</p4>
                </div>



              </div>
              <div className="my-cards">
              <div className="icons-div">
                  < FaRecycle />
                  <p4 className='icon-div-text'>12469</p4>
                </div>

                <div className="icon-text">
                  <p4> Total Burning Cycle</p4>
                </div>



              </div>


            </div>

          </div>



        </div>
      )}

      {activeZone === 'zone3' && (
        <div className="floating-container">
          <p>Zone 3 Content</p>
        </div>
      )}

      {activeZone === 'zone4' && (
        <div className="floating-container">
          <p>Zone 4 Content</p>
        </div>
      )}

      {activeZone === 'zone5' && (
        <div className="floating-container">
          <p>Zone 5 Content</p>
        </div>
      )}

      {activeZone === 'zone6' && (
        <div className="floating-container">
          <p>Zone 6 Content</p>
        </div>
      )}

    </div>

  );
}

export default Machinemap;
