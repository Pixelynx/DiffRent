import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import { subYears } from "date-fns/esm";
import MaskedInput from 'react-text-mask'

const SetApptCal = (props) => {

  const { match, ticket, setAppt, settingAppt } = props;
  const path = match.path;
  const [selectedDate, handleDateChange] = useState(new Date());

  var today = new Date(),
    date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

  let setApptForm =
                    <>
                      <div className='calendar'>
                        <label>Appointment Date (mm/dd/yyyy)</label>
                        <DatePicker
                          mask={value => (value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [])}
                          keyboard
                          allowKeyboardControl
                          minDateMessage='Date must be at least next day.'
                          value={selectedDate}
                          minDate={new Date()}
                          disableFuture
                          openTo="year"
                          format="MM/dd/yyyy"
                          views={["year", "month", "day"]}
                          onChange={handleDateChange}
                        />
                      </div>

                      </>

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <button onClick={setAppt} className='set-appt-btn'>Set Appointment</button>

        <div className='set-appt-form'>
          {path === `/landlord/:id` &&  settingAppt === true ? setApptForm : null}
          <p>Appointment Set!(not)</p>
        </div>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(SetApptCal);
