import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import logo from "../logo/DiffRent_logo_official.png";
import '../styles/navBar.css';
let styles = {
    width: '250px',
   height: '180px',
 };

const NavBar = (props) => {
    const { isLoggedIn, logoutButton, user, logoutFunc } = props;
    const profileURL = `/${user.user_type}/profile/${user.userid}`;
    
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
                    <li><img alt='' className='logo_official' src={logo} style={styles} /></li><NavLink to="/"></NavLink>
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
