import React, { useState, useEffect, useContext } from 'react'
import '../styles/reports.css'
import Zone from '../components/dropdowns/area/Zone'
import Ward from '../components/dropdowns/area/Ward'
import Beat from '../components/dropdowns/area/Beat'
import DatePicker from '../components/datepicker/DatePickerComponent'
import DatePickerComponent from '../components/datepicker/DatePickerComponent'
import ZoneReport from '../components/dropdowns/reportcomponent/ZoneReport'
import Wards from '../components/dropdowns/area/Wards'
import Machines from '../components/dropdowns/area/Machines'
import TableComponent from '../components/table/ReportTable'
import ReportTable from '../components/table/ReportTable'
import TableWithDownload from '../components/table/TableWithDownload'
import { MachineContext } from '../hooks/ContextAPI/MachineContext'

const API = "https://mcuconnect.com/dashboard-api/machines";

function Reports() {

  const { iSelectedMachines, isToggled, setIsToggled, startDate, endDate, dropDownMachineNames, dropDownWardNames, dropDownZoneNames, setDropDownZoneNames, dropDownBeatNames, setDropDownBeatNames } = useContext(MachineContext);

  const [selectedZones, setSelectedZones] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedWards, setSelectedWards] = useState([]);
  const [beats, setBeats] = useState([]);
  const [selectedBeats, setSelectedBeats] = useState([]);

  //const [isToggled, setIsToggled] = useState(false); // Toggle state

  const [machines, setMachines] = useState([]); // State for storing complete machine data
  const [machineSerialNumbers, setMachineSerialNumbers] = useState([]); // State for storing machine serial numbers
  const [filteredMachines, setFilteredMachines] = useState([]);


  const [isLoaded, setIsLoaded] = useState(false);
// You can now use startDate and endDate in your component logic
//console.log("Selected Start Date:", startDate);
//console.log("Selected End Date:", endDate);

const handleLoadClick = () => {
  setIsLoaded(true);
};

  const handleSelectZone = (zones) => {
    setSelectedZones(zones);
    // Fetch and set wards based on selected zones
    fetch(`https://mcuconnect.com/dashboard-api/wards?zones=${zones.join(',')}`)
      .then(response => response.json())
      .then(data => setWards(data))
      .catch(error => console.error('Error fetching wards:', error));
    // console.log('slected wards:', wards);     
  };

  const handleSelectWard = (wards) => {
    setSelectedWards(wards);
    // Fetch and set beats based on selected wards
    fetch(`https://mcuconnect.com.com/dashboard-api/beats?wards=${wards.join(',')}`)
      .then(response => response.json())
      .then(data => setBeats(data))
      .catch(error => console.error('Error fetching beats:', error));
    // console.log('My slected beats:', beats); 
  };

  //console.log('Drop Down Selected BeatsS:', selectedBeats);

  // Fetch machine data when selected beats change
  // Fetch machine data when selected beats change
  // Fetch machine data when selected beats change

  useEffect(() => {
    fetch(`https://mcuconnect.com.com/dashboard-api/machines`)
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

 // console.log('Selected Beats:', selectedBeats);
//  console.log('Filtered Machine Serial Numbers:', machineSerialNumbers);
 // console.log('Filtered Machines Data:', filteredMachines);

   //console.log('Selected Beats:', selectedBeats);
  // console.log('DD Machine Serial Numbers:', machineSerialNumbers);
   
   //console.log('DD Machines json:', machines);
  // console.log('i Selected Machines Serial : ',  iSelectedMachines);
   

   setDropDownBeatNames(selectedBeats);
   setDropDownZoneNames(selectedZones);

   //console.log('DD Selected Machine :', dropDownMachineNames);

   //console.log('DD selected Beats Data:', dropDownBeatNames);

   //console.log('DD selected Ward Data:', dropDownWardNames);

   //console.log('DD selected Zone Data:',dropDownZoneNames);

  const handleSelectMachine = (selectedMachines) => {
   // console.log("Selected Machines:", selectedMachines);
  };

  const handleSelectMachineSerial = (onSelectMachineSerial) => {
   // console.log("Selected Machines Serial:", onSelectMachineSerial);
  };


  const handleToggle = () => {
    setIsToggled(prevState => !prevState);

    ///console.log("Toggle Button State: ", isToggled ? "Daily" : "Totals Only" );
    
  };

  return (
    <div className="report-container">
      <div className="areaContainer">
        {/* <ZoneReport/> */}

        {/* dropdowns here */}

        <Zone onSelectZone={handleSelectZone} />
        <Wards selectedZones={selectedZones} onSelectWard={handleSelectWard} />
        <Beat beats={beats} selectedWards={selectedWards}
          selectedBeats={selectedBeats}
          setSelectedBeats={setSelectedBeats}
        />
        <Machines machineSerialNumbers={machineSerialNumbers} onSelectMachine={handleSelectMachine} onSelectMachineSerial={handleSelectMachineSerial} selectedBeats={selectedBeats} />

      </div>

      <div className="togglediv">

        <div className="toggle-switch" onClick={handleToggle}>
          <div className={`slider ${isToggled ? 'toggled' : ''}`}>
            <span className={`slider-text ${isToggled ? 'toggled-text' : ''}`}>
              {isToggled ? 'Totals only' : 'Daily'}
            </span>
          </div>
        </div>

      </div>

      <div className="sectionContainer">

        <div className="datepicker-main">

          <div className="datepicker">
            <div className="datepicker-text">
              <p2>Start Date</p2>  </div>
            <DatePickerComponent isStartDate={true} />
          </div>

          <div className="datepicker">
            <div className="datepicker-text">
              <p2>End Date</p2>  </div>
            <DatePickerComponent  isStartDate={false}/>
          </div>

        </div>

        <div className="loadButton">
          <button className="load-button" onClick={handleLoadClick}>
            Load
          </button>
        </div>

      </div>

      <div className="table-container-div">
        <br />

        <p>Download Button Here</p> <br />
        {/* <TableWithDownload /> */}
        {isLoaded && <TableWithDownload />}
      </div>

    </div>
  )
}

export default Reports