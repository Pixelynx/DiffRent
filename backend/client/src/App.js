import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import Navbar from "../src/navbar/Navbar";
import LandlordDash from "./LandlordsDash/LandlordDash.js";
import TenantDash from "./TenantDash/TenantDash.jsx";
import AuthForm from "./login/AuthForm";
import Auth from "./utils/Auth";
import Homepage from "./components/Homepage/Homepage";
import ThreadItem from "./inbox/threadItem";
import Profile from "./profiles/Profile.js";
import { View } from './inbox/view';
import { FAQ } from './faqs/faq.js';

import PrivateRoute from "./utils/AuthRouting";
import "./styles/index.css";
import AddApartment from "./LandlordsDash/addApartment";
import searchApartment from "./TenantDash/searchApartment";
import About from "./components/About/About";

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
    axios.get("/users/" + email)
      .then(res => {
        this.setState({
          user: res.data.data,
        });
      })
      .then(() => {
        if (this.state.user.aptid) {
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
    let logoutButton = isLoggedIn ? (
      <div onClick={this.logoutUser.bind(this)}>Logout</div>
    ) : null;
    return (
      <div className="App">
        <>
          <div
            className={navbar ? "openNavbar" : "closedNavbar"}

          >

            <div>

              <Navbar
                isLoggedIn={isLoggedIn}
                toggleNavbar={this.toggleNavbar}
                logoutButton={logoutButton}
                logoutFunc={this.logoutUser}
                user={user}
              />

            </div>
          </div>
          <Switch>
            <Route
              path="/landlords/login"
              render={() => {
                return !user ? (
                  <AuthForm
                    checkAuthenticateStatus={this.checkAuthenticateStatus}
                    getUserInformation={this.getUserInformation}
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
                    getUserInformation={this.getUserInformation}
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
                    getUserInformation={this.getUserInformation}
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
            <Route
              path='/about'
              render={(props) => { return user ? <About /> : <Redirect to='/' /> }}
            />
            <Route
              path="/addApartment"
              render={(props) => {
                return user ? !user.aptid ? <AddApartment user={user}
                  getUserInformation={this.getUserInformation} />
                  : <Redirect to={`/landlord/${user.userid}`} />
                  : <Redirect to='/' />
              }}
            />
            <PrivateRoute
              path="/landlord/profile/:id"
              user={this.state.user}
              getUserInformation={this.getUserInformation}
              component={Profile}
            />
            <PrivateRoute
              path="/tenant/profile/:id"
              user={this.state.user}
              getUserInformation={this.getUserInformation}
              component={Profile}
            />
            <Route
              path="/landlord/:id"
              render={(props) => {
                return user ? user.aptid ? <LandlordDash {...props} user={user}
                  tenant={this.state.tenant}
                  getUserInformation={this.getUserInformation} />
                  : <Redirect to='/addApartment' />
                  : <Redirect to='/' />
              }}
            />
            <PrivateRoute
              path="/tenant/:id"
              user={user}
              getUserInformation={this.getUserInformation}
              component={user.aptid ? TenantDash : searchApartment}
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
            <Route exact path='/inbox' render={() => <View user={this.state.user} />} />
            <Route path="/inbox/threads/:id" render={(props) => <ThreadItem {...props} user={this.state.user} />} />
            <Route path='/faq' component={FAQ} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </div>
    );
  }
}

export default withRouter(App);
