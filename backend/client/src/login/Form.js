import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import '../styles/logins/login.css'
import { subYears } from "date-fns/esm";
import MaskedInput from 'react-text-mask'

const Form = (props) => {
  const {
    match, username, password, isLoggedIn, loginUser, handleChange,
    demoLogin, name, email, phone, userType, selectTenant,
    registerUser, selectLandlord
    } = props;
  const path = match.path;
  const [selectedDate, handleDateChange] = useState(new Date());

  let loginForm = <div className='formContainer'>
                  <div className='formContainer'>
                    <h1>DiffRent</h1>
                    <h1> {path === "/landlords/login" ? "Landlord Login" : "Tenant Login"} </h1>
                    <form onSubmit={loginUser}>
                      <label>Email</label>
                      <input  
                        autoFocus
                        required
                        type="text"
                        autoComplete='off'
                        value={username}
                        name="username"
                        placeholder="email"
                        onChange={handleChange}
                      />

                      <label>Password</label>
                      <input
                        required
                        type="password"
                        value={password}
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                      />
                      <input type="hidden" readOnly={true} value={path === "/landlords/login" ? "landlord" : "tenant"} />
                      <input type='submit'/>
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
                    <div className='signupForm'>
                      <div className='selectButtons'>
                        <button className={userType ? 'lButtonD' : 'lButtonA'} onClick={selectLandlord}>Landlord</button>
                        <button className={userType ? 'tButtonA' : 'tButtonD'} onClick={selectTenant}>Tenant</button>
                      </div>

                      <div className='registerForm'>
                      <form  onSubmit={registerUser}>
                          <div className='nameField'>
                            <label>Full Name</label>
                            <input
                            autoFocus
                            autoComplete='off'
                            required
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='full name'
                            type='text' />
                          </div>
                          
                          <div className='emailField'>
                            <label>Email</label>
                            <input
                            required
                            autoComplete='off'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='email@domain.com'
                            type='email' />
                            </div>
                        
                        <div className='phoneField'>
                          <label className='phone'>Phone</label>
                          <MaskedInput
                          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                          required
                          autoComplete='off'
                          value={phone}
                          onChange={handleChange}
                          className='phone'
                          name='phone'
                          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder='(123)-456-7890'
                          type='tel' />
                        </div>

                        <div className='passwordField'>
                          <label className='password'>Password</label>
                          <input
                          required
                          className='password'
                          name='password'
                          value={password}
                          onChange={handleChange}
                          placeholder='password'
                          type='password' />
                        </div>
                        
                        <div className='calendar'>
                        <label>Date of Birth (mm/dd/yyyy)</label>
                        <DatePicker
                          mask={value => (value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [])}
                          keyboard
                          allowKeyboardControl
                          maxDateMessage='Select a valid date'
                          value={selectedDate}
                          maxDate={subYears(new Date, 18)}
                          disableFuture
                          openTo="year"
                          format="MM/dd/yyyy"
                          views={["year", "month", "day"]}
                          onChange={handleDateChange}
                        />
                        
                        <label>User Type:{userType ? ' Tenant' : ' Landlord'} </label>
                        </div>
                        <input
                        hidden
                        readOnly={true}
                        value={userType ? 'Tenant' : 'Landlord'} />
                        <input className='submitButton' type='submit' />
                        
                      </form>
                      </div>
                      </div>
                  </>
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <div className='loginForm'>
    {path !== '/register' ? <Link className='signup' to='/register'><button>SignUp</button></Link> 
    : <div className='login'>
        <Link to='/landlords/login'>
          <button>
            Log in as Landlord
          </button>
        </Link>
        <Link to='/tenants/login'>
          <button>
            Log in as Tenant
          </button>
        </Link>
      </div>}
                          <div className='signupForm2'>
      {path === '/tenants/login' || path === '/landlords/login' ? loginForm : null}
      {path === '/register' ? signupForm : null}
      <p>{isLoggedIn ? "Logged In!" : ""}</p>
    </div>
    </div>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(Form);
