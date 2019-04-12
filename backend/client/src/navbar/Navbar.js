import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <nav>
      <div>
        <ul>
          <li><NavLink to={"/"}></NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;