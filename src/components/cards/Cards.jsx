import React,{useContext, useEffect} from 'react'

import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { MdPowerSettingsNew, MdInventory } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaFireAlt, FaBatteryEmpty } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { TiBatteryLow } from 'react-icons/ti';
import './cards.css'

import { MachineContext } from '../../hooks/ContextAPI/MachineContext';

function Cards() {

    const {myName, alertMachineData} = useContext(MachineContext);
  //  const {machineInstalled, setMachineInstalled} =  useContext(MachineContext);

console.log("MachineData on Cards :", alertMachineData);

const onlineMachines = alertMachineData.filter(
    (machine) => machine.status.toLowerCase() === 'online'
  );

// // Function to get the count of machines with "Low" stock status
// const getLowStockCount = () => {
//     return alertMachineData.filter(
//       (machine) => machine.stock_status.trim().toLowerCase() === 'low'
//     ).length;
//   };

  // Function to get the count of machines with "Low" stock status
const getLowStockCount = () => {
    return alertMachineData.filter(
        (machine) => machine.stock_status?.trim().toLowerCase() === 'low'
    ).length;
};


 // Function to filter machines with "Empty" stock status
// Function to get the count of machines with "Empty" stock status
const getEmptyStockMachines = () => {
    return alertMachineData.filter(
        (machine) => machine.stock_status?.trim().toLowerCase() === 'empty'
    ).length;
};

  //Function to Filter Machines with Burning Status
  const getFilteredByBurningStatus = () =>{
    return alertMachineData.filter((machine)=> machine.burning_status.trim().toLowerCase() ==='burning'  ).length;
  }

// // Function to extract and sum total collection from alertMachineData
// const calculateTotalCollection = () => {
//     return alertMachineData.reduce((total, machine) => {
//       const match = machine.collection.match(/\[ ₹ ([\d.]+) K \]/);
//       if (match) {
//         return total + parseFloat(match[1]) * 1000; // Convert to a number and account for 'K'
//       }
//       return total;
//     }, 0);
//   };

//   const totalCollection = calculateTotalCollection();


// Function to extract and sum total collection from alertMachineData
// const calculateTotalCollection = () => {
//     return alertMachineData.reduce((total, machine) => {
//       const collection = parseFloat(machine.collection); // Convert collection string to a number
//       return total + (isNaN(collection) ? 0 : collection); // Add to total if valid number
//     }, 0);
//   };
  
//   const totalCollection = calculateTotalCollection();


// Function to extract and sum total collection from alertMachineData
const calculateTotalCollection = () => {
    return alertMachineData.reduce((total, machine) => {
      const collection = parseFloat(machine.collection); // Convert collection string to a number
      return total + (isNaN(collection) ? 0 : collection); // Add to total if valid number
    }, 0);
  };
  
  const totalCollection = calculateTotalCollection();
  

   // Function to extract and sum total items dispensed from alertMachineData
//    const calculateTotalItemsDispensed = () => {
//     return alertMachineData.reduce((total, machine) => {
//       const match = machine.items_dispensed.match(/\[ ([\d.]+) K \]/);
//       if (match) {
//         return total + parseFloat(match[1]) * 1000; // Convert to a number and account for 'K'
//       }
//       return total;
//     }, 0);
//   };

//   const totalItemsDispensed = calculateTotalItemsDispensed();


// Function to extract and sum total items dispensed from alertMachineData
const calculateTotalItemsDispensed = () => {
    return alertMachineData.reduce((total, machine) => {
      const itemsDispensed = parseFloat(machine.items_dispensed); // Convert items_dispensed string to a number
      return total + (isNaN(itemsDispensed) ? 0 : itemsDispensed); // Add to total if valid number
    }, 0);
  };
  
  const totalItemsDispensed = calculateTotalItemsDispensed();
  

    // // Function to extract and sum total burning cycles from alertMachineData
    // const calculateTotalBurningCycles = () => {
    //     return alertMachineData.reduce((total, machine) => {
    //       const match = machine.burning_cycles.match(/\[ ([\d.]+) K \]/);
    //       if (match) {
    //         return total + parseFloat(match[1]) * 1000; // Convert to a number and account for 'K'
    //       }
    //       return total;
    //     }, 0);
    //   };

    //   const totalBurningCycles = calculateTotalBurningCycles();

// Function to extract and sum total burning cycles from alertMachineData
const calculateTotalBurningCycles = () => {
    return alertMachineData.reduce((total, machine) => {
      const burningCycles = parseFloat(machine.burning_cycles); // Convert burning_cycles string to a number
      return total + (isNaN(burningCycles) ? 0 : burningCycles); // Add to total if valid number
    }, 0);
  };
  
  const totalBurningCycles = calculateTotalBurningCycles();
  



//   useEffect(()=>{
// console.log("Machines with Empty Stocks:", getEmptyStockMachines());


//   },[alertMachineData])

    return (
        <div className='cardDiv'>
            <div className='maincards'>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color1" >
                            <GiSettingsKnobs className='card_icon  card_icon1' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Machine Installed</p>
                            <h1>{alertMachineData.length}</h1>
                        </div>

                    </div>

                </div>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color2" >
                            <MdPowerSettingsNew className='card_icon card_icon2' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Machine Running</p>
                            <h1>{onlineMachines.length}</h1>
                        </div>

                    </div>

                </div>
                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color3" >
                            <HiOutlineCurrencyRupee className='card_icon card_icon3' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Total Collection</p>
                            <h1>{totalCollection}</h1>
                        </div>

                    </div>

                </div>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color4" >
                            <MdInventory className='card_icon card_icon4' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>items Dispensed</p>
                            <h1>{totalItemsDispensed}</h1>
                        </div>

                    </div>

                </div>

            </div>



            {/*  */}


            <div className='maincards'>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color2" >
                            <FaFireAlt className='card_icon  card_icon2' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Burning Enabled {"\u00A0"}  </p>
                            <h1>{ getFilteredByBurningStatus()}</h1>
                        </div>

                    </div>

                </div>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color3" >
                            <FiRefreshCcw className='card_icon card_icon3' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Burnig Cycle {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}   </p>
                            <h1>{totalBurningCycles}</h1>
                        </div>

                    </div>

                </div>
                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color1" >
                            <TiBatteryLow className='card_icon card_icon1' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'>Stock Low {"\u00A0"} {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}  </p>
                            <h1>{getLowStockCount()}</h1>
                        </div>

                    </div>

                </div>

                <div className='cards'>
                    <div className='innercards'>

                        <div className="icon-circle circle-color5" >
                            <FaBatteryEmpty className='card_icon card_icon5' />
                        </div>
                        <div className='textcontainer'>
                            <p className='text-title'> Stock Empty {"\u00A0"}  {"\u00A0"} {"\u00A0"}</p>
                            <h1>{getEmptyStockMachines()} </h1>
                        </div>

                    </div>

                </div>

            </div>



        </div>
    )
}

export default Cards