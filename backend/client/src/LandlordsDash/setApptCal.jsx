import React, { useState } from "react";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from "@date-io/date-fns";

export const SetApptCal = (props) => {

  const [currDate, newDate] = useState(new Date());

  let apptDate = <>
  <label>Date of Birth (mm/dd/yyyy)</label>
  <DatePicker
    mask={value => (value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : [])}
    keyboard
    allowKeyboardControl
    maxDateMessage='Must be after today'
    disableFuture
    openTo="year"
    format="MM/dd/yyyy"
    views={["year", "month", "day"]}
    onChange={newDate}
  />
  </>

  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {props.apptFormOpened ? apptDate : null}
    </MuiPickersUtilsProvider>
  )
}
