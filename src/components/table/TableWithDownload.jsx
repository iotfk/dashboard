import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import './tablewithdwnld.css';
import './printStyles.css';
import * as XLSX from 'xlsx';
import { MachineContext } from '../../hooks/ContextAPI/MachineContext';
import ReactToPrint from 'react-to-print';
import PrintTable from './PrintTable'; // Import the PrintTable component

const API = "https://mcuconnect.com/dashboard-api/machines";

const getCurrentTime = () => new Date().toLocaleTimeString();

function TableWithDownload() {

    const [filteredMachineData, setFilteredMachineData] = useState([]);
    const [fetchAllMachines, setFetchAllMachines] = useState([]);
    const [currentTime, setCurrentTime] = useState(getCurrentTime());
    const printRef = useRef();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    const {
        isToggled,
        setIsToggled,
        startDate,
        endDate,
        dropDownMachineNames,
        dropDownWardNames,
        dropDownZoneNames,
        setDropDownZoneNames,
        dropDownBeatNames,
        setDropDownBeatNames,
        alertMachineData,
        iSelectedMachines
    } = useContext(MachineContext);

    useEffect(() => {
        fetchMachines(API);
    }, []);

    const fetchMachines = async (url) => {
        try {
            const res = await fetch(url);
            const machines = await res.json();
            setFetchAllMachines(machines);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredMachineJson = useMemo(() => {
        if (!fetchAllMachines.length) {
            return [];
        }

        const lowerCaseDropDownMachineNames = iSelectedMachines.map(name => name.toLowerCase());
        const lowerCaseDropDownZoneNames = dropDownZoneNames.map(zone => zone.toLowerCase());
        const lowerCaseDropDownWardNames = dropDownWardNames.map(ward => ward.toLowerCase());
        const lowerCaseDropDownBeatNames = dropDownBeatNames.map(beat => beat.toLowerCase());

        let filteredData = fetchAllMachines;
        if (dropDownZoneNames.length && !dropDownZoneNames.includes('all')) {
            filteredData = filteredData.filter(machine =>
                lowerCaseDropDownZoneNames.includes(machine.zone_name.toLowerCase())
            );
        }
        if (dropDownWardNames.length && !dropDownWardNames.includes('all')) {
            filteredData = filteredData.filter(machine =>
                lowerCaseDropDownWardNames.includes(machine.ward_name.toLowerCase())
            );
        }
        if (dropDownBeatNames.length && !dropDownBeatNames.includes('all')) {
            filteredData = filteredData.filter(machine =>
                lowerCaseDropDownBeatNames.includes(machine.beat_name.toLowerCase())
            );
        }
        if (iSelectedMachines.length) {
            filteredData = filteredData.filter(machine =>
                lowerCaseDropDownMachineNames.includes(machine.serial_number.toLowerCase())
            );
        }

        return filteredData;
    }, [fetchAllMachines, iSelectedMachines, dropDownZoneNames, dropDownWardNames, dropDownBeatNames]);

    useEffect(() => {
        setFilteredMachineData(filteredMachineJson);
    }, [filteredMachineJson]);

    const downloadExcel = () => {
        const table = document.getElementById("data-table");
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });

        workbook.Sheets["Sheet 1"]["!cols"] = [
            { wpx: 50 },
            { wpx: 100 },
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 }
        ];

        XLSX.writeFile(workbook, "machines_data.xlsx");
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        try {
            return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date));
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'N/A';
        }
    };

 // Ensure startDate and endDate are defined before formatting
 const reportPeriodStart = startDate ? formatDate(startDate) : 'N/A';
 const reportPeriodEnd = endDate ? formatDate(endDate) : 'N/A';


    return (
        <div>
            <button onClick={downloadExcel}>Download as Excel</button>
            <ReactToPrint
                trigger={() => <button>Print Table</button>}
               content={() => printRef.current}
            />
            <div id="print-table"
            //  style={{ display: 'none'}}
              >
                <PrintTable
                    ref={printRef}
                    filteredMachineData={filteredMachineData}
                    totalMachines={filteredMachineData.length}
                    dropDownZoneNames={dropDownZoneNames}
                    dropDownWardNames={dropDownWardNames}
                    dropDownBeatNames={dropDownBeatNames}
                    reportGeneratedDate={new Date().toLocaleDateString()}
                    currentTime={currentTime}
                    reportPeriodStart={reportPeriodStart}
                    reportPeriodEnd={reportPeriodEnd}
                    isToggled={isToggled}
                />
            </div>
           
        </div>
    );
}

export default TableWithDownload;
