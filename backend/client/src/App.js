import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../src/navbar/Navbar';
import LandlordDash from './LandlordsDash/LandlordDash.js';
import TenantDash from './TenantDash/TenantDash.js';
import Tickets from './tickets/tickets.jsx';
import AuthForm from "./login/AuthForm";
import Auth from "./utils/Auth";
import Homepage from './components/Homepage';
import Thread from './inbox/thread';
import PrivateRoute from "./utils/AuthRouting";
import './styles/index.css';

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
    const { isLoggedIn, user } = this.state;

    let logoutButton = isLoggedIn ? <button onClick={this.logoutUser}>Logout</button> : null;

    // if (user){
    //   debugger
    // if (user.type || isLoggedIn === 'landlord'){
    //   debugger
    //     return <Redirect to={`/landlord/${user.id}`} />
    //   } else if (isLoggedIn && user.type === 'tenant'){
    //     return <Redirect to='/tenant/:id' />
    //   }

    // }

    return (
      <div className="App">
        <>
          <Navbar isLoggedIn={isLoggedIn}/>
          {logoutButton}
          <Switch>
            <Route path="/landlords/login" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                );
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
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route path="/tenants/register" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route exact path='/landlord/:id' component={LandlordDash} />
            <Route exact path='/tenant/:id' component={TenantDash} />
            <Route exact path='/' component={Homepage} />
            <Route exact path='/message' component={Thread} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;
