import React from 'react';

const TicketDashInfo = (props) => {
  return(
    <div className="ticket-dash-info">
      <h2>Tickets Information</h2>
      <p>You have {props.tickets.length} open ticket(s)</p>
    </div>
  )
}

export default TicketDashInfo;
