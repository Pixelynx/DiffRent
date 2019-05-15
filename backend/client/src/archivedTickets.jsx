import React, { Component } from 'react';

class ArchivedTickets extends Component {
  state = {
  }

  render() {
    const { archiveShowing, ticket, defaultValue } = this.props;
    let date = ticket.appt_date
    let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

    return(
      <>
        <button onClick={this.handleTicketModal} className='td-tik' id={ticket.ticketid}>
          <div id={ticket.ticketid} className='td-tik-subject'>{ticket.subject}</div>
          <div id={ticket.ticketid} className='td-tik-td-appt-dt-tm'>{ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</div>
        </button>
      </>
    )
  }
}

export default ArchivedTickets;
