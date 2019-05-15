import React, { Component } from 'react';

class ArchivedTickets extends Component {
  state = {
    ticketModalOpen: false
  }

  handleTicketModal = (e) => {
    if(e.target.className === 'td-tik' || e.target.className === 'tik-mdl-ctn' || e.target.className === 'mdl-indv-tik') {
      this.setState(prevState => ({ticketModalOpen: !prevState.ticketModalOpen}))
    }
  }

  render() {
    const { archiveShowing, ticket, defaultValue } = this.props;
    const { ticketModalOpen } = this.state;
    let date = ticket.appt_date
    let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
    let resolution;
    
    if(this.state.completed_tenant === '1' && ticket.completed_landlord === '1') {
      resolution = 'Resolved'
    } else if(this.state.completed_tenant === '1' && ticket.completed_landlord === '0') {
      resolution = 'Waiting for landlord to resolve'
    } else if(this.state.completed_tenant === '0') {
      resolution = 'Mark Resolved'
    }

    return(
      <>
        <button onClick={this.handleTicketModal} className='td-tik' id={ticket.ticketid}>
          <div id={ticket.ticketid} className='td-tik-subject'>{ticket.subject}</div>
          <div id={ticket.ticketid} className='td-tik-td-appt-dt-tm'>{ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</div>
        </button>

        { ticketModalOpen ?

            <>
              <div className='tik-mdl-ctn' onClick={this.handleTicketModal}>
                <div
                  className='mdl-indv-tik'>
                  <div className='indv-tik'>
                    <p className='mdl-tik-item' id='tik-subj'>Issue: {ticket.subject}</p>
                    <p className='mdl-tik-item' id='tik-appt-date-time'>Appointment: {apptDate} {ticket.appt_time}</p>
                    <p className='mdl-tik-item' id='tik-desc'>Description: {ticket.body}</p>
                      <button
                        id={ticket.ticketid}
                        onClick={this.tenantHandleStatus}
                        className='status-btn'
                        disabled={resolution === 'Resolved' ? true : false}>{resolution}</button>
                    </div>
                  </div>
                </div>
              </>

            : null }
      </>
    )
  }
}

export default ArchivedTickets;
