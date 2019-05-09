import React from 'react';
import { Link, NavLink, Route, Router, Switch, withRouter } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import Tickets from '../TenantDash/tickets.jsx';
import logo from "../logo/DiffRent_logo_official.png";
import '../styles/navBar.css';
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
  const { isLoggedIn, toggleNavbar, logoutButton, user, logoutFunc } = props;
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
//                 <li className="far fa-comments"><NavLink to={"/inbox"}>  Inbox </NavLink></li>
//                 <br/>
//                 <li className="far fa-user"><NavLink to={`/landlord/profile/${user.userid}`}> Profile </NavLink></li>
//                 <br/>
//                 <li className="fas fa-info-circle"><NavLink to={"/about"}>About </NavLink></li>
//                 <br/>
//                 <li className="far fa-question-circle"><NavLink to={"/faq"}>FAQ </NavLink></li>
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

const profileURL = `/${user.user_type}/profile/${user.userid}`
  return (
    <>
    { isLoggedIn ?

        <div className='navbar'>
              <nav>
                <div className='nav'>
    <SideNav className='sidenav'
        onSelect={(selected) => {
          console.log('I WAS SELECTED?', selected)
          props.history.push(selected);
        }}
    >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="/">
                <NavIcon>
                    <li><img className='logo_official' src={logo} style={styles} /></li><NavLink to="/"></NavLink>
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="/inbox">
                <NavIcon>
                    <li className="far fa-comments"><NavLink to="/inbox"> </NavLink></li>
                </NavIcon>
                <NavText>
                    Inbox
                </NavText>
            </NavItem>
            <NavItem eventKey={profileURL}>
                <NavIcon>
                    <li className="far fa-user"><NavLink to={`/${user.user_type}/profile/${user.userid}`}></NavLink></li>
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
            </NavItem>
            <NavItem eventKey="/about">
                <NavIcon>
                  <li className="fas fa-info-circle"><NavLink to={"/about"}></NavLink></li>
                </NavIcon>
                <NavText>
                    About
                </NavText>
            </NavItem>
            <NavItem eventKey="/faq">
                <NavIcon>
                    <li className="far fa-question-circle"><NavLink to={"/faq"}></NavLink></li>
                </NavIcon>
                <NavText>
                    FAQ
                </NavText>
            </NavItem>
            <NavItem onClick={() => logoutFunc()} eventKey="/logout">
                <NavIcon>
                    <li className="fas fa-sign-out-alt"><NavLink to={"/"}></NavLink></li>
                </NavIcon>
                <NavText>
                    {logoutButton}
                </NavText>
            </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
      </nav>
    </div>
          :null
        }
      </>
  );

}



export default withRouter(NavBar);
