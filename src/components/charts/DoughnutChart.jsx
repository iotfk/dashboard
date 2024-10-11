// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Chart } from "chart.js/auto";
// import { MachineContext } from "../../hooks/ContextAPI/MachineContext";


// var pieOfflineMachines;
// var pieOnlineMachines;

// const API = "https://darkslategray-hippopotamus-856839.hostingersite.com/dashboard-api/machines";

// export default function DoughnutChart() {

// const [fetchAllMachines, setFetchAllMachines]= useState([]);

//   useEffect(() => {
//     fetchMachines(API);
// }, []);

// const fetchMachines = async (url) => {
//   try {
//     const res = await fetch(url);
//     const machines = await res.json();
//     setFetchAllMachines(machines);

//     // Filter machines with status "offline"
//   //    pieOfflineMachines = machines.filter(machine => machine.status === "offline");
//   //   console.log("Number of offline machines: ", pieOfflineMachines.length);
    
//   // pieOnlineMachines = machines.length -  pieOfflineMachines.length;

//   // console.log("Number of online machines: ",  pieOnlineMachines );
//   } catch (error) {
//     console.error(error);
//   }
// };

// // const lowStock = ()=>{
// //   return fetchAllMachines.filter(
// //     (machine) => machine.stock_status.trim().toLowerCase() === 'low').length;
  
// // };

// console.log("All Machine Data For Chart: " , fetchAllMachines);
// //console.log("Low Stocks Machine Numbers: " , lowStock());


//   //const { alertMachineData } = useContext(MachineContext);


//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);



//   // Function to get the count of machines with "Low" stock status
//   const getLowStockCount = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status.trim().toLowerCase() === 'low'
//     ).length;
//   };

//   // Function to filter machines with "Empty" stock status
//   const getEmptyStockMachines = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status.trim().toLowerCase() === 'empty'
//     ).length;
//   };

//   //function to filter OK stock 
//   const getOKStockMachines = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status.trim().toLowerCase() === 'ok'
//     ).length;
//   };

//   //function to filter Error stock 
//   const getERRORStockMachines = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status.trim().toLowerCase() === 'error'
//     ).length;
//   };

//   console.log("Low Stocks Machine Numbers: " ,  getLowStockCount());

//   useEffect(() => {
//     if (chartInstance.current) chartInstance.current.destroy();

//     const myChartRef = chartRef.current.getContext("2d");

//     chartInstance.current = new Chart(myChartRef, {
//       type: "doughnut",
//       data: {
//         labels: ["Ok", "Low", "Empty", "Error"],
//         datasets: [
//           {
//             data: [
//               //lowStock(),
//               getOKStockMachines(),
//               getLowStockCount(), 
//               getEmptyStockMachines(),
//               getERRORStockMachines()
// //5,6,4

//             ],
//             backgroundColor: [
//               "rgb(56, 255, 159)",
//               "rgb(255, 215, 64)",
//               "rgb(255, 82, 82)",
//               "#4b42f5",
//             ],
//           },
//         ],
//       },
//       options: {
//         responsive: true,              // Enable responsive resizing
//         maintainAspectRatio: true,     // Maintain aspect ratio when resizing
//         plugins: {
//           legend: {
//             position: 'bottom',        // Position of the legend
//           }
//         }
//       },
//     });

//     return () => chartInstance.current && chartInstance.current.destroy();
//   }, [2000]);

//   return (
//     <div style={{ width: "100%", height: "auto" }}>
//       {/* The canvas will resize automatically to fit its container */}
//       <canvas ref={chartRef} />
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const API = "http://localhost:7000/machines";

export default function DoughnutChart() {
  const [fetchAllMachines, setFetchAllMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchMachines(API);
  }, []);

  const fetchMachines = async (url) => {
    try {
      const res = await fetch(url);
      const machines = await res.json();
      setFetchAllMachines(machines);
      setIsLoading(false);  // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get the count of machines with different stock statuses
  const getLowStockCount = () => {
    return fetchAllMachines.filter(
      (machine) => machine.stock_status.trim().toLowerCase() === 'low'
    ).length;
  };

  const getEmptyStockMachines = () => {
    return fetchAllMachines.filter(
      (machine) => machine.stock_status.trim().toLowerCase() === 'empty'
    ).length;
  };

  const getOKStockMachines = () => {
    return fetchAllMachines.filter(
      (machine) => machine.stock_status.trim().toLowerCase() === 'ok'
    ).length;
  };

  const getERRORStockMachines = () => {
    return fetchAllMachines.filter(
      (machine) => machine.stock_status.trim().toLowerCase() === 'error'
    ).length;
  };

  useEffect(() => {
    // Wait until fetchAllMachines is available and then create the chart
    if (!isLoading && fetchAllMachines.length > 0) {
      if (chartInstance.current) chartInstance.current.destroy();

      const myChartRef = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: ["Ok", "Low", "Empty", "Error"],
          datasets: [
            {
              data: [
                getOKStockMachines(),
                getLowStockCount(),
                getEmptyStockMachines(),
                getERRORStockMachines(),
              ],
              backgroundColor: [
                "rgb(56, 255, 159)",
                "rgb(255, 215, 64)",
                "rgb(255, 82, 82)",
                "#4b42f5",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }

    // Clean up the chart instance on unmount
    return () => chartInstance.current && chartInstance.current.destroy();
  }, [fetchAllMachines, isLoading]); // Update chart when data changes

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading message
  }

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
