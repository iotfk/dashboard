import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import ReactPaginate from 'react-paginate';
import './table.css'
import { FaCheck, FaXmark } from "react-icons/fa6";
import { MachineContext } from '../../hooks/ContextAPI/MachineContext';

const API = "https://mcuconnect.com/dashboard-api/machines";
const wardAPI = "https://mcuconnect.com/dashboard-api/wards";

const columns = [
  {
    Header: 'SR.NO',
    accessor: 'srno',
  },
  {
    Header: 'Machine',
    accessor: 'machine',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Stock Status',
    accessor: 'stockstatus',
  },
  {
    Header: 'Burning Status',
    accessor: 'burningstatus',
  },
  {
    Header: 'INFO',
    accessor: 'info',
  },
];

{/* <div className="cross" onClick={(e) => { e.stopPropagation(); clearSelection(); }}>
<FaXmark />
</div> */}

// Modal Component
const Modal = ({ isOpen, onClose, machineData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="model-head">
        <h3>Machine: {machineData.serial_number} </h3> 
       <div className="space-div"></div>

        <div className="close-button"     onClick={onClose}  >
        <FaXmark />
        </div>

        </div>

       {/* Container for key-value pairs */}
     
        <div className="modal-details">
          <p><strong>Status:</strong> {machineData.status}</p> <hr/>
          <p><strong>IMSI:</strong> {machineData.IMSI}</p>   <hr/>
          <p><strong>RSSI:</strong> {machineData.RSSI ? machineData.RSSI : "N/A"}</p>   <hr/>
          <p><strong>Collection:</strong> {machineData.collection}</p>   <hr/>
          <p><strong>Items Dispensed:</strong> {machineData.items_dispensed}</p>  <hr/>
          <p><strong>Items Burnt:</strong> {machineData.items_burnt}</p>   <hr/>
          <p><strong>Burning Cycles:</strong> {machineData.burning_cycles}</p>  <hr/>
          <p><strong>On Since:</strong> {machineData.on_since ? new Date(machineData.on_since).toLocaleString() : "N/A"}</p>
        </div>

    
      </div>
    </div>
  );
};



function ResponsiveTable({ selectedStatus, selectedStockStatus, selectedBurningStatus, selectedZones, selectedWards = [], selectedBeats = [], }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataLimit, setDataLimit] = useState(5);

  const [wordData, setWordData] = useState([]);
  const [beatsData, setBeatsData] = useState([])


  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalData, setModalData] = useState({}); // State for modal data


  // const [alertMachineData, setAlertMachineData] = useState({});
  const {dropDownWardNames, setDropDownWardNames, alertMachineData, setAlertMachineData} = useContext(MachineContext)

  // console.log("Zones:", selectedZones);
  // console.log("Wards:", selectedWards);
  // console.log("Beats:", selectedBeats);


  // console.log("Burning Status Selected:", selectedBurningStatus);
  // console.log("Selected Stock Status : ", selectedStockStatus);
  // console.log("Machine Status Selected :", selectedStatus);


  // useEffect(() => {
  //   console.log("Burning Status Selected:", selectedBurningStatus);
  // }, [selectedBurningStatus])


  // useEffect(() => {
  //   // Log the length of alertMachineData to the console whenever it changes
  //   console.log("Length of alertMachineData:", alertMachineData.length);
  // }, [alertMachineData]);
  

useEffect(()=>{
  
 console.log("To be Alerted from : ", alertMachineData);
 console.log("Total Machines:", alertMachineData.length);
},[alertMachineData])


// Function to match machine data by serial number
const findMachineDataBySerialNumber = (serialNumber) => {
  const matchedMachine = alertMachineData.find(machine => machine.serial_number === serialNumber);
  return matchedMachine;
};


