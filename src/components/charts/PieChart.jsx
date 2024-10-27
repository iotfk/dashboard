// import React, { useEffect, useRef , useContext, useState } from "react";
// import { Chart } from "chart.js/auto";
// import { MachineContext } from "../../hooks/ContextAPI/MachineContext";
// import Machinedata from "../../pages/Machinedata";

// const API = "http://localhost:7000/machines";

// var pieOfflineMachines;
// var pieOnlineMachines;

// export default function PieChart() {
//   const [fetchAllMachines, setFetchAllMachines] = useState([]);

//   const { alertMachineData , machineForCharts,  setMachinesForCharts } = useContext(MachineContext);

//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);


//   const onlineMachines = alertMachineData.filter(
//     (machine) => machine.status.toLowerCase() === 'online'
//   );

//   const offlineMachines = alertMachineData.filter(
//     (machine) => machine.status.toLowerCase() === 'offline'
//   );

//   useEffect(() => {
//     fetchMachines(API);
// }, []);


// // const fetchMachines = async (url) => {
// //   try {
// //       const res = await fetch(url);
// //       const machines = await res.json();
// //       setFetchAllMachines(machines);

      

// //   } catch (error) {
// //       console.error(error);
// //   }

// // };

// const fetchMachines = async (url) => {
//   try {
//     const res = await fetch(url);
//     const machines = await res.json();
//     setFetchAllMachines(machines);

//     // Filter machines with status "offline"
//      pieOfflineMachines = machines.filter(machine => machine.status === "offline");
//    // console.log("Number of offline machines: ", pieOfflineMachines.length);
    
//   pieOnlineMachines = machines.length -  offlineMachines.length;

//   // console.log("Number of online machines: ",  pieOnlineMachines );
//   } catch (error) {
//     console.error(error);
//   }
// };


// // console.log("All Machine Data For Chart: " , fetchAllMachines);




//   useEffect(() => {
//     if (chartInstance.current) chartInstance.current.destroy();

//     const myChartRef = chartRef.current.getContext("2d");

//     chartInstance.current = new Chart(myChartRef, {
//       type: "pie",
//       data: {
//         labels: ["Online", "Offline"],
//         datasets: [
//           {
//             data: [3, 4],
//             backgroundColor: [
//               "rgb(56, 255, 159)",
//               "rgb(255, 46, 46)",
//             ],
//           },
//         ],
//       },
//       options: {
//         responsive: true, // Enable responsive resizing
//         maintainAspectRatio: true, // Maintain aspect ratio when resizing
//         plugins: {
//           legend: {
//             position: 'bottom', // Position of the legend
//           }
//         }
//       },
//     });

//     return () => chartInstance.current && chartInstance.current.destroy();
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "auto" }}>

// {/* <div style={{ display: 'none' }}>
//         <Machinedata />
//       </div> */}
//       {/* The canvas will resize automatically to fit its container */}
//       <canvas ref={chartRef} />
//     </div>
//   );
// }


import React, { useEffect, useRef, useContext, useState } from "react";
import { Chart } from "chart.js/auto";
import { MachineContext } from "../../hooks/ContextAPI/MachineContext";

const API = "https://mcuconnect.com/dashboard-api/machines";

export default function PieChart() {
  const [fetchAllMachines, setFetchAllMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { alertMachineData } = useContext(MachineContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Function to get count of online and offline machines
  const getOnlineMachines = (machines) =>
    machines.filter((machine) => machine.status.toLowerCase() === "online").length;

  const getOfflineMachines = (machines) =>
    machines.filter((machine) => machine.status.toLowerCase() === "offline").length;

  // Fetch the machine data
  useEffect(() => {
    fetchMachines(API);
  }, []);

  const fetchMachines = async (url) => {
    try {
      const res = await fetch(url);
      const machines = await res.json();
      setFetchAllMachines(machines); // Save the fetched machines to state
      setIsLoading(false); // Set loading state to false once the data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Wait until the data is fetched
    if (!isLoading && fetchAllMachines.length > 0) {
      if (chartInstance.current) chartInstance.current.destroy(); // Destroy previous instance

      const myChartRef = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: ["Online", "Offline"],
          datasets: [
            {
              data: [
                getOnlineMachines(fetchAllMachines), // Get online machines count
                getOfflineMachines(fetchAllMachines), // Get offline machines count
              ],
              backgroundColor: ["rgb(56, 255, 159)", "rgb(255, 46, 46)"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    return () => chartInstance.current && chartInstance.current.destroy(); // Cleanup chart on unmount
  }, [fetchAllMachines, isLoading]); // Re-render when data changes

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
