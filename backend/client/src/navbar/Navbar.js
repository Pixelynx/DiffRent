import React from 'react';
import { NavLink } from 'react-router-dom';
import Tickets from '../tickets/tickets.jsx';

const NavBar = () => {
  return(
    <nav>
      <div>
        <ul>
            <li><NavLink to={"/"}>Home </NavLink></li>
            <li><NavLink to={"/message"}>Message </NavLink></li>
            <li><Tickets /></li>
            <li><NavLink to={"/about"}>About </NavLink></li>
            <li><NavLink to={"/faq"}>FAQ </NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
