import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Auth from "../utils/Auth";
import Form from "./Form";

class AuthForm extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    userType: false,
    expanded: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectLandlord = () => {
    this.setState({
      userType: false,
    });
  };

  selectTenant = () => {
    this.setState({
      userType: true,
    });
  };

  handleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }
  

  registerUser = async e => {
    e.preventDefault();
    const { password, name, email, phone, userType } = this.state;
    const { getUserInformation, user } = this.props;
    let user_type = userType ? "tenant" : "landlord";
    let password_digest = password;
    let input = e.target[4].value;
    let date = input.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    let username = email;

    await axios.post("/users/", {
      name,
      email,
      phone,
      date,
      user_type,
      password_digest,
    });
    Auth.authenticateUser(email);
    if (user_type === "tenant") {
      return await axios
        .post("/tenants/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          } 
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        });
    } else if (user_type === "landlord") {
      return await axios
        .post("/landlords/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          } 
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        });
    }
  };

  loginUser = e => {
    e.preventDefault();
    const { match, getUserInformation, user } = this.props;
    const path = match.path
    let username = this.state.username;
    let password = this.state.password;
    if (path === "/tenants/login") {
      return axios
        .post("/tenants/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          } 
        })
        .then(() => {
          Auth.authenticateUser(username);
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: "",
          });
        });
    } else if (path === "/landlords/login") {
      return axios
        .post("/landlords/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          } 
        })
        .then(() => {
          Auth.authenticateUser(username);
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        });
    }
  };

  demoLogin = e => {
    e.preventDefault();
    const { match, getUserInformation, user } = this.props;
    const path = match.path;
    let password = "abc";

    if (path === "/tenants/login") {
      let username = "nRyder@gmail.com";
      
      return axios
        .post("/tenants/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          }
        })
        .then(() => {
          Auth.authenticateUser(username);
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: "",
          });
        });
    } else if (path === "/landlords/login") {
      let username = "rHerbert@gmail.com";
      return axios
        .post("/landlords/login", { username, password })
        .then(() => {
          if (!user) {
            return getUserInformation(username);
          }
        })
        .then(() => {
          Auth.authenticateUser(username);
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        });
    }
  };

  render() {
    const {
      username,
      password,
      name,
      email,
      phone,
      userType,
      expanded
    } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/tenants/login"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                expanded={expanded}
                handleExpanded={this.handleExpanded}
                isLoggedIn={isLoggedIn}
                demoLogin={this.demoLogin}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact
          path="/landlords/login"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                expanded={expanded}
                handleExpanded={this.handleExpanded}
                isLoggedIn={isLoggedIn}
                demoLogin={this.demoLogin}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact
          path="/register"
          render={() => {
            return (
              <Form
                name={name}
                password={password}
                email={email}
                phone={phone}
                userType={userType}
                isLoggedIn={isLoggedIn}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
                selectLandlord={this.selectLandlord}
                selectTenant={this.selectTenant}
                handleDate={this.handleDate}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

export default withRouter(AuthForm);
