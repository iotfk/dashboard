import React, {useContext } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import PieChart from './charts/PieChart';
import DoughnutChart from './charts/DoughnutChart';
import { color } from 'chart.js/helpers';
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { MdPowerSettingsNew, MdInventory } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import '../styles/dashhome.css'
import Machinedata from '../pages/Machinedata';
import { MachineContext } from '../hooks/ContextAPI/MachineContext';

const DashHome = () => {
const { myName ,alertMachineData} = useContext(MachineContext)


const onlineMachines = alertMachineData.filter(
    (machine) => machine.status.toLowerCase() === 'online'
  );


  // Function to extract and sum total collection from alertMachineData
const calculateTotalCollection = () => {
    return alertMachineData.reduce((total, machine) => {
      const match = machine.collection.match(/\[ ₹ ([\d.]+) K \]/);
      if (match) {
        return total + parseFloat(match[1]) * 1000; // Convert to a number and account for 'K'
      }
      return total;
    }, 0);
  };

  const totalCollection = calculateTotalCollection();


  // Function to extract and sum total items dispensed from alertMachineData
  const calculateTotalItemsDispensed = () => {
    return alertMachineData.reduce((total, machine) => {
      const match = machine.items_dispensed.match(/\[ ([\d.]+) K \]/);
      if (match) {
        return total + parseFloat(match[1]) * 1000; // Convert to a number and account for 'K'
      }
      return total;
    }, 0);
  };

  const totalItemsDispensed = calculateTotalItemsDispensed();

    return (

        
        <main className='main-container'>

{/* <div style={{ display: 'none' }}>
        <Machinedata />
      </div> */}

            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>
            <div className='main-cards'>

                <div className='card'>
                    <div className='card-inner'>

                        <div className="icon-circle circle-color1" >
                            <GiSettingsKnobs className='card_icon  card_icon1' />
                        </div>
                        <div className='text-container'>
                            <p className='text-title'>Machine Installed</p>
                            <h1>{alertMachineData.length}</h1>
                        </div>

                    </div>

                </div>


                <div className='card'>
                    <div className='card-inner'>

                        <div className="icon-circle  circle-color2" >
                            <MdPowerSettingsNew className='card_icon card_icon2' />
                        </div>
                        <div className='text-container'> {/* New container for text */}
                            <p className='text-title'>Machine Running</p> {/* Changed p3 to p */}
                            <h1>{onlineMachines.length}</h1>
                        </div>
                    </div>

                </div>


                <div className='card'>
                    <div className='card-inner'>
                        <div className="icon-circle circle-color3">
                            <HiOutlineCurrencyRupee className='card_icon card_icon3' />
                        </div>
                        <div className='text-container'> {/* New container for text */}
                            <p className='text-title'>Total Collection</p> {/* Changed p3 to p */}
                            <h1>{totalCollection}</h1>
                        </div>
                    </div>
                </div>




                <div className='card'>
                    <div className='card-inner'>

                        <div className="icon-circle circle-color4">
                            <MdInventory className='card_icon card_icon4' />
                        </div>
                        <div className='text-container'> {/* New container for text */}
                            <p className='text-title'>items Dispensed</p> {/* Changed p3 to p */}
                            <h1>{totalItemsDispensed}</h1>
                        </div>
                    </div>

                </div>
            </div>

            <div className='charts'>
                <ResponsiveContainer width="60%" height="60%">
                    <p2 style={{ color: 'black', fontWeight: 'bold' }}>Machine Status</p2>
                    <PieChart />
                </ResponsiveContainer>
                <ResponsiveContainer width="60%" height="60%">
                    <p2 style={{ color: 'black', fontWeight: 'bold' }}>Stock Status</p2>
                    <DoughnutChart />
                </ResponsiveContainer>
            </div>
        </main>
    );
};

export default DashHome;
