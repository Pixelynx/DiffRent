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
    name: '',
    email: '',
    phone: '',
    dob: '',
    userType: false 
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectLandlord = () => {
    this.setState({
      userType: false
    })
  }

  selectTenant = () => {
    this.setState({
      userType: true
    })
  }

  

  registerUser = async e => {
    e.preventDefault();
    debugger
    const { username, password , name, email, phone, dob, userType } = this.state;

    await axios.post("/users/new", { username, password });

    Auth.authenticateUser(username);

    await axios.post("/users/login", { username, password });

    await this.props.checkAuthenticateStatus();

    this.setState({
      username: "",
      password: ""
    });
    axios.post("/users/new", { username, password }).then(() => {
      Auth.authenticateUser(username);
      axios
        .post("/users/login", { username, password })
        .then(() => {
          this.props.checkAuthenticateStatus();
        })
        .then(() => {
          this.setState({
            username: "",
            password: ""
          });
        });
    });
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password} = this.state;
    const { getUserAptInfo, getUserInfo, user } = this.props;

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
    const { match, getUserAptInfo, getUserInfo, user } = this.props;
    const path = match.path;
    let password = 'abc';

    if (path === '/tenants/login'){
      let username = 'nRyder@gmail.com'
    return axios
        .post("/tenants/login", { username, password })
        .then((res) => {
            if(!user){
              return getUserAptInfo(res.data.email)} else if (!user) {
                return getUserInfo(res.data.email)
              }
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
    } else if (path === '/landlords/login'){
      let username = 'rHerbert@gmail.com' 
       return axios
      .post("/landlords/login", { username, password })
      .then((res) => {
          if(!user){
            return getUserAptInfo(res.data.email)} else if (!user) {
              return getUserInfo(res.data.email)
            }
      })
      .then(() => {
        Auth.authenticateUser(username)
      })
      .then(() => {
        this.props.checkAuthenticateStatus();
      })
    }
  }

  render() {
    const { username, password, name, email, phone, dob, userType } = this.state;
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
                demoLogin={this.demoLogin}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
              />
            );
          }}
        />
        <Route
          exact path="/register"
          render={() => {
            return (
              <Form
                name={name}
                password={password}
                email={email}
                phone={phone}
                dob={dob}
                userType={userType}
                isLoggedIn={isLoggedIn}
                loginUser={this.loginUser}
                registerUser={this.registerUser}
                handleChange={this.handleChange}
                selectLandlord={this.selectLandlord}
                selectTenant={this.selectTenant}
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
      </Switch>
    );
  }
}

export default withRouter(AuthForm);