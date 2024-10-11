// components/charts/PieChartForCard.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';



const COLORS = [ "rgb(56, 255, 159)",  "rgb(255, 46, 46)",];

const PieChartForCard = ({ machinesInstalled, machinesRunning }) => {
    const data = [
        { name: 'Online', value: machinesRunning},
        { name: 'Offline', value: machinesInstalled - machinesRunning},
      ];


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , }}>
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend 
        layout="horizontal" 
        align="center" 
        verticalAlign="bottom" 
        wrapperStyle={{ display: 'flex', justifyContent: 'center' }} 
      />
    </PieChart>
  </div>
  );
};

export default PieChartForCard;
