import React, {useState, useEffect, useContext} from 'react'
import './mdlayout.css'
import Beat from '../dropdowns/area/Beat'
import Zone from '../dropdowns/area/Zone'
import Cards from '../cards/Cards'
import ResponsiveTable from '../table/ResponsiveTable'
import Wards from '../dropdowns/area/Wards'
import MStatus from '../dropdowns/machinestatus/MStatus'
import SStatus from '../dropdowns/machinestatus/SStatus'
import BStatus from '../dropdowns/machinestatus/BStatus'
import { MachineContext } from '../../hooks/ContextAPI/MachineContext'

function MdLayout() {
    const [selectedZones, setSelectedZones] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedWards, setSelectedWards] = useState([]);
    const [beats, setBeats] = useState([]);
    const [selectedBeats, setSelectedBeats] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState([]);                 // State for Machine Status
    const [selectedBurningStatus, setSelectedBurningStatus] = useState([]);   // state for Burning Status
    const [selectedStockStatus, setSelectedStockStatus] = useState([]);       // state for Stock status
   
//const {setDropDownZoneNames} = useContext(MachineContext)

    useEffect(()=>{
        console.log("Machine Status Selected:", selectedStatus);
    //  console.log("Burning Status Selected: ", selectedBurningStatus);
        console.log("Stock Status Selected:", selectedStockStatus);
     }, [selectedStatus, selectedBurningStatus, selectedStockStatus]);

    const handleSelectZone = (zones) => {
      setSelectedZones(zones);
    //  setDropDownZoneNames(zones);
      // Fetch and set wards based on selected zones
      fetch(`https://mcuconnect.com/dashboard-api/wards?zones=${zones.join(',')}`)
        .then(response => response.json())
        .then(data => setWards(data))
        .catch(error => console.error('Error fetching wards:', error));
     //  console.log('slected wards:', wards);     
    };

   // setDropDownZoneNames(selectedZones);
  
    const handleSelectWard = (wards) => {
         setSelectedWards(wards);
      // Fetch and set beats based on selected wards
      fetch(`https://mcuconnect.com/dashboard-api/beats?wards=${wards.join(',')}`)
        .then(response => response.json())
        .then(data => setBeats(data))
        .catch(error => console.error('Error fetching beats:', error));
        //console.log('slectedY beats:', beats); 
    };

    console.log('Drop Down Selected BeatsS:', selectedBeats);
     // Log changes to beats for debugging
  useEffect(() => {
console.log('Drop Down Selected Beats:', selectedBeats);
  }, [selectedBeats]);
  
    return (
      <div className="layout-container">
        <div className="box box1">
        <MStatus selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
        <SStatus selectedStockStatus ={selectedStockStatus} setSelectedStockStatus={setSelectedStockStatus} />
        <BStatus selectedBurningStatus={selectedBurningStatus} setSelectedBurningStatus ={setSelectedBurningStatus}/>
        <br/>
   
          <Zone onSelectZone={handleSelectZone} />
          <Wards selectedZones={selectedZones} onSelectWard={handleSelectWard} />
          <Beat beats={beats} selectedWards={selectedWards} 
          selectedBeats={selectedBeats}
          setSelectedBeats={setSelectedBeats}
          />
        </div>
        <div className="box box2">
          <Cards />
        </div>
        <div className="box box3">
          <ResponsiveTable
          selectedStatus={selectedStatus}
          selectedStockStatus ={selectedStockStatus}
          selectedBurningStatus={selectedBurningStatus}

          selectedZones={selectedZones}
          selectedWards={selectedWards}
          selectedBeats={selectedBeats} 
          />
        </div>
      </div>
    );
  }
  
  export default MdLayout;