import React from 'react'
import DashHome from '../components/DashHome'
import Machinedata from './Machinedata'

function Dashboard() {
  return (
    <div>
        <DashHome/>



         {/* Render Machinedata but keep it hidden */}
      <div style={{ display: 'none' }}>
        <Machinedata />
      </div>

    </div>
  )
}

export default Dashboard