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

const API = "https://mcuconnect.com/dashboard-api/machines";
//var apiData;






// Data object for each zone
const zoneData = {
  zone1: {
    machinesInstalled: 20,
    machinesRunning: 17,
    totalCollection: 67716,
    itemsDispensed: 16,
    stockEmpty: 16,
    stockLow: 16,
    stockError: 16,
    stockOk: 16,
    burningIdle: 40,
    burningEnabled: 16,
    burningError: 16,
    totalBurningCycle: 12469
  },
  zone2: {
    machinesInstalled: 17,
    machinesRunning: 14,
    totalCollection: 50000,
    itemsDispensed: 20,
    stockEmpty: 5,
    stockLow: 8,
    stockError: 2,
    stockOk: 20,
    burningIdle: 30,
    burningEnabled: 12,
    burningError: 4,
    totalBurningCycle: 10000
  },
  zone3: {
    machinesInstalled: 10,
    machinesRunning: 3,
    totalCollection: 40000,
    itemsDispensed: 15,
    stockEmpty: 3,
    stockLow: 7,
    stockError: 1,
    stockOk: 18,
    burningIdle: 28,
    burningEnabled: 10,
    burningError: 3,
    totalBurningCycle: 9000
  },
  zone4: {
    machinesInstalled: 18,
    machinesRunning: 15,
    totalCollection: 45000,
    itemsDispensed: 18,
    stockEmpty: 4,
    stockLow: 6,
    stockError: 2,
    stockOk: 3,
    burningIdle: 35,
    burningEnabled: 11,
    burningError: 5,
    totalBurningCycle: 11000
  },
  zone5: {
    machinesInstalled: 15,
    machinesRunning: 12,
    totalCollection: 38000,
    itemsDispensed: 14,
    stockEmpty: 2,
    stockLow: 5,
    stockError: 1,
    stockOk: 15,
    burningIdle: 25,
    burningEnabled: 9,
    burningError: 2,
    totalBurningCycle: 8500
  },
  zone6: {
    machinesInstalled: 19,
    machinesRunning: 10,
    totalCollection: 35000,
    itemsDispensed: 12,
    stockEmpty: 5,
    stockLow: 9,
    stockError: 2,
    stockOk: 13,
    burningIdle: 20,
    burningEnabled: 8,
    burningError: 1,
    totalBurningCycle: 7800
  }
};

const renderZoneData = (zone) => {
  const data = zoneData[zone];
  // console.log('Zone data:', data);
  // console.log('zoneData:', zoneData);
  // console.log('Zone parameter:', zone);
  if (!data) return null;



  return (
    <div className="floating-container">
      <h4 className='floating-heading'>{`Zone ${zone.slice(-1)}`}</h4>
      <div className="master-container-one">

        <div className="cards-containerOne">

          <PieChartForCard
            machinesInstalled={data.machinesInstalled}
            machinesRunning={data.machinesRunning}
          />
        </div>

        <div className="cards-containerTwo">

          <DonutChartForCard
            stockEmpty={data.stockEmpty}
            stockLow={data.stockLow}
            stockError={data.stockError}
            stockOk={data.stockOk}
          />
        </div>

      </div>

      <div className="master-cards-container">

        <div className="cards-rowone">
          <div className="my-cards">
            <div className="icons-div">
              <FaScrewdriverWrench />
              <p4 className='icon-div-text'>{data.machinesInstalled}</p4>
            </div>

            <div className="icon-text">
              <p4>Machines installed</p4>
            </div>

          </div>
          <div className="my-cards">
            <div className="icons-div">
              <FaPowerOff />
              <p4 className='icon-div-text'>{data.machinesRunning}</p4>
            </div>

            <div className="icon-text">
              <p4 className='icon-div-text'>Machines Running</p4>
            </div>
          </div>
          <div className="my-cards">

            <div className="icons-div">
              <FaIndianRupeeSign />
              <p4 className='icon-div-text'>{data.totalCollection}</p4>
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
              <p4 className='icon-div-text'>{data.itemsDispensed}</p4>
            </div>

            <div className="icon-text">
              <p4>Item dispensed</p4>
            </div>


          </div>




          <div className="my-cards">

            <div className="icons-div">
              <FaBatteryEmpty />
              <p4 className='icon-div-text'> {data.stockEmpty}</p4>
            </div>

            <div className="icon-text">
              <p4>Stock Empty</p4>
            </div>



          </div>







          <div className="my-cards">
            <div className="icons-div">
              < FaBatteryHalf />
              <p4 className='icon-div-text'> {data.stockLow}</p4>
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
              <p4 className='icon-div-text'>{data.stockError}</p4>
            </div>

            <div className="icon-text">
              <p4>Stock Error</p4>
            </div>


          </div>
          <div className="my-cards">

            <div className="icons-div">
              <FaBatteryFull />
              <p4 className='icon-div-text'>{data.stockOk}</p4>
            </div>

            <div className="icon-text">
              <p4>Stock Ok</p4>
            </div>


          </div>
          <div className="my-cards">

            <div className="icons-div">
              <FaFireFlameSimple />
              <p4 className='icon-div-text'> {data.burningIdle}</p4>
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
              <p4 className='icon-div-text'> {data.burningEnabled}</p4>
            </div>

            <div className="icon-text">
              <p4>Burning Enabled</p4>
            </div>



          </div>
          <div className="my-cards">
            <div className="icons-div">
              <FaFireFlameCurved />
              <p4 className='icon-div-text'> {data.burningError}</p4>
            </div>

            <div className="icon-text">
              <p4>Burning Error</p4>
            </div>



          </div>
          <div className="my-cards">
            <div className="icons-div">
              < FaRecycle />
              <p4 className='icon-div-text'> {data.totalBurningCycle}</p4>
            </div>

            <div className="icon-text">
              <p4> Total Burning Cycle</p4>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


function Machinemap() {

  var apiData = [];

  useEffect(() => {
    fetchAPI(API);
  }, []);

  const fetchAPI = async (url) => {
    try {
      const res = await fetch(url);
      apiData = await res.json();
      // setFetchAllMachines(machines);
      // return apiData;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("API Data Fetched: ", apiData);



  const [isVisible, setIsVisible] = useState(true);
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
    fetch(`https://darkslategray-hippopotamus-856839.hostingersite.com/dashboard-api/wards?zones=${zones.join(',')}`)
      .then(response => response.json())
      .then(data => setWards(data))
      .catch(error => console.error('Error fetching wards:', error));
    // console.log('slected wards:', wards);     
  };

  const handleSelectWard = (wards) => {
    setSelectedWards(wards);
    // Fetch and set beats based on selected wards
    fetch(`https://darkslategray-hippopotamus-856839.hostingersite.com/dashboard-api/beats?wards=${wards.join(',')}`)
      .then(response => response.json())
      .then(data => setBeats(data))
      .catch(error => console.error('Error fetching beats:', error));
    // console.log('My slected beats:', beats); 
  };

  useEffect(() => {
    fetch(`https://darkslategray-hippopotamus-856839.hostingersite.com/dashboard-api/machines`)
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
            <button className="floating-btn" onClick={() => setActiveZone('')}>Home</button>
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
        {activeZone && renderZoneData(activeZone)}
      </div>

    </div>

  );
}

export default Machinemap;