// On "View" button click, open the modal with the relevant data
const handleViewClick = (machineString) => {
  const match = machineString.match(/FN\d{3}[A-Z]\d{3} \[S\/N: \d{5}\]/); 
  const machineIdentifier = match ? match[0] : 'Identifier not found';

  if (machineIdentifier !== 'Identifier not found') {
    const machineData = findMachineDataBySerialNumber(machineIdentifier);
    if (machineData) {
      setModalData(machineData);  // Set the modal data
      setIsModalOpen(true);       // Open the modal
    } else {
      alert('Machine data not found!');
    }
  } else {
    alert('Machine identifier not found!');
  }
};


  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // useEffect(() => {
  //   fetchData(API);
  //   fetchWords(wardAPI);
  // }, []);


  useEffect(() => {
  // Fetch machine data every 200 ms
  const intervalId = setInterval(() => {
    fetchData(API);
  }, 200); // 2000ms = 2 seconds

  // Fetch ward data only once
  fetchWords(wardAPI);

  // Cleanup interval on component unmount
  return () => clearInterval(intervalId);
}, []);


  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const machines = await res.json();

      // Format the fetched data
      const formattedData = machines.map((machine, index) => ({
        srno: index + 1,
        machine: `M${String(machine.machine_id).padStart(5, '0')} [${machine.serial_number}] Zone ${machine.zone_name} / Ward ${machine.ward_name} / Beat No. ${machine.beat_name}`,
        status: machine.status,
        stockstatus: machine.stock_status,
        burningstatus: machine.burning_status,
        info: 'View', // Placeholder for the INFO button
      }));
      setAlertMachineData(machines)
      setData(formattedData);
       console.log(machines);

    } catch (error) {
      console.error(error);
    }
  };


  // fetch words from db
  const fetchWords = async (uri) => {
    try {
      const response = await fetch(uri);
      const fetchedWords = await response.json();
      setWordData(fetchedWords);
      // console.log("  incoming Words : ",fetchedWords);
    } catch (error) {
      console.error(error);
    }
  }


  //  Create a mapping from ward_id to ward_name
  const wardIdToNameMap = useMemo(() => {
    const map = {};
    wordData.forEach(ward => {
      map[ward.ward_id] = ward.ward_name;
    });
    return map;
  }, [wordData]);

  // Map selectedWards to their respective names
  const selectedWardNames = useMemo(() => {
    return selectedWards.map(id => wardIdToNameMap[id] || "").filter(name => name);
  }, [selectedWards, wardIdToNameMap]);


  //logging slected ward names
  useEffect(() => {
    //console.log("Selected Ward Names from DD: ", selectedWardNames);
    setDropDownWardNames(selectedWardNames);
  }, [selectedWardNames]);



