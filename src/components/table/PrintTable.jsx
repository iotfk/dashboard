// PrintTable.js
import React from 'react';

const PrintTable = React.forwardRef((props, ref) => (
    <div ref={ref}>
        
        <table id="data-table">
            <thead>
                <tr>
                    <th colSpan="3">Project</th>
                    <td colSpan="2"></td>
                    <th colSpan="4">Number Of Machines</th>
                    <td colSpan="2">{props.totalMachines}</td>
                </tr>
                <tr>
                    <th colSpan="3">Report Type:</th>
                    <td colSpan="2">{props.isToggled ? "Totals Only" : "Group"}</td>
                    <th colSpan="4">Machine Location</th>
                    <td colSpan="2">Undefined</td>
                </tr>
                <tr>
                    <th colSpan="3">Zone</th>
                    <td colSpan="2">{props.dropDownZoneNames.join(', ') || 'All'}</td>
                    <th colSpan="4">Number Of Machines</th>
                    <td colSpan="2">{props.totalMachines}</td>
                </tr>
                <tr>
                    <th colSpan="3">Ward</th>
                    <td colSpan="2">{props.dropDownWardNames.join(', ') || 'All'}</td>
                    <th colSpan="4">Number Of Machines</th>
                    <td colSpan="2">{props.totalMachines}</td>
                </tr>
                <tr>
                    <th colSpan="3">Beat</th>
                    <td colSpan="2">{props.dropDownBeatNames.join(', ') || 'All'}</td>
                    <th colSpan="4">Number Of Machines</th>
                    <td colSpan="2">{props.totalMachines}</td>
                </tr>
                <tr>
                    <th colSpan="3">Report Generated</th>
                    <td colSpan="2">{props.reportGeneratedDate}</td>
                    <th colSpan="4">Time:</th>
                    <td colSpan="2">{props.currentTime}</td>
                </tr>
                <tr>
                    <th colSpan="3">Report Period</th>
                    <td colSpan="2">{props.reportPeriodStart} </td>
                    <th colSpan="4">To:</th>
                    <td colSpan="2"> {props.reportPeriodEnd} </td>
                </tr>
                <tr>
                    <th>Slno</th>
                    <th>Serial Number</th>
                    <th>Machine Location</th>
                    <th>Address</th>
                    <th>Machine Type</th>
                    <th>Date</th>
                    <th>Quantity</th>
                    <th>Cash</th>
                    <th>On Time</th>
                    <th>Burning Cycle</th>
                    <th>San Napkin</th>
                </tr>
            </thead>
            <tbody>
                {props.filteredMachineData.map((machine, index) => (
                    <React.Fragment key={machine.machine_id}>
                        <tr>
                            <td rowSpan="2">{index + 1}</td>
                            <td rowSpan="2">{machine.serial_number || "N/A"}</td>
                            <td rowSpan="2">{`Zone:${machine.zone_name || "N/A"}, Ward:${machine.ward_name || "N/A"}, Beat:${machine.beat_name || "N/A"}`}</td>
                            <td rowSpan="2">N/A</td> {/* Address placeholder */}
                            <td rowSpan="2">Community Toilet</td> {/* Machine Type placeholder */}
                            <td>{new Date(machine.on_since).toLocaleDateString() || "N/A"}</td>
                            <td>{machine.items_dispensed || "N/A"}</td>
                            <td>{machine.collection || "N/A"}</td>
                            <td>{machine.on_time || "N/A"}</td>
                            <td>{machine.burning_cycles || "N/A"}</td>
                            <td>{machine.items_burnt || "N/A"}</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>{machine.items_dispensed || "N/A"}</td>
                            <td>{machine.collection || "N/A"}</td>
                            <td>{machine.on_time || "N/A"}</td>
                            <td>{machine.burning_cycles || "N/A"}</td>
                            <td>{machine.items_burnt || "N/A"}</td>
                        </tr>
                    </React.Fragment>
                ))}
                <tr>
                    <th colSpan={6} rowSpan={2}>Total</th>
                    <td> N/A</td>
                    <td> N/A</td>
                    <td> N/A</td>
                    <td> N/A</td>
                    <td> N/A</td>
                </tr>
            </tbody>
        </table>
    </div>
));

export default PrintTable;


// import React from 'react';

// const PrintTable = React.forwardRef((props, ref) => (
//     <div ref={ref}>
//         <div className="print-metadata">
//             <table>
//                 <thead>
//                     <tr>
//                         <th colSpan="3">Project</th>
//                         <td colSpan="2"></td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Type:</th>
//                         <td colSpan="2">{props.isToggled ? "Totals Only" : "Group"}</td>
//                         <th colSpan="4">Machine Location</th>
//                         <td colSpan="2">ALL</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Zone</th>
//                         <td colSpan="2">{props.dropDownZoneNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Ward</th>
//                         <td colSpan="2">{props.dropDownWardNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Beat</th>
//                         <td colSpan="2">{props.dropDownBeatNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Generated</th>
//                         <td colSpan="2">{props.reportGeneratedDate}</td>
//                         <th colSpan="4">Time:</th>
//                         <td colSpan="2">{props.currentTime}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Period</th>
//                         <td colSpan="2">{props.reportPeriodStart}</td>
//                         <th colSpan="4">To:</th>
//                         <td colSpan="2">{props.reportPeriodEnd}</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>

//         <div className="page-break"></div>

