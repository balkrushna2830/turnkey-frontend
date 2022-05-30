import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Sidebar'

const Dashboard = () => {
  return (
    <div>
      <SideBar />
      <div style={{ backgroundColor: 'white',minHeight:'100vh',maxHeight:'max-containt'}} >
        <Outlet />
        <br/>
      </div>
    </div>
  )
}

export default Dashboard