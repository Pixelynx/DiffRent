import React, { Component } from 'react';
import axios from 'axios';
import '../styles/colorScheme.css';
import '../styles/dashboards/tickets.css';

// stash b2691f7

class Tickets extends Component {
  state = {
    completed_tenant: `${this.props.ticket.completed_tenant === '1' ? '1' : '0'}`,
    completed_landlord: `${this.props.ticket.completed_landlord === '1' ? '1' : '0'}`,
    ticketModalOpen: false,
  }

  tenantHandleStatus = async(e) => {
    const { ticket, user } = this.props

    let id = e.target.id;
    let completedTenant = `${this.state.completed_tenant === '1' ? '0' : '1'}`;
    let inProgress = `${this.state.completed_tenant === '1' && this.state.completed_landlord === '1' ? '0' : '1'}`;
    let aptid = user.aptid;

      await axios.put(`/tickets/${id}`, {
        ticketid: id,
        apartment_id: aptid,
        completed_tenant: completedTenant,
        completed_landlord: ticket.completed_landlord,
        in_progress: inProgress,
        appt_date: ticket.appt_date,
        appt_time: ticket.appt_time
      })
      .then(res => {
        this.setState({ completed_tenant: `${this.state.completed_tenant === '1' ? '0' : '1'}` })
      }).catch(err => console.log("put request: ", err))
  }

handleTicketModal = (e) => {
  if(e.target.className === 'td-tik' || e.target.className === 'tik-mdl-ctn' || e.target.className === 'mdl-indv-tik' || e.target.className === 'td-tik-subject' || e.target.className === 'td-tik-td-appt-dt-tm') {
    this.setState(prevState => ({ticketModalOpen: !prevState.ticketModalOpen}))
  }
}

  render() {
    const { ticketModalOpen } = this.state;
    const { ticket } = this.props;

    let resolution;
    let date = ticket.appt_date
    let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

    if(this.state.completed_tenant === '1' && ticket.completed_landlord === '1') {
      resolution = 'Resolved'
    } else if(this.state.completed_tenant === '1' && ticket.completed_landlord === '0') {
      resolution = 'Pending'
    } else if(this.state.completed_tenant === '0') {
      resolution = 'Mark Resolved'
    }

  return(
    <>
      <div onClick={this.handleTicketModal} className='td-tik' id={ticket.ticketid}>
        <div id={ticket.ticketid} className='td-tik-subject'>{ticket.subject}</div>
        <div id={ticket.ticketid} className='td-tik-td-appt-dt-tm'>{ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</div>
      </div>

      { ticketModalOpen ?

          <>
            <div className='tik-mdl-ctn' onClick={this.handleTicketModal}>
              <div
                className='mdl-indv-tik'>
                <div className='indv-tik'>
                  <p className='mdl-tik-item' id='tik-subj'>Issue: {ticket.subject}</p>
                  <p className='mdl-tik-item' id='tik-appt-date-time'>Appointment: {ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</p>
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
export default Tickets;
