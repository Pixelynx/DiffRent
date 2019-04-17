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

class App extends Component {
  state = {
    isLoggedIn: false,
    id: '',
    username: '',
    type: ''
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    axios.post("/users/isLoggedIn")
    .then((user) => {
      if (user.data.username === Auth.getToken()) {
        this.setState({
          isLoggedIn: Auth.isUserAuthenticated(),
          username: Auth.getToken(),
        })
        // &&

      } else {
        if (user.data.username) {
          this.logoutUser();
        } else {
          Auth.deauthenticateUser();
        }
      }
    });
  };

  getUserInfo = () => {
    axios.get('/users')
    .then((res) => {
      
    })
  }

  type = (text) => {
    debugger
    this.setState({
      id: text.id,
      type: text.user_type
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
    const { isLoggedIn, type } = this.state;
    console.log(type)
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
                    type={this.type}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/landlords/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    type={this.type}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/login" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    type={this.type}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    type={this.type}
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
