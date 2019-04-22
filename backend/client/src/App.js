
import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../src/navbar/Navbar';
import LandlordDash from './LandlordsDash/LandlordDash.js';
import TenantDash from './TenantDash/TenantDash.js';
import AuthForm from "./login/AuthForm";
import Tickets from './TenantDash/tickets.jsx';
import Auth from "./utils/Auth";
import Homepage from './components/Homepage';
import Inbox from './inbox/inbox';
import Thread from './inbox/thread';

import PrivateRoute from "./utils/AuthRouting";
import './styles/index.css';

class App extends Component {
  state = {
    navbar: false,
    isLoggedIn: false,
    user: ''
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    axios.post("/users/isLoggedIn")
    .then((user) => {
      if (user.data.username === Auth.getToken()) {
        if (user.data.username !== null)
          {return this.setState({
            isLoggedIn: Auth.isUserAuthenticated(),
          })
            &
            this.getUserInfo2(user.data.username)
          }
      } else {
        if (user.data.username) {
          this.logoutUser();
        } else {
          Auth.deauthenticateUser();
        }
      }
    });
  };

  getUserInfo = (email) => {
    axios.get('/users/'+ email)
    .then((res) => {
      this.setState({
        user: res.data.data
      })
    })
  }

  getUserAptInfo = (email) => {
    axios.get('/users/apt/'+ email)
    .then((res) => {
      this.setState({
        user: res.data.data
      })
    })
  }

  getUserInfo2 = (user) => {
    if(!this.state.user){
      return this.getUserAptInfo(user)} else if (!this.state.user) {
        return this.getUserInfo(user)
      }
  }

  toggleNavbar = (e) => {
    this.setState({
      navbar: !this.state.navbar
    })
  }


  logoutUser = () => {
    axios
      .post("/users/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.setState({
          user: '',
          isLoggedIn: false
        })
      })
      .then(() => {
        this.checkAuthenticateStatus();
      });
  };


  render() {
    const { isLoggedIn, user, navbar } = this.state;
    console.log('STATE',this.state)

    let logoutButton = isLoggedIn ? <button onClick={this.logoutUser}>Logout</button> : null;

    return (
      <div className="App">
        <>
          <div

          className={navbar ? "openNavbar" : "closedNavbar"}
          onMouseEnter={this.toggleNavbar} onMouseLeave={this.toggleNavbar}
          >
            {isLoggedIn ? <div >=</div> : null}
          <div >
          {navbar ? <Navbar isLoggedIn={isLoggedIn} toggleNavbar={this.toggleNavbar} logoutButton={logoutButton} user={user}/>: null}
          </div>
          </div>
          <Switch>
            <Route path="/landlords/login" render={() => {
                return !user ? <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                    : <Redirect to={`/landlord/${user.userid}`}/>
              }}
            />
            <Route path="/landlords/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/login" render={() => {
               return !user ? <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                    : <Redirect to={`/tenant/${user.userid}`}/>
              }}
            />
            <Route path="/tenants/register" render={() => {
                return !user ? <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                    : <Redirect to={`/tenants/${user.userid}`}/>
              }}
            />
            <PrivateRoute path='/tickets' component={Tickets} user={this.state.user} isLoggedIn={isLoggedIn} />
            <PrivateRoute path='/landlord/:id' component={LandlordDash} />
            <PrivateRoute path='/tenant/:id' component={TenantDash} />
            <Route exact path='/' render={() => {
              return !user ? <Homepage />
              : <Redirect to={user.user_type === 'landlord' ? `/landlord/${user.userid}` : `/tenant/${user.userid}`} />
            }} />
            <Route exact path='/inbox' render={() => {
              return(
                  <Inbox
                    tenant_id={this.state.user.tenant_id}
                    landlord_id={this.state.user.landlord_id}
                  />
                )
              }}
            />
            <Route path='/inbox/threads/:thread_id' render={(props) => {
              return(
                <Thread
                  tenant_id={this.state.user.tenant_id}
                  landlord_id={this.state.user.landlord_id}

                />
              )
            }} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;
