import React, { Component } from 'react';
import axios from 'axios';
import '../styles/colorScheme.css';
import '../styles/tenantDash/tenantTickets/tickets.css';

class Tickets extends Component {
  state = {
    completed_tenant: `${this.props.ticket.completed_tenant === '1' ? '1' : '0'}`,
    ticketModalOpen: false,
  }

  handleModalOpen = (e) => {
    if(e.target.className === 'td-tik') {
      this.setState(prevState => ({ticketModalOpen: !prevState.ticketModalOpen}))
    }
  }

  tenantHandleStatus = async(e) => {
    const { ticket, user } = this.props

    let id = e.target.id;
    let completedTenant = `${this.state.completed_tenant === '1' ? '0' : '1'}`;
    let in_progress = `${this.state.completed_tenant === '1' && ticket.completed_landlord === '1' ? '0' : '1'}`;
    let aptid = user.aptid;

      await axios.put(`/tickets/${id}`, {
        ticketid: id,
        apartment_id: aptid,
        completed_tenant: completedTenant,
        completed_landlord: ticket.completed_landlord,
        in_progress: in_progress,
        appt_date: ticket.appt_date,
        appt_time: ticket.appt_time
      })
      .then(res => {
        this.setState({ completed_tenant: `${this.state.completed_tenant === '1' ? '0' : '1'}` })
      }).catch(err => console.log("put request: ", err))
  }

handleTicketModal = (e) => {
  this.setState(prevState => ({ ticketModalOpen: !prevState.ticketModalOpen }))
}

  render() {
    const { ticketModalOpen } = this.state;
    const { ticket } = this.props;

    let resolution;
    let date = ticket.appt_date
    let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

    if(ticket.completed_tenant === '1' && ticket.completed_landlord === '1') {
      resolution = 'Resolved'
    } else if(ticket.completed_tenant === '1' && ticket.completed_landlord === '0') {
      resolution = 'Waiting for landlord to resolve'
    } else if(ticket.completed_tenant === '0') {
      resolution = 'Mark Resolved'
    }

  return(
    <>
      <button onClick={this.handleTicketModal} className='td-tik' id={ticket.ticketid}>
        <div id={ticket.ticketid} className='td-tik-subject'>{ticket.subject}</div>
        <div id={ticket.ticketid} className='td-tik-td-appt-dt-tm'>{ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</div>
      </button>

      {ticketModalOpen ?

          <>
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
            </>
          : null
      }
    </>
  )

}
}
export default Tickets;


// if(!this.state.hovered) {
//   return(
//     <>
//       <div
//         className='ticket-front'
//         onMouseEnter={this.mouseEnter}>
//         <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
//         <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
//       </div>
//       </>
//   )
//     } else {
//       return (
//         <>
//         <div
//           className='ticket-back'
//           onMouseLeave={this.mouseLeave}>
//           <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
//           <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
//           <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
//         <button
//           id={ticket.ticketid}
//           onClick={this.tenantHandleStatus}
//           className='status-btn'
//           disabled={resolution === 'Resolved' ? true : false}>{resolution}</button>
//       </div>
//     </>
//   )
// }
