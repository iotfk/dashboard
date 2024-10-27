import React, { useState } from "react";
import logo from './logo.jpeg';

import {
    FaBars,
    FaCommentAlt,
    FaTh,
    FaThList,
    FaUserAlt,
    FaSignOutAlt // Import a logout icon
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated'); // Clear authentication status
        navigate('/'); // Redirect to the login page
        window.location.reload(); // Optional: Reload the page
    };

    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/machinedata",
            name: "Machine Data",
            icon: <FaThList />
        },
        {
            path: "/machinemap",
            name: "Machine Map",
            icon: <FaCommentAlt />
        },
        {
            path: "/reports",
            name: "Reports",
            icon: <FaUserAlt />
        },
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? "258px" : "50px" }} className="sidebar">
                <div className="top_section">
                    {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">RealZest</h1> */}

                    <img 
                        src={logo}
                        alt="Logo" 
                        style={{ display: isOpen ? "block" : "none", width: "115%", marginLeft: "-15px", marginTop:"-20px"}} 
                        className="logo" 
                    />

                    <div style={{ marginLeft: isOpen ? "190px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                <div style={{ marginTop: "auto", padding: "10px 0" }}> {/* Adds spacing */}
                    <div
                        className="link"
                        onClick={handleLogout} // Call action for logout
                    >
                        <div className="icon"><FaSignOutAlt /></div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Log Out</div>
                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}

export default Sidebar;
