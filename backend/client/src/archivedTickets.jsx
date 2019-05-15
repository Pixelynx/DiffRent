import React, { Component } from 'react';

class ArchivedTickets extends Component {
  state = {
    resolvedTickets: []
  }

  handleResolvedTicket = (defaultValue) => {
    let resolvedTickets = []
    return defaultValue.filter(ticket => {
      if(ticket.completed_tenant === '1' && ticket.completed_landlord === '1') {
        return resolvedTickets.push(ticket)
      }
    })
    this.setState({ resolvedTickets: resolvedTickets })
  }

  render() {
    const { archivedTicketsShowing, ticket, defaultValue } = this.props;

    let date = ticket.appt_date
    let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

    return(
      <>
      { archivedTicketsShowing ?

            <div className='arch-tik-mdl-ctn' onClick={this.handleTicketModal}>
              <div
                className='arch-mdl-indv-tik'>
                <div className='arch-indv-tik'>
                  <p className='arch-mdl-tik-item' id='arch-tik-subj'>Issue: {ticket.subject}</p>
                  <p className='arch-mdl-tik-item' id='arch-tik-appt-date-time'>Appointment: {apptDate} {ticket.appt_time}</p>
                  <p className='arch-mdl-tik-item' id='arch-tik-desc'>Description: {ticket.body}</p>
                  <p className='resolved'>RESOLVED</p>
                </div>
              </div>
            </div>
          : null }
          </>
    )
  }
}

export default ArchivedTickets;