const filteredData = useMemo(() => {
  return data.filter((row) => {
    // Convert all relevant fields to lowercase for consistent matching
  
    const burningStatus = (row.burningstatus || "").toLowerCase(); // Updated to match table column accessor
    const machineStatus = (row.status || "").toLowerCase(); // Updated to match table column accessor
    const stockStatus = (row.stockstatus || "").toLowerCase(); // Updated to match table column accessor

  
      const matchesZone = selectedZones.length === 0 || selectedZones.some((zone) => row.machine.includes(`Zone ${zone}`));

      const matchesWard = selectedWardNames.length === 0 || selectedWardNames.some((wardName) => { const includesWard = row.machine.includes(`Ward ${wardName}`);
        return includesWard;
      });

      const matchesBeat = selectedBeats.length === 0 || selectedBeats.some((beat) => row.machine.includes(`Beat No. ${beat}`));

    // Burning Status filtering
    const matchesBurningStatus = selectedBurningStatus.length === 0 || selectedBurningStatus.some((status) => burningStatus === status.toLowerCase());

    // Machine Status filtering
    const matchesMachineStatus =  selectedStatus.length === 0 ||  selectedStatus.some((status) => machineStatus === status.toLowerCase());

    // Stock Status filtering
    const matchesStockStatus = selectedStockStatus.length === 0 || selectedStockStatus.some((status) => stockStatus === status.toLowerCase());

    // Search term filtering
    const matchesSearchTerm = Object.values(row).some((val) =>  String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (  matchesZone && matchesWard && matchesBeat &&  matchesBurningStatus &&  matchesMachineStatus &&  matchesStockStatus &&  matchesSearchTerm );
  });
}, [ searchTerm, selectedZones, selectedWardNames, selectedBeats, selectedBurningStatus,selectedStockStatus, selectedStatus, data ]);


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: dataLimit },
    },
    useSortBy,
    usePagination
  );


  return (
    <div className="responsive-table-container">

<Modal isOpen={isModalOpen} onClose={handleCloseModal} machineData={modalData} />


      <div className="table-controls">

        <div className="search-container">
          <p4 className="show-entries" >Show</p4>
          <select
            className='limit-box'
            value={dataLimit}
            onChange={(e) => {
              setDataLimit(Number(e.target.value));
              setPageSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <p4 className="show-entries">entries</p4>
        </div>

        <input
          className='search-boxx'
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table {...getTableProps()} className="responsive-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>



        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // Check if the current cell is the 'machine' and target first 6 char

                  if (cell.column.id == 'machine') {
                    const machineText = cell.value;
                    const highlightedText = machineText.substring(0, 6);
                    const remainingText = machineText.substring(6);
                    return (
                      <td {...cell.getCellProps()}>
                        <span className='highlighted-text'>{highlightedText}   </span>
                        {remainingText}
                      </td>
                    );
                  }

                  //also need to target Stock status , Burning status 

                  else if (cell.column.id == 'stockstatus') {
                    const stockClass =
                      cell.value === 'OK'
                        ? 'stock-ok'
                        : cell.value === 'Low'
                          ? 'stock-loww'
                          : 'stock-emptyy';
                    //to be addressed
                    return (
                      <td {...cell.getCellProps()} className="stockstatus-cell" >
                        <span className={stockClass}>{cell.render('Cell')}</span>
                      </td>
                    );
                  }

                  else if (cell.column.id === 'status') {
                    return (
                      <td {...cell.getCellProps()}>
                        <span
                          className={
                            cell.value === 'online' ? 'status-online' : 'status-offline'
                          }>
                          {cell.render('Cell')}
                        </span>
                      </td>
                    );
                  }

                  else if (cell.column.id === 'info') {
                    return (
                      <td {...cell.getCellProps()}>
                        {/* <button
                          className="info-button"
                          onClick={() => alert(`More info for ${row.original.machine}`)}
                        >
                          View
                        </button> */}

{/* <button
  className="info-button"
  onClick={() => {
    const machineString = row.original.machine;
    const match = machineString.match(/FN\d{3}[A-Z]\d{3} \[S\/N: \d{5}\]/); // Regular expression to match the desired pattern
    const machineIdentifier = match ? match[0] : 'Identifier not found';
    alert(`More info for ${machineIdentifier}`);
  }}
>
  View
</button> */}

<button
  className="info-button"
  onClick={() => {    handleViewClick(row.original.machine);
    // Extract the machine identifier from the machine string
    // const machineString = row.original.machine;
    // const match = machineString.match(/FN\d{3}[A-Z]\d{3} \[S\/N: \d{5}\]/); // Regular expression to match the desired pattern
    // const machineIdentifier = match ? match[0] : 'Identifier not found';

    // // If a valid machine identifier is found, search for the corresponding machine data
    // if (machineIdentifier !== 'Identifier not found') {
    //   const machineData = findMachineDataBySerialNumber(machineIdentifier);
      
    //   if (machineData) {
    //     // Display machine data in an alert
    //     alert(`Machine Info: 
    //     Serial Number: ${machineData.serial_number}
    //     Status: ${machineData.status}
    //     IMSI: ${machineData.IMSI}
    //     RSSI: ${machineData.RSSI}
    //     Collection: ${machineData.collection}
    //     Items Dispensed: ${machineData.items_dispensed}
    //     Items Burnt: ${machineData.items_burnt}
    //     Burning Cycles: ${machineData.burning_cycles}
    //     On Since: ${new Date(machineData.on_since).toLocaleString()}`);
    //   } else {
    //     alert('Machine data not found!');
    //   }
    // } else {
    //   alert('Machine identifier not found!');
    // }
  }}
>
  View
</button>

                      </td>
                    );
                  }

                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>


      <div className="pagination">

        <div className="pageindex-div">
          <strong className="show-entries">
            <p4 className="show-entries" >Showing page</p4>    {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>

        <div className="pagination-div">
          <ReactPaginate
            pageCount={Math.ceil(filteredData.length / dataLimit)}
            onPageChange={({ selected }) => gotoPage(selected)}
            containerClassName={'react-paginate'}
            activeClassName={'selected'}
            previousLabel={'Previous'}
            breakLabel="..."
            nextLabel={'Next'}
            disabledClassName={'disabled'}
          />

        </div>
      </div>
    </div>
  )
}

export default ResponsiveTable