//         <table id="data-table">
//             <thead>
//                 <tr>
//                     <th>Slno</th>
//                     <th>Serial Number</th>
//                     <th>Machine Location</th>
//                     <th>Address</th>
//                     <th>Machine Type</th>
//                     <th>Date</th>
//                     <th>Quantity</th>
//                     <th>Cash</th>
//                     <th>On Time</th>
//                     <th>Burning Cycle</th>
//                     <th>San Napkin</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.filteredMachineData.map((machine, index) => (
//                     <React.Fragment key={machine.machine_id}>
//                         <tr>
//                             <td rowSpan="2">{index + 1}</td>
//                             <td rowSpan="2">{machine.serial_number || "N/A"}</td>
//                             <td rowSpan="2">{`Zone:${machine.zone_name || "N/A"}, Ward:${machine.ward_name || "N/A"}, Beat:${machine.beat_name || "N/A"}`}</td>
//                             <td rowSpan="2">N/A</td> {/* Address placeholder */}
//                             <td rowSpan="2">Community Toilet</td> {/* Machine Type placeholder */}
//                             <td>{new Date(machine.on_since).toLocaleDateString() || "N/A"}</td>
//                             <td>{machine.items_dispensed || "N/A"}</td>
//                             <td>{machine.collection || "N/A"}</td>
//                             <td>{machine.on_time || "N/A"}</td>
//                             <td>{machine.burning_cycles || "N/A"}</td>
//                             <td>{machine.items_burnt || "N/A"}</td>
//                         </tr>
//                         <tr>
//                             <th>Total</th>
//                             <td>{machine.items_dispensed || "N/A"}</td>
//                             <td>{machine.collection || "N/A"}</td>
//                             <td>{machine.on_time || "N/A"}</td>
//                             <td>{machine.burning_cycles || "N/A"}</td>
//                             <td>{machine.items_burnt || "N/A"}</td>
//                         </tr>
//                     </React.Fragment>
//                 ))}
//                 <tr>
//                     <th colSpan={6} rowSpan={2}>Total</th>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// ));

// export default PrintTable;

// import React from 'react';

// const PrintTable = React.forwardRef((props, ref) => (
//     <div ref={ref}>
//         {/* Metadata visible only on the first page */}
//         <div className="print-metadata">
//             <table  id="data-table">
//                 <thead>
//                     <tr>
//                         <th colSpan="3">Project</th>
//                         <td colSpan="2"></td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Type:</th>
//                         <td colSpan="2">{props.isToggled ? "Totals Only" : "Group"}</td>
//                         <th colSpan="4">Machine Location</th>
//                         <td colSpan="2">ALL</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Zone</th>
//                         <td colSpan="2">{props.dropDownZoneNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Ward</th>
//                         <td colSpan="2">{props.dropDownWardNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Beat</th>
//                         <td colSpan="2">{props.dropDownBeatNames.join(', ') || 'All'}</td>
//                         <th colSpan="4">Number Of Machines</th>
//                         <td colSpan="2">{props.totalMachines}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Generated</th>
//                         <td colSpan="2">{props.reportGeneratedDate}</td>
//                         <th colSpan="4">Time:</th>
//                         <td colSpan="2">{props.currentTime}</td>
//                     </tr>
//                     <tr>
//                         <th colSpan="3">Report Period</th>
//                         <td colSpan="2">{props.reportPeriodStart}</td>
//                         <th colSpan="4">To:</th>
//                         <td colSpan="2">{props.reportPeriodEnd}</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>

//         <div className="page-break"></div>

//         {/* Table content starts here */}
//         <table id="data-table">
//             <thead>
//                 <tr>
//                     <th>Slno</th>
//                     <th>Serial Number</th>
//                     <th>Machine Location</th>
//                     <th>Address</th>
//                     <th>Machine Type</th>
//                     <th>Date</th>
//                     <th>Quantity</th>
//                     <th>Cash</th>
//                     <th>On Time</th>
//                     <th>Burning Cycle</th>
//                     <th>San Napkin</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {props.filteredMachineData.map((machine, index) => (
//                     <React.Fragment key={machine.machine_id}>
//                         <tr>
//                             <td rowSpan="2">{index + 1}</td>
//                             <td rowSpan="2">{machine.serial_number || "N/A"}</td>
//                             <td rowSpan="2">{`Zone:${machine.zone_name || "N/A"}, Ward:${machine.ward_name || "N/A"}, Beat:${machine.beat_name || "N/A"}`}</td>
//                             <td rowSpan="2">N/A</td> {/* Address placeholder */}
//                             <td rowSpan="2">Community Toilet</td> {/* Machine Type placeholder */}
//                             <td>{new Date(machine.on_since).toLocaleDateString() || "N/A"}</td>
//                             <td>{machine.items_dispensed || "N/A"}</td>
//                             <td>{machine.collection || "N/A"}</td>
//                             <td>{machine.on_time || "N/A"}</td>
//                             <td>{machine.burning_cycles || "N/A"}</td>
//                             <td>{machine.items_burnt || "N/A"}</td>
//                         </tr>
//                         <tr>
//                             <th>Total</th>
//                             <td>{machine.items_dispensed || "N/A"}</td>
//                             <td>{machine.collection || "N/A"}</td>
//                             <td>{machine.on_time || "N/A"}</td>
//                             <td>{machine.burning_cycles || "N/A"}</td>
//                             <td>{machine.items_burnt || "N/A"}</td>
//                         </tr>
//                     </React.Fragment>
//                 ))}
//                 <tr>
//                     <th colSpan={6} rowSpan={2}>Total</th>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                     <td>N/A</td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// ));

// export default PrintTable;
