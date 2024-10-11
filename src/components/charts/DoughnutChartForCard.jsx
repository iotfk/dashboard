// components/charts/DonutChartForCard.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

// const data = [
//   { name: 'Ok', value: stockOk },
//   { name: 'Low', value: 7 },
//   { name: 'Empty', value: 3 },
//   { name: 'Error', value: 7 },
// ];

const COLORS = [
   "rgb(56, 255, 159)",
  "rgb(255, 215, 64)",
  "rgb(255, 82, 82)",
  "#4b42f5",];

const CustomLegend = (props) => {
  const { payload } = props; // Get the legend data
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} style={{ margin: '0 10px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: entry.color }}></div>
          <span style={{ marginLeft: '5px' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChartForCard = ({ stockEmpty, stockLow, stockError, stockOk }) => {

  const data = [
    { name: 'Ok', value: stockOk },
    { name: 'Low', value: stockLow, },
    { name: 'Empty', value: stockEmpty },
    { name: 'Error', value: stockError },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '9px' }}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}  // Set inner radius for doughnut shape
          outerRadius={70}  // Outer radius stays the same
          labelLine={false}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        /> */}

<Legend content={<CustomLegend />} />

      </PieChart>
    </div>
  );
};

export default DonutChartForCard;
