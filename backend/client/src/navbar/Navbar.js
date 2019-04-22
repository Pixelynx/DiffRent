import React from 'react';
import { NavLink } from 'react-router-dom';
import Tickets from '../TenantDash/tickets.jsx';
import logo from "../logo/DiffRent_logo_official.png";
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
  const { isLoggedIn, toggleNavbar, logoutButton } = props;
  console.log("loggedIn:", isLoggedIn)
  return(
    <>
      { isLoggedIn ?

          toggleNavbar ?
          <nav>
            <div>
              <ul>
                <li><NavLink to={"/"}><img className='logo_official' src={logo} style={styles} /> </NavLink></li>
                <li><NavLink to={"/inbox"}> Inbox </NavLink></li>
                <li><NavLink to={`/landlord/profile/2`}> Profile </NavLink></li>
                <li><NavLink to={"/about"}>About </NavLink></li>
                <li><NavLink to={"/faq"}>FAQ </NavLink></li>
                {logoutButton}
              </ul>
            </div>
          </nav> : null
        :null
      }
    </>
  )
}

export default NavBar;
