import React, {useState} from "react";
import { withRouter, Link } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import '../styles/logins/login.css'
import { subYears } from "date-fns/esm";

const Form = (props) => {
  const {
    match, username, password, isLoggedIn, loginUser, handleChange,
    demoLogin, name, email, phone, dob, userType, selectTenant,
    registerUser, selectLandlord
    } = props;
  const path = match.path;
  const [selectedDate, handleDateChange] = useState(new Date());
  const birthday = subYears(new Date(), 18);

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
                    <div>
                      <button onClick={selectLandlord}>Landlord</button>
                      <button onClick={selectTenant}>Tenant</button>
                      <form onSubmit={registerUser}>
                        <label>Full Name</label>
                        <input 
                        // required
                        placeholder='full name'
                        type='text' />

                        <label>Email</label>
                        <input 
                        // required
                        placeholder='email@domain.com'
                        type='text' />

                        <label>Password</label>
                        <input 
                        // required
                        placeholder='password'
                        type='password' />

                        {/* <label>Date of Birth</label> */}
                        <div className="picker">
        <DatePicker
          label="Date of birth"
          autoOk
          value={subYears(selectedDate, 18)}
          disableFuture
          openTo="day"
          // format={props.getFormatString({
          //   moment: "DD/MM/YYYY",
          //   dateFns: "dd/MM/yyyy",
          // })}
          views={["year", "month", "day"]}
          onChange={handleDateChange}
        />
      </div>

                        <label>User Type</label>
                        <span>{userType ? 'Tenant' : 'Landlord'}</span>
                        <input 
                        hidden
                        readOnly={true}
                        value={userType ? 'Tenant' : 'Landlord'} />
                        <input type='submit' />
                      </form>
                    </div>
                  
                  </>

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div className='loginForm'>
      {path === '/tenants/login' || path === '/landlords/login' ? loginForm : null}
      {path === '/register' ? signupForm : null}
      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </div>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(Form);