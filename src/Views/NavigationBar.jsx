import React from 'react'
import {NavLink} from 'react-router-dom'

function  NavigationBar() {
    return (
        <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container">
                <div className="navbar-header">
                <NavLink exact to="/">PLANNER::</NavLink>
                </div>
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <NavLink exact to="/groupplan">Group Plans</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/teachers">Teachers</NavLink>
                        </li>
                    </ul>
            </div>
        </nav>
        </header>
    )
}

export default NavigationBar;