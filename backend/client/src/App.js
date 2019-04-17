import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../src/navbar/Navbar';
import LandlordDash from './LandlordsDash/LandlordDash.js';
import TenantDash from './TenantDash/TenantDash.js';
import Tickets from './tickets/tickets.jsx';
import AuthForm from "./login/AuthForm";
import Auth from "./utils/Auth";
import Homepage from './components/Homepage';
import PrivateRoute from "./utils/AuthRouting";
import './styles/index.css';
import { isNull } from 'util';

class App extends Component {
  state = {
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
            this.getUserInfo(user.data.username)  
          }
        this.setState({
          isLoggedIn: Auth.isUserAuthenticated(),
          username: Auth.getToken(),
        })
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
    debugger
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
        user: res.data
      })
    })
  }


  logoutUser = () => {
    axios
      .post("/users/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.checkAuthenticateStatus();
      });
  };


  render() {
    const { isLoggedIn } = this.state;
    let logoutButton = isLoggedIn ? <button onClick={this.logoutUser}>Logout</button> : null;
    return (
      <div className="App">
        <>
          <Navbar/>
          {logoutButton}
          <Switch>
            <Route path="/landlords/login" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/landlords/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/login" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route exact path='/landlord/:id' component={LandlordDash} />
            <Route exact path='/tenant/:id' component={TenantDash} />
            <Route exact path='/' component={Homepage} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;
