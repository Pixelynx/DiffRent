
import React from "react";
import { withRouter } from "react-router";

const Form = ({
  match,
  username,
  password,
  isLoggedIn,
  loginUser,
  registerUser,
  handleChange
}) => {
  const path = match.path;
  return (
    <React.Fragment>
      <h1> {path === "/landlords/login" ? "Login" : "Register"} </h1>
      <form onSubmit={path === "/landlords/login" ? loginUser : registerUser}>
        <input
          type="text"
          autoComplete='off'
          value={username}
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </React.Fragment>
  );
};

export default withRouter(Form);