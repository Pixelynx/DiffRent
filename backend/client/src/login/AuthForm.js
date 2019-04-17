import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Auth from "../utils/Auth";
import Form from "./Form";

class AuthForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  

  registerUser = async e => {
    e.preventDefault();
    const { username, password } = this.state;

    await axios.post("/users/new", { username, password });

    Auth.authenticateUser(username);

    await axios.post("/users/login", { username, password });

    await this.props.checkAuthenticateStatus();

    this.setState({
      username: "",
      password: ""
    });
    // axios.post("/users/new", { username, password }).then(() => {
    //   Auth.authenticateUser(username);
    //   axios
    //     .post("/users/login", { username, password })
    //     .then(() => {
    //       this.props.checkAuthenticateStatus();
    //     })
    //     .then(() => {
    //       this.setState({
    //         username: "",
    //         password: ""
    //       });
    //     });
    // });
  };

  loginUser = e => {
    // debugger;
    e.preventDefault();
    const { username, password } = this.state;
    const { getUserInfo } = this.props

    if (e.target[2].value === 'landlord')
      { return axios
        .post("/landlords/login", { username, password })
        .then((res) => {
          getUserInfo(res.data.email)
      })
        .then(() => {
          Auth.authenticateUser(username)
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: ""
          });
        });
      } else if (e.target[2]. value === 'tenant')
      { return axios
        .post("/tenants/login", { username, password })
        .then((res) => {
            getUserInfo(res.data.email)
        })
        .then(() => {
          Auth.authenticateUser(username)
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: ""
          });
        });
      }
  };

  demoLogin = (e) => {
    e.preventDefault();
    let username = 'zGoulding@gmail.com';
    let password = 'abc'
    axios
        .post("/tenants/login", { username, password })
        .then((res) => {
            this.props.getUserInfo(res.data.email)
        })
        .then(() => {
          Auth.authenticateUser(username)
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: ""
          });
        });
  }
  demoLandordLogin = (e) => {
    debugger
    e.preventDefault();
    let username = 'jBennet@gmail.com';
    let password = 'abc'
    axios
        .post("/landlords/login", { username, password })
        .then((res) => {
            this.props.getUserInfo(res.data.email)
        })
        .then(() => {
          Auth.authenticateUser(username)
        })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
  }

  render() {
    const { username, password } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route
          exact path="/tenants/login"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
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
          exact path="/landlords/login"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                isLoggedIn={isLoggedIn}
                demoLandordLogin={this.demoLandordLogin}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact path="/tenants/register"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                isLoggedIn={isLoggedIn}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact path="/landlords/register"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                isLoggedIn={isLoggedIn}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact path="/auth/register"
          render={() => {
            return (
              <Form
                username={username}
                password={password}
                isLoggedIn={isLoggedIn}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
      </Switch>
    );
  }
}

export default AuthForm;