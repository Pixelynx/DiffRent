import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import LandlordDash from './LandlordsDash/LandlordDash.js'
import Tickets from './tickets/tickets.jsx';
import AuthForm from "./login/AuthForm";
import Auth from "./utils/Auth";
import PrivateRoute from "./utils/AuthRouting";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: "",
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    axios.get("/users/isLoggedIn").then(user => {
      if (user.data.username === Auth.getToken()) {
        this.setState({
          isLoggedIn: Auth.isUserAuthenticated(),
          username: Auth.getToken()
        });
      } else {
        if (user.data.username) {
          this.logoutUser();
        } else {
          Auth.deauthenticateUser();
        }
      }
    });
  };

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
    return (
      <div className="App">
        <>
          <h3>Team 3!</h3>
          <Switch>
            <Route path="/auth" render={() => {
                return (<AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    isLoggedIn={isLoggedIn}/>
                );
              }}
            />
            <Route exact path='/landlord/:id' component={LandlordDash} />
          </Switch>
          <Tickets />
        </>
      </div>
    );
  }
}

export default App;
