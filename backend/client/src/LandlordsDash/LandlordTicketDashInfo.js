import React from 'react';
import { Redirect, Link } from 'react-router-dom'


const TicketDashInfo = (props) => {
  return(
    <div className="ticket-dash-info">
      <h2>Tickets Information</h2>
      <Link to="/tickets"><p>You have {props.tickets.length} open ticket(s)</p></Link>
   </div>
  )
}

export default TicketDashInfo;
