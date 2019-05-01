import React, { useState } from "react";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";

export const SetApptCal = (props) => {

  const [currDate, newDate] = useState(new Date());

  let apptDate = <>
  <label>Set date for Appointment (mm/dd/yyyy)</label>
  <DatePicker
    mask={value => (value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [])}
    keyboard
    allowKeyboardControl
    minDateMessage='Must be after today'
    disableFuture
    openTo="year"
    format="MM/dd/yyyy"
    views={["year", "month", "day"]}
    onChange={newDate}
  />
  </>

  return(
    <>
    <button>Set Appointment</button>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {props.apptFormOpened ? apptDate : null}
    </MuiPickersUtilsProvider>
    </>
  )
}
