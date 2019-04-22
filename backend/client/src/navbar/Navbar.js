import React from 'react';
import { NavLink } from 'react-router-dom';
import Tickets from '../tickets/tickets.jsx';
import logo from "../logo/DiffRent_logo_official.png";
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
  const { isLoggedIn } = props;
  return(
    <>
      { isLoggedIn ?
        <nav>
          <div>
            <ul>
              <li><NavLink to={"/"}><img className='logo_official' src={logo} style={styles} /> </NavLink></li>
              <li><NavLink to={"/message"}><img src=<SVG />/>Message </NavLink></li>
              <li><Tickets /></li>
              <li><NavLink to={"/about"}>About </NavLink></li>
              <li><NavLink to={"/faq"}>FAQ </NavLink></li>
            </ul>
          </div>
        </nav> : null}
    </>
  )
}

export default NavBar;
