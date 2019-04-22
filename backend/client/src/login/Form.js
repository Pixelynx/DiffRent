import React from "react";
import { withRouter, Link } from "react-router-dom";
import '../styles/logins/login.css'

const Form = ({
  match, username, password, isLoggedIn, loginUser, handleChange,
  demoLogin, name, email, phone, dob, userType, handleUserType,
  registerUser
  }) => {
  const path = match.path;

  let loginForm = <div className='formContainer'>
                  <Link to='/register'><button>SignUp</button></Link>
                  <div className='formContainer'>
                    <h1>DiffRent</h1>
                    <h1> {path === "/landlords/login" ? "Landlord Login" : "Tenant Login"} </h1>
                    <form onSubmit={loginUser}>
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
                      <input type="hidden" readOnly={true} value={path === "/landlords/login" ? "landlord" : "tenant"} />
                      <button type="submit">Submit</button>
                    </form>

                    <form onSubmit={demoLogin}>
                      <button type="submit">{path === "/landlords/login" ? "Demo Landlord Login" : "Demo Tenant Login"}</button>
                    </form>
                    {path === '/landlords/login' ? 'Not a landlord?' : 'Not a tenant?'}
                    <a href={path === '/landlords/login' ? '/tenants/login' : '/landlords/login'}>
                      <button>
                        {path === '/landlords/login' ? 'Log in as Tenant' : 'Log in as Landlord'}
                      </button>
                    </a>
                  </div>
                  </div>

  let signupForm = <>
                  <h1>signupForm</h1>
                  </>

  return (
    <div className='loginForm'>
      {path === '/tenants/login' || path === '/landlords/login' ? loginForm : null}
      {path === '/register' ? signupForm : null}
      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </div>
  );
};

export default withRouter(Form);