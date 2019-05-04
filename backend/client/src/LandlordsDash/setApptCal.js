import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import { subDays } from "date-fns/esm";
import MaskedInput from 'react-text-mask';


const SetApptCal = (props) => {

  const {
    match,
    ticket,
    setAppt,
    settingAppt,
    apptSet,
    apptSubmitted,
    handleSetAppt,
    aptInfo,
    tenantName
  } = props;

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState(new Date());

  const today = new Date(),
    date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  let setApptForm =
                    <>
                      <form onSubmit={handleSetAppt} className='appt-form-container'>
                        <div className='appt-cal-container'>
                          <div className='appt-cal'>
                          <label>Set an Appointment for:</label>
                          <p>Tenant: {tenantName}</p>
                          <p>Address: {aptInfo.address}</p>
                          <p>Apartment#: {aptInfo.apt}</p>
                          <p>Issue: {ticket.subject}</p>
                          <DatePicker
                            className='date-picker'
                            mask={value => (value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [])}
                            minDateMessage='Date must be at least next day.'
                            value={selectedDate}
                            minDate={subDays(new Date(), 2)}
                            openTo="year"
                            format="MM/dd/yyyy"
                            views={["year", "month", "day"]}
                            onChange={handleDateChange}
                        />

                        <TimePicker
                          value={selectedTime}
                          onChange={handleTimeChange}
                          format="hh:mm"
                        />
                      <input type='submit' value='Submit Appointment' />
                      </div>

                      </div>
                      </form>
                      </>

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <div className='set-appt-form'>
          {apptSubmitted ? <p>Appointment Set!</p> : setApptForm}
        </div>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(SetApptCal);


// keyboard
// allowKeyboardControl
// minDateMessage='Date must be at least next day.'
// value={selectedDate}
// minDate={subDays(new Date(), 2)}
// openTo="year"
// showtimeselect="true"
// timeformat="HH:mm"
// timeintervals={15}
// timecaption="time"
// dateformat="MMMM, d, yyyy"
// onChange={handleDateChange}
