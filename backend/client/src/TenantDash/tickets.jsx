import React, { Component } from 'react';
import axios from 'axios';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {

  state = {
    creatingTicket: false,
  }

  componentDidMount = () => {
  }


  handleCreateTicketBtn = (e) => {
    this.setState({ creatingTicket: true })
    this.setState({ ticketModalOpen: false })

  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }


  render() {
    const { completed_tenant } = this.state
    const { ticket } = this.props
    console.log(this.state)

      let status = 'URESOLVED';
      let date = ticket.appt_date
      let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
      if(!this.state.hovered) {
        return(
          <>
            <div
              key={ticket.id}
              className='ticket-front'
              onMouseEnter={this.mouseEnter}>
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{completed_tenant ? 'UNRESOLVED' : 'RESOLVED'}</p>
            </div>
            </>
        )
          } else {
            return (
              <>
              <div
                key={ticket.id}
                className='ticket-back'
                onMouseLeave={this.mouseLeave}>
                <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
              <button
                id={ticket.id}
                onClick={this.tenantHandleStatus}
                className='status-btn'>{status}</button>
            </div>
          </>
        )
      }
      return <CreateTicketForm
        createTicket={this.state.creatingTicket}
        user={this.props.user}
        />

}
}
export default Tickets;
