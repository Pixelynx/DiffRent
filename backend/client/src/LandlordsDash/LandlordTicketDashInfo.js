import React from 'react';
import { Redirect } from 'react-router-dom'


const TicketDashInfo = (props) => {
  return(
    <div className="ticket-dash-info">
      <h2>Tickets Information</h2>
      <a href="/tickets"><p>You have {props.tickets.length} open ticket(s)</p></a>
   </div>
  )
}

export default TicketDashInfo;
