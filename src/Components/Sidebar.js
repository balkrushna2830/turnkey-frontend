import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './CSS/Sidebar.css'
const SideBar = () => {
    const [navState, setNavState] = useState({
        Dashboard: 'nav__link active',
        Images: 'nav__link',
    })
    return (
        <div className="l-navbar show" id="nav-bar">
            <nav className="nav" style={{ position: 'relative' }}>
                <div>
                    <a className="nav__logo">
                        <span className="nav__logo-name">Turnkey</span>
                    </a>
                    <div className="nav__list">
                        <Link to="/Dashboard"
                            className={navState.Dashboard}
                            onClick={() => {
                                setNavState({
                                    Dashboard: "nav__link active",
                                    Images: "nav__link"
                                });
                            }}
                        >
                            <i className="bx bx-grid-alt nav__icon" />
                            <span className="nav__name">Dashboard</span>
                        </Link>
                        <Link to="/Dashboard/Images"
                            className={navState.Images}
                            onClick={() => {
                                setNavState({
                                    Dashboard: "nav__link",
                                    Images: "nav__link active"
                                });
                            }}
                        >
                            <i className='bx bxs-image nav__icon'></i>
                            <span className="nav__name">Manage Images</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar;