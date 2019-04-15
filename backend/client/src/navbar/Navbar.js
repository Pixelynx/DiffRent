import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <nav>
      <div>
        <ul>
          <li><NavLink to={"/"}>Home </NavLink></li>
          <li><NavLink to={"/message"}>Message </NavLink></li>
          <li><NavLink to={"/tickets"}>Tickets </NavLink></li>
          <li><NavLink to={"/about"}>About </NavLink></li>
          <li><NavLink to={"/faq"}>FAQ </NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;