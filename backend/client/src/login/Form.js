
import React from "react";
import { withRouter } from "react-router";

const Form = ({
  match,
  username,
  password,
  isLoggedIn,
  loginUser,
  registerUser,
  handleChange,
  type
}) => {
  const path = match.path;

  let landlordLogin = <>
              <h1> {path === "/landlords/login" ? "Landlord Login" : "Register"} </h1>
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
                <input type="hidden" readOnly={true} value='landlord' />
                <button type="submit">Submit</button>
              </form>
            </>;

  let tenantLogin = <>
              <h1> {path === "/tenants/login" ? "Tenant Login" : "Register"} </h1>
              <form onSubmit={path === "/tenants/login" ? loginUser : registerUser}>
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
                <input type="hidden" readOnly={true} value='tenant' />
                <button type="submit">Submit</button>
              </form>
            </>;

  return (
    <React.Fragment>
      {path === "/landlords/login" ? landlordLogin : tenantLogin }
      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </React.Fragment>
  );
};

export default withRouter(Form);