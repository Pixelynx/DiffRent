import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";
import { addDays } from "date-fns/esm";


const SetApptCal = (props) => {

  const {
    ticket,
    apptSubmitted,
    handleSetAppt,
    aptInfo,
    tenantName
  } = props;

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState(new Date());

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
                            keyboard
                            allowKeyboardControl
                            minDateMessage='Invalid date.'
                            value={selectedDate}
                            minDate={addDays(new Date(), 0)}
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
