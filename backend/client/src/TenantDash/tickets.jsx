import React, { Component } from 'react';
import axios from 'axios';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {
  state = {
    completed_tenant_tiks: `${this.props.ticket.completed_tenant === '1' ? '1' : '0'}`
  }

  tenantHandleStatus = async(e) => {
    const { ticket, user } = this.props

    let id = e.target.id;
    let completedTenant = `${this.state.completed_tenant_tiks === '1' ? '0' : '1'}`;
    let in_progress = `${this.state.completed_tenant_tiks === '1' && ticket.completed_landlord === '1' ? '0' : '1'}`;
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
        this.setState({ completed_tenant_tiks: `${this.state.completed_tenant_tiks === '1' ? '0' : '1'}` })
      }).catch(err => console.log("put request: ", err))
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }


  render() {
    const { ticket } = this.props
    let resolution;

    if(this.state.completed_tenant_tiks === '1' && ticket.completed_landlord === '1') {
      resolution = 'Resolved'
    } else if(this.state.completed_tenant_tiks === '1' && ticket.completed_landlord === '0') {
      resolution = 'Waiting for landlord to resolve'
    } else if(this.state.completed_tenant_tiks === '0') {
      resolution = 'Mark Resolved'
    }

      let date = ticket.appt_date
      let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

  return(
    <>
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
