import React from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Tickets from '../TenantDash/tickets.jsx';
import logo from "../logo/DiffRent_logo_official.png";
import '../styles/navBar.css';
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
  const { isLoggedIn, toggleNavbar, logoutButton, user } = props;
//   console.log("loggedIn:", isLoggedIn)
//   return(
//     <>
//       { isLoggedIn ?
//
//           toggleNavbar ?
//           <nav>
//             <div className='nav'>
//               <ul>
//                 <li><NavLink to={"/"}><img className='logo_official' src={logo} style={styles} /> </NavLink></li>
//                 <li class="far fa-comments"><NavLink to={"/inbox"}>  Inbox </NavLink></li>
//                 <br/>
//                 <li class="far fa-user"><NavLink to={`/landlord/profile/${user.userid}`}> Profile </NavLink></li>
//                 <br/>
//                 <li class="fas fa-info-circle"><NavLink to={"/about"}>About </NavLink></li>
//                 <br/>
//                 <li class="far fa-question-circle"><NavLink to={"/faq"}>FAQ </NavLink></li>
//                 <br/>
//                 {logoutButton}
//               </ul>
//             </div>
//           </nav> : null
//         :null
//       }
//     </>
//   )
// }

// import React from 'react';
//
// import { Router, Route, Switch } from 'react-router-dom'
// // Be sure to include styles at some point, probably during your bootstraping
// // import '@trendmicro/react-sidenav/dist/react-sidenav.css';


  return (
    <>
    { isLoggedIn ?

              toggleNavbar ?
              <nav>
                <div className='nav'>
    <SideNav
        onSelect={(selected) => {

        }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="inbox">
                <NavIcon>
                    <li class="far fa-comments"><NavLink to={"/inbox"}> </NavLink></li>
                </NavIcon>
                <NavText>
                    Inbox
                </NavText>
            </NavItem>
            <NavItem eventKey="profile">
                <NavIcon>
                    <li class="far fa-user"><NavLink to={`/landlord/profile/${user.userid}`}></NavLink></li>
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
            </NavItem>
            <NavItem eventKey="logout">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    {logoutButton}
                </NavText>
            </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
      </nav> : null
          :null
        }
      </>
  );





}



export default NavBar;
