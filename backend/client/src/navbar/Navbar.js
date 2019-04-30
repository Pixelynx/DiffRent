import React from 'react';
import { NavLink } from 'react-router-dom';
import Tickets from '../TenantDash/tickets.jsx';
import logo from "../logo/DiffRent_logo_official.png";
import '../styles/navBar.css';
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
  const { isLoggedIn, toggleNavbar, logoutButton, user } = props;
  console.log("loggedIn:", isLoggedIn)
  return(
    <>
      { isLoggedIn ?

          toggleNavbar ?
          <nav>
            <div className='nav'>
              <ul>
                <li><NavLink to={"/"}><img className='logo_official' src={logo} style={styles} /> </NavLink></li>
                <li class="far fa-comments"><NavLink to={"/inbox"}>  Inbox </NavLink></li>
                <br/>
                <li class="far fa-user"><NavLink to={`/landlord/profile/${user.userid}`}> Profile </NavLink></li>
                <br/>
                <li class="fas fa-info-circle"><NavLink to={"/about"}>About </NavLink></li>
                <br/>
                <li class="far fa-question-circle"><NavLink to={"/faq"}>FAQ </NavLink></li>
                <br/>
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
