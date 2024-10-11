import React from 'react';
import { useTable } from 'react-table';
import './ReportTable.css';

const ReportTable = () => {
  // Define columns for the lower table section
  const columns = React.useMemo(
    () => [
      { Header: 'SR. NO.', accessor: 'srNo', className: 'column-srNo' },
      { Header: 'MACHINE ID', accessor: 'machineId', className: 'column-machineId' },
      { Header: 'MACHINE LOCATION', accessor: 'machineLocation', className: 'column-machineLocation' },
      { Header: 'ADDRESS', accessor: 'address', className: 'column-address' },
      { Header: 'MACHINE TYPE', accessor: 'machineType', className: 'column-machineType' },
      {
        Header: 'VENDING',
        columns: [
          { Header: 'DATE', accessor: 'vendingDate', className: 'column-vendingDate' },
          { Header: 'QTY', accessor: 'vendingQty', className: 'column-vendingQty' },
          { Header: 'CASH', accessor: 'vendingCash', className: 'column-vendingCash' },
          { Header: 'ON TIME', accessor: 'vendingOnTime', className: 'column-vendingOnTime' },
        ],
      },
      {
        Header: 'INCINERATOR',
        columns: [
          { Header: 'BURN CYCLES', accessor: 'burnCycles', className: 'column-burnCycles' },
          { Header: 'SAN NAPKINS BURNT', accessor: 'sanNapkinsBurnt', className: 'column-sanNapkinsBurnt' },
        ],
      },
    ],
    []
  );

  // Static data for the lower table section
  const data = React.useMemo(
    () => [
      {
        srNo: 1,
        machineId: 'KE079B089 02884',
        machineLocation: 'Zone: 3\nWard: KE\nBeat: 79',
        address: 'OCT toiletShri sai Siddhi welfare Associaten Hanjar nagar andheri east.',
        machineType: 'Community Toilet',
        vendingDate: '12-Sep-2024',
        vendingQty: 0,
        vendingCash: '₹0',
        vendingOnTime: '0m',
        burnCycles: 0,
        sanNapkinsBurnt: 0,
      },
      {
        srNo: 2,
        machineId: 'PS050B038 02891',
        machineLocation: 'Zone: 4\nWard: PS\nBeat: 50',
        address: 'Shree mahalaxmi samajik seva sanstha Sant nirankari udyan,gmlr Goregaon west',
        machineType: 'Community Toilet',
        vendingDate: '12-Sep-2024',
        vendingQty: 0,
        vendingCash: '₹0',
        vendingOnTime: '0m',
        burnCycles: 0,
        sanNapkinsBurnt: 0,
      },
    ],
    []
  );

  // Create a table instance for the lower section
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="table-container">
      {/* Upper section of the table */}
      <table className="upper-table">
        <tbody>
          {[
            ['PROJECT', 'GROUP', 'NO. OF MACHINES', '200'],
            ['REPORT TYPE', 'GROUP', 'MACHINE LOCATION / ID', ''],
            ['ZONE', 'All', 'NO. OF MACHINES', '200'],
            ['WARD', 'All', 'NO. OF MACHINES', '200'],
            ['BEAT', 'All', 'NO. OF MACHINES', '200'],
            ['REPORT GENERATED', '12-Sep-2024', 'TIME', '12:51 pm'],
            ['REPORT PERIOD', '12-Sep-2024', 'TO', '12-Sep-2024'],
          ].map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Lower section of the table */}
      <table {...getTableProps()} className="report-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.className}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className={cell.column.className}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
