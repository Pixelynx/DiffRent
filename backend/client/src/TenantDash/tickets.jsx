import React, { Component } from 'react';
import axios from 'axios';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {
  state = {
    completedTenant: false
  }

  tenantHandleStatus = async(e) => {
    const { ticket, user, setCompletedTenantState } = this.props

    let id = e.target.id;
    let completedTenant = `${ticket.completed_tenant ? '0' : '1'}`;
    let aptid = user.aptid;

      await axios.put(`/tickets/${id}`, {
        ticketid: id,
        apartment_id: aptid,
        completed_tenant: completedTenant,
        completed_landlord: ticket.completed_landlord,
        in_progress: ticket.in_progress,
        appt_date: ticket.appt_date,
        appt_time: ticket.appt_time
      })
      .then(res => {
        this.setState(prevState => ({ completedTenant: !prevState.completedTenant }))
      }).catch(err => console.log("put request: ", err))
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }


  render() {
    const { defaultValue } = this.props
    const { ticket } = this.props

    console.log(this.state)

      let date = ticket.appt_date
      let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
      if(!this.state.hovered) {
        return(
          <>
            <div
              className='ticket-front'
              onMouseEnter={this.mouseEnter}>
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{!this.state.completedTenant ? 'UNRESOLVED' : 'RESOLVED'}</p>
            </div>
            </>
        )
          } else {
            return (
              <>
              <div
                className='ticket-back'
                onMouseLeave={this.mouseLeave}>
                <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
              <button
                id={ticket.ticketid}
                onClick={this.tenantHandleStatus}
                className='status-btn'>{!this.state.completedTenant ? 'UNRESOLVED' : 'RESOLVED'}</button>
            </div>
          </>
        )
      }


}
}
export default Tickets;
