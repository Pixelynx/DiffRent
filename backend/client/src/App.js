import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Navbar from "../src/navbar/Navbar";
import LandlordDash from "./LandlordsDash/LandlordDash.js";
import TenantDash from "./TenantDash/TenantDash.jsx";
import AuthForm from "./login/AuthForm";
import Tickets from "./TenantDash/tickets.jsx";
import Auth from "./utils/Auth";
import Homepage from "./components/Homepage";
import Threads from "./inbox/threads";
import ThreadItem from "./inbox/threadItem";
import Profile from "./profiles/Profile.js";
import { View } from './inbox/view';

import PrivateRoute from "./utils/AuthRouting";
import "./styles/index.css";
import AddApartment from "./LandlordsDash/addApartment";
import { addISOWeekYears } from "date-fns/esm";
import searchApartment from "./TenantDash/searchApartment";

const NoMatch = () => <h1>404</h1>;

class App extends Component {
  state = {
    navbar: false,
    isLoggedIn: false,
    user: '',
    tenant: ''
  };

  componentDidMount() {
    this.checkAuthenticateStatus();
  }

  checkAuthenticateStatus = () => {
    const { isLoggedIn } = this.state;
    axios.post("/users/isLoggedIn")
    .then(user => {
      if (user.data.username === Auth.getToken()) {
        if (user.data.username !== null) {
          return (
            this.setState({
              isLoggedIn: Auth.isUserAuthenticated()
            }, () => this.getUserInformation(user.data.username)) 
          );
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


  getUserInformation = email => {
    const { user } = this.state;
    if (!user) { return this.getUserAptInfo(email) }
    if (!user) { return this.getUserInfo(email) }
    }

  getUserInfo = email => {
    axios.get("/users/" + email)
    .then(res => {
      this.setState({
        user: res.data.data,
      });
    });
  };

  getUserAptInfo = email => {
    axios.get("/users/apt/" + email)
    .then(res => {
      this.setState({
        user: res.data.data,
      });
    })
    .then(() => {
      if (this.state.user.aptid){
        return this.getTenantInfo(this.state.user.aptid)
      }
    })
  };

  getTenantInfo = (aptid) => {
    axios.get(`/apartments/tenant/${aptid}`)
    .then((res) => {
      this.setState({
        tenant: res.data.apartment
      })
    })
  }

  toggleNavbar = e => {
    this.setState({
      navbar: !this.state.navbar,
    });
  };

  logoutUser = () => {
    axios
      .post("/users/logout")
      .then(() => {
        Auth.deauthenticateUser();
      })
      .then(() => {
        this.setState({
          user: "",
          isLoggedIn: false,
        });
      })
      .then(() => {
        this.checkAuthenticateStatus();
        this.props.history.push("/")
      });
  };

  render() {
    const { isLoggedIn, user, navbar } = this.state;
    console.log("STATE", this.state.user);
    console.log("$$loggedIn", isLoggedIn)
    let logoutButton = isLoggedIn ? (
      <button onClick={this.logoutUser.bind(this)}>Logout</button>
    ) : null;
    return (
      <div className="App">
        <>
          <div
            className={navbar ? "openNavbar" : "closedNavbar"}
            onMouseEnter={this.toggleNavbar}
            onMouseLeave={this.toggleNavbar}
          >
            {isLoggedIn ? <div className="burgerIcon"><i class="fas fa-bars"></i>
          </div> : null}
            <div>
              {navbar ? (
                <Navbar
                  isLoggedIn={isLoggedIn}
                  toggleNavbar={this.toggleNavbar}
                  logoutButton={logoutButton}
                  user={user}
                />
              ) : null}
            </div>
          </div>
          <Switch>
            <Route
              path="/landlords/login"
              render={() => {
                return !user ? (
                  <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}
                  />
                ) : (
                  <Redirect to={`/landlord/${user.userid}`} />
                );
              }}
            />
            <Route
              path="/tenants/login"
              render={() => {
                return !user ? (
                  <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInfo={this.getUserInfo}
                    getUserAptInfo={this.getUserAptInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}
                  />
                ) : (
                  <Redirect to={`/tenant/${user.userid}`} />
                );
              }}
            />
            <Route
              path="/register"
              render={() => {
                return !user ? (
                  <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserAptInfo={this.getUserAptInfo}
                    getUserInfo={this.getUserInfo}
                    user={user}
                    isLoggedIn={isLoggedIn}
                  />
                ) : (
                  <Redirect
                    to={
                      user.user_type === "tenant"
                        ? `/tenant/${user.userid}`
                        : `/landlord/${user.userid}`
                    }
                  />
                );
              }}
            />
            <PrivateRoute
              path="/landlord/profile/:id"
              user={this.state.user}
              component={Profile}
            />
            <PrivateRoute
              path="/tenant/profile/:id"
              user={this.state.user}
              component={Profile}
            />
            <PrivateRoute
              path="/landlord/:id"
              user={user}
              tenant={this.state.tenant}
              getUserInformation={this.getUserInformation}
              component={ user.aptid ? LandlordDash : AddApartment }
            />
            <PrivateRoute
              path="/tenant/:id"
              user={user}
              getUserInformation={this.getUserInformation}
              component={ user.aptid ? TenantDash : searchApartment }
            />
            <Route
              exact
              path="/"
              render={() => {
                return !user ? (
                  <Homepage />
                ) : (
                  <Redirect
                    to={
                      user.user_type === "landlord"
                        ? `/landlord/${user.userid}`
                        : `/tenant/${user.userid}`
                    }
                  />
                );
              }}
            />
             <Route exact path='/inbox' render={()=><View user={this.state.user} />}/>
             <Route path="/inbox/threads/:id" render={(props) => <ThreadItem {...props} user={this.state.user} />} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </div>
    );
  }
}

export default withRouter(App);
